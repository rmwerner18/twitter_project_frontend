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
    let definitionContainer = document.getElementById('definition-container')
    let header = document.getElementById('header')

    let handle 
    let number

    const fetchData = (handle, number) => {
        fetch(baseUrl + `/?handle=${handle}&number=${number}`)
        .then(res => res.json())
        .then(data => {
            pushTweetsIntoFilteredArray(data)
            wordCount = countOccurrences(wordsWithNoArticles)
            wordCloudArray = turnWordsIntoCloudArray(wordCount)
            console.log(wordCloudArray)
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
        button.innerText = ">"
        document.getElementById('def-layout').append(masterDiv)
        let results = wordObject.results
        nameDiv.innerText = wordObject.word 
        for (const result of results) {
            const singleSynDiv = createElementWithId('div', 'single-syn')
            createDefinitionDivs(result, defDiv)
            let syns = result.synonyms
            const ul = document.createElement('ul')
            singleSynDiv.append(ul)
            if (syns) {createSynonymsLis(ul, syns)}
            synDiv.append(singleSynDiv)
        }
        masterDiv.append(nameDiv, defDiv, synDiv)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('span')) {
                let layout = document.getElementById('no-def-layout')
                layout.id = 'def-layout'
                // wordContainer.style.zIndex = '1'
                wordContainer.style.backgroundColor = 'lightgray'
                // document.getElementById("handle-search-bar").style.display = 'none'
                let word = e.target.textContent
                fetchWordData(word)
            } else if (e.target.matches('#exit-button')) {
                console.log('hey')
                let layout = document.getElementById('def-layout')
                document.getElementById('definition-container').remove()
                layout.id = 'no-def-layout'
                wordContainer.style.backgroundColor = 'white'
                document.getElementById("handle-search-bar").style.display = 'flex'
                wordContainer.style.zIndex = '0'
            }
            else if (e.target.matches('#sign-in-button')) {
                showSignInForm()
            }
        })
    }


    const submitHandler = () => {
        // const handleForm = document.getElementById('first-handle-search-bar')
        document.addEventListener("submit", e => {
            e.preventDefault()
            searchContainer.remove()
            handle = e.target.handle.value
            number = parseInt(e.target.amount.value)
            displayMainPage(handle, number)        
            document.getElementById("other-handle-search-bar").style.display = 'flex'
        })
    }

    const displayMainPage = (handle, number) => {
        allWords = []
        wordCount = []
        wordsWithNoArticles = []
        wordCloudArray = [] 
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
        <div class="single-def">
            <p> Defintion: ${resultObject.definition}</p>
            <p> Part of Speech: ${resultObject.partOfSpeech}</p>
        </div>
        `)
    }

    const createUser = (user_handle) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user_handle: user_handle
            })
        })
    }

    const showSignInForm = () => {
        const signInForm = createElementWithId('form', 'sign-in-form')
        signInForm.innerHTML = `
        <input name="user-handle" type="text" placeholder="Enter Your Own Handle">
        <input name="password" placeholder="Password" type="text">
        <input type="submit">`
        if (document.getElementById('sign-in').children.length === 1) { 
            document.getElementById('sign-in').append(signInForm)
        }
    }

    const createNewSession = (user_handle) => {
        fetch('http://localhost:3000/sessions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                user_handle: user_handle
            })
        })
    }
    
    // createNewSession('this_is_yet_another_handle')
    // createUser('this_is_a_handle')
    submitHandler()
    clickHandler()
})