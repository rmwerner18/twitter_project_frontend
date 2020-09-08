document.addEventListener("DOMContentLoaded", e => {
    console.log("page loaded")
    const baseUrl = 'http://localhost:3000/tweets'
    const wordBaseUrl = 'http://localhost:3000/words/'
    let allWords = []
    let wordCount = []
    let wordCloudArray = []
    let wordsWithNoArticles = []
    let wordContainer = document.getElementById('words-container')
    let searchContainer = document.getElementById('search-container')
    let handle 
    let number

    const fetchData = (handle, number) => {
        fetch(baseUrl + `/?handle=${handle}&number=${number}`)
        .then(res => res.json())
        .then(data => {
            pushTweetsIntoFilteredArray(data)
            wordCount = countOccurrences(wordsWithNoArticles)
            wordCloudArray = turnWordsIntoCloudArray(wordCount)
            makeWordCloud(wordCloudArray)
        })
    }

    const pushTweetsIntoFilteredArray = (tweets) => {
        for (const tweet of tweets) {
            pushTweetIntoFilteredArray(tweet)
        }
    }

    const pushTweetIntoFilteredArray = (tweet) => {
        const tweetText = tweet.text 
        const tweetTextWords = tweetText.replace(/[^A-Za-z- ']+/g, '')
        const tweetTextWordsLowerCase = tweetTextWords.toLowerCase()
        const wordArray = tweetTextWordsLowerCase.split(" ")
        for (const word of wordArray) {
            allWords.push(word)
        }
        checkWordsForArticles(allWords)
    }

    const checkWordsForArticles = (wordArray) => {
        let articles = ['if', 'of', 'the', 'for', 'and', 'a', 'to', 'be', 'rt', 'by', 'in', '', 'is']
        for (const word of wordArray) {
            if (articles.includes(word)) {
                console.log(word)
            } else {
                wordsWithNoArticles.push(word)
            }
        }
    }

    const countOccurrences = arr => {
        return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    }

    const makeWordCloud = (list) => {
        WordCloud(wordContainer, { list: list } );
    }

    const turnWordsIntoCloudArray = (wordCount) => {
        wordCloudArray = []
        for (word in wordCount) {
            wordCloudArray.push([word, (parseInt(wordCount[word]) * 5)])
        }
        return wordCloudArray
    }

    const fetchWordData = (word) => {
        fetch(wordBaseUrl + `?word=${word}` )
        .then(res => res.json())
        .then(showDefinitionAndSynonyms)
    }

    const showDefinitionAndSynonyms = (wordObject) => {
        const masterDiv = createElementWithId('div', 'definition-container')
        const nameDiv = createElementWithId('div', 'word-name')
        const defDiv = createElementWithId('div', 'word-def')
        const synDiv = createElementWithId('div', 'word-syn')
        let button = createElementWithId('button', 'exit-button')
        masterDiv.append(button)
        button.innerText = "X"
        document.getElementById('def-layout').append(masterDiv)
        let results = wordObject.results
        nameDiv.innerText = wordObject.word 
        for (const result of results) {
            createDefinitionDivs(result, defDiv)
            let syns = result.synonyms
            const ul = document.createElement('ul')
            if (syns) {createSynonymsLis(ul, syns)}
            synDiv.append(ul) 
        }
        masterDiv.append(nameDiv, defDiv, synDiv)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('span')) {
                let layout = document.getElementById('no-def-layout')
                layout.id = 'def-layout'
                wordContainer.style.zIndex = '1'
                wordContainer.style.backgroundColor = 'lightgray'
                document.getElementById("handle-search-bar").style.display = 'none'
                let word = e.target.textContent
                fetchWordData(word)
            } else if (e.target.matches('button') || e.target.matches) {
                console.log('hey')
                let layout = document.getElementById('def-layout')
                document.getElementById('definition-container').remove()
                layout.id = 'no-def-layout'
                wordContainer.style.backgroundColor = 'white'
            }
        })
    }


    const submitHandler = () => {
        const handleForm = document.getElementById('handle-search-bar')
        handleForm.addEventListener("submit", e => {
            e.preventDefault()
            searchContainer.className = "other-search"
            handle = handleForm.handle.value
            number = parseInt(handleForm.amount.value)
            displayMainPage(handle, number)        
        })
    }

    const displayMainPage = (handle, number) => {
        allWords = []
        wordContainer.innerHTML = ""
        const tweetContainer = document.getElementById("tweets-container")
        tweetContainer.innerHTML = ""
        tweetContainer.append(createATag(number, handle))
        tweetContainer.append(createTweetWidget())
        fetchData(handle, number)  
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

    //HELPER METHODS 

    const createElementWithId = (element, id) => {
        newElement = document.createElement(element)
        newElement.id = id
        return newElement
    }

    const createSynonymsLis = (ul, array) => {
        for (const word of array) {
            const li = document.createElement('li')
            li.innerText = word
            ul.append(li)
        }
    }

    const createDefinitionDivs = (resultObject, defDiv) => {
        defDiv.insertAdjacentHTML('beforeend',`
        <p> Defintion: ${resultObject.definition}</p>
        <p> Part of Speech: ${resultObject.partOfSpeech}</p>
        `)
    }

    submitHandler()
    clickHandler()
})