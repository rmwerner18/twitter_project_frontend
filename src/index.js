document.addEventListener("DOMContentLoaded", e => {
    console.log("page loaded")
    const baseUrl = 'http://localhost:3000/tweets'

    const fetchData = (handle, number) => {
        fetch(baseUrl + `/?handle=${handle}&number=${number}`)
        .then(res => res.json())
        .then(getWordOccurrences)
    }

    const getWordOccurrences = (tweets) => {
        for (const tweet of tweets) {
            countOccurrencesInTweet(tweet)
        }
    }

    const countOccurrencesInTweet = (tweet) => {
        const tweetText = tweet.text 
        const tweetTextWords = tweetText.replace(/[^A-Za-z- ']+/g, '')
        const tweetTextWordsLowerCase = tweetTextWords.toLowerCase()
        const wordArray = tweetTextWordsLowerCase.split(" ")
        const counts = countOccurrences(wordArray)
        console.log(counts)
    }
    
    const countOccurrences = (arr) => {
        return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
    }

    const submitHandler = () => {
        const handleForm = document.getElementById('handle-search-bar')
        handleForm.addEventListener("submit", e => {
            e.preventDefault()
            const handle = handleForm.handle.value
            const number = parseInt(handleForm.amount.value)

            const tweetContainer = document.getElementById("tweets-container")
            tweetContainer.innerHTML = ""
            tweetContainer.append(createATag(number, handle))
            tweetContainer.append(createTweetWidget())
            
            fetchData(handle, number)         
        })
    }

    const createTweetWidget = () => {
        const script = document.createElement("script")
        script.src = "https://platform.twitter.com/widgets.js"
        script.charset = "utf-8"
        return script
    }

    const createATag = (number, handle) => {
        const a = document.createElement('a')
        a.classList.add("twitter-timeline")
        a.dataset.width = "250"
        a.dataset.height = "450"
        a.dataset.theme = "light"
        a.dataset.tweetLimit = number
        a.href = `https://twitter.com/${handle}`
        return a  
    }

    submitHandler()
})