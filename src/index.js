document.addEventListener("DOMContentLoaded", e => {
    console.log("page loaded")
    const baseUrl = 'http://localhost:3000/tweets'

    const fetchData = (handle, number) => {
        fetch(baseUrl + `/?handle=${handle}&number=${number}`)
        .then(res => res.json())
        .then(iterateArray)
    }

    const iterateArray = (array) => {
        for (const tweetText of array) {
            splitText(tweetText)
        }
    }

    const splitText = (obj) => {
        const text = obj.text 
        const parseText = text.replace(/[^A-Za-z- ']+/g, '')
        const words = parseText.toLowerCase()
        const wordArray = words.split(" ")
        const counts = countOccurrences(wordArray)
    }
    

    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    const submitHandler = () => {
        const form = document.getElementById('handle-search-bar')
        form.addEventListener("submit", e => {
            e.preventDefault()
            const handle = form.handle.value
            const tweetContainer = document.getElementById("tweets-container")
            tweetContainer.innerHTML = ""
            
            const number = parseInt(form.amount.value)
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