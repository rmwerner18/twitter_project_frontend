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
    const tweetContainer = document.getElementById("tweets-container")
    let header = document.getElementById('header')
    let handle 
    let number

    const fetchData = (handle, number) => {
        fetch(baseUrl + `/?handle=${handle}&number=${number}`)
        .then(res => res.json())
        .then(data => {
            pushTweetsIntoFilteredArray(data)
            checkLoggedIn(document.querySelector('body'))
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
            } else {
                wordsWithNoArticles.push(word)
            }
        }
    }

    const countOccurrences = arr => {
        return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    }

    const makeWordCloud = (list) => {
        WordCloud(wordContainer, { list: list, gridSize: 10,
            weightFactor: 1,
            minSize: "10",
            shape: "star",
            fontFamily: '"Courier New", Courier, monospace',
            color: '#f0f0c0',
            backgroundColor: "lightgrey" } );
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
        const masterDiv = document.getElementById('definition-container')
        console.log(masterDiv)
        masterDiv.style.display = 'grid'
        const nameDiv = createElementWithId('div', 'word-name')
        const defDiv = createElementWithId('div', 'word-def')
        const synDiv = createElementWithId('div', 'word-syn')
        let button = createElementWithId('button', 'exit-button')
        let addButton = createElementWithId('button', 'add-button')
        let addDiv = createElementWithId('div', 'add-container')

        masterDiv.append(button)
        button.innerText = ">"
        document.getElementById('def-layout').append(masterDiv)
        let results = wordObject.results
        nameDiv.innerHTML = `
            <h3 id="word-header">${wordObject.word}</h3>
        `
        for (const result of results) {
            const singleSynDiv = createElementWithId('div', 'single-syn')
            createDefinitionDivs(result, defDiv)
            let syns = result.synonyms
            const ul = document.createElement('ul')
            singleSynDiv.append(ul)
            if (syns) {createSynonymsLis(ul, syns)}
            synDiv.append(singleSynDiv)
        }
        addButton.innerText = "Add word to bank"
        addDiv.append(addButton)
        nameDiv.append(addDiv)
        masterDiv.append(nameDiv, defDiv, synDiv)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('span')) {
                let layout = document.getElementById('no-def-layout')
                if (layout) {
                    layout.id = 'def-layout'
                }
                if (document.querySelector("#word-bank-button").className === "out") {
                    document.querySelector("#word-bank-button").classList.remove("out")
                }
                definitionContainer.innerHTML = ""
                wordContainer.style.zIndex = '1'
                wordContainer.style.backgroundColor = 'lightgray'
                // document.getElementById("handle-search-bar").style.display = 'none'
                let word = e.target.textContent
                fetchWordData(word)
            } else if (e.target.matches('#exit-button')) {
                console.log('hey')
                const wordBankButton = document.getElementById('word-bank-button')
                let layout = document.getElementById('def-layout')
                if (wordBankButton) {
                    if (wordBankButton.className === "out") {
                        wordBankButton.classList.remove("out")
                    }
                }
                definitionContainer.innerHTML = ""
                definitionContainer.style.display = "none"
                layout.id = 'no-def-layout'
                // wordContainer.style.backgroundColor = ''
                // if (document.getElementById("handle-search-bar").style.display === 'none') {
                //     document.getElementById("handle-search-bar").style.display = 'flex'
                // }
                wordContainer.style.zIndex = '0'
            }
            else if (e.target.matches('#sign-in-button')) {
                if (document.getElementById('sign-in-button').innerText == 'Sign Out') {
                    location.reload()
                } else if (document.getElementById('sign-in-button').innerText == 'Sign In' && document.getElementById('sign-in-form')) {
                    document.getElementById('sign-in-form').remove()
                }
                else {
                    showSignInForm()
                }
            }
            else if (e.target.matches('li')) {
                definitionContainer.innerHTML = ""
                fetchWordData(e.target.innerText)
            }
            else if (e.target.matches('#add-button')) {
                if (document.querySelector('body').dataset.userHandle) {
                    selectUser(document.getElementById('word-header').innerText, document.querySelector('body').dataset.userId, 'add')
                    console.log(document.getElementById('word-header').innerText)
                } else {
                    console.log("hello")
                }
            }
            else if (e.target.matches('#word-bank-button')) {
                const bodyId = parseInt(document.querySelector('body').dataset.userId)
                const noDefLayout = document.getElementById('no-def-layout')
                if (noDefLayout) {
                    noDefLayout.id = 'def-layout'
                    wordContainer.style.backgroundColor = 'lightgray'
                }
                const defLayout = document.getElementById('def-layout')
                definitionContainer.style.display = 'flex'
                definitionContainer.innerHTML = `
                <button id="exit-button"> > </button>
                <div id="words-div"></div>`
                definitionContainer.classList.add("wordbank-container")
                if (e.target.className === "out") {
                    e.target.classList.remove("out")
                    defLayout.id = "no-def-layout"
                    // wordContainer.style.backgroundColor = 'white'
                    definitionContainer.innerHTML = ""
                } else {
                    e.target.classList.add("out")
                    fetchUserData(bodyId)
                }   
            } 
            else if (e.target.matches('.delete-button')) {
                userId = parseInt(document.querySelector('body').dataset.userId)
                selectUser(e.target.previousSibling.innerText, userId, 'delete')
                e.target.previousSibling.remove()
                console.log(e.target)
                e.target.remove()
            } 
            // else if (e.target.matches('.word-bank-span')) {
            //     let layout = document.getElementById('no-def-layout')
            //     if (layout) {
            //         layout.id = 'def-layout'
            //     }
            //     definitionContainer.innerHTML = ""
            //     wordContainer.style.zIndex = '1'
            //     wordContainer.style.backgroundColor = 'lightgray'
            //     // document.getElementById("handle-search-bar").style.display = 'none'
            //     let word = e.target.textContent
            //     fetchWordData(word)
            // }
        })
    }


    const submitHandler = () => {
        document.addEventListener("submit", e => {
            wordContainer.style.display = "block"
            tweetContainer.style.display = "block"
            e.preventDefault()
            searchContainer.remove()
            document.getElementById("other-handle-search-bar").style.display = 'flex'
            if (e.target.matches('.search-form')) {
                e.preventDefault()
                handle = e.target.handle.value
                number = parseInt(e.target.amount.value)
                displayMainPage(handle, number)        
            } else if (e.target.matches('#sign-in-form')) {
                const user_handle = (e.target.user.value)
                createOrFindUser(user_handle)
                displayMainPage(user_handle, number = 20)
                document.getElementById('sign-in-form').remove()
                document.getElementById('sign-in-button').innerText = 'Sign Out'
            } else if (e.target.matches("#words-div span")) {
                console.log("hello!")
            }
        })
    }

    const displayMainPage = (handle, number) => {
        allWords = []
        wordCount = []
        wordsWithNoArticles = []
        wordCloudArray = [] 
        wordContainer.innerHTML = ""
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
            <p> Definition: ${resultObject.definition}</p>
            <p> Part of Speech: ${resultObject.partOfSpeech}</p>
        </div>
        `)
    }

    const createOrFindUser = (user_handle) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                handle: user_handle
            })
        }).then(resp => resp.json())
        .then(setCurrentUser) 
    }

    const showSignInForm = () => {
        const signInForm = createElementWithId('form', 'sign-in-form')
        signInForm.innerHTML = `
        <input name="user" type="text" placeholder="Enter Your Own Handle">
        <input type="submit">`
        if (document.getElementById('sign-in').children.length === 1) { 
            document.getElementById('sign-in').append(signInForm)
        }
    }

    const setCurrentUser = (userObject) => {
        document.querySelector('body').dataset.userId = userObject.id
        document.querySelector('body').dataset.userHandle = userObject.handle
    }

    const selectUser = (word, id, deleteOrAdd) => {
        fetch('http://localhost:3000/users/' + `${id}`)
        .then( res => res.json())
        .then( userObj => {
            let words = userObj.words
            const id = userObj.id 
            if (deleteOrAdd === 'delete') {
                // document.getElementById('words-div').innerHTML = ""
                words = words.filter(element => element !== word)
                addToWordBank(words, id)
            } else {
                words.push(word)
                addToWordBank(words, id)
            }
        })
    }

    const addToWordBank = (wordArray, id) => {
        options = {
            method: 'PATCH',
            headers: {
                'content-type':'application/json',
                'accept':'application/json'
            },
            body: JSON.stringify({
                words: wordArray
            })
        }
        fetch('http://localhost:3000/users/' + id + `/?words=:${wordArray}`, options)
        .then(res => res.json())
        .then(console.log)
    }

    const checkLoggedIn = (body) => {
        if (body.dataset.userId) {
            document.getElementById('word-bank-button').style.display = "block"
            return true
        }
        else {
            console.log('not logged in')
            return false
        }
    }

    const fetchUserData = (id) => {
        fetch('http://localhost:3000/users/' + id)
        .then( res => res.json())
        .then(userObj => {
            const words = userObj.words
            console.log(words)
            document.getElementById('words-div').innerHTML = ""
            iterateWords(words)
        })
    }

    const iterateWords = (wordArray) => {
        for (const word of wordArray) {
            displayWordInBank(word)
        }
    }

    const displayWordInBank = (word) => {
        const span = document.createElement('span')
        span.innerText = word
        span.className = "word-bank-span"
        span.style.zIndex = "2"
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-button')
        deleteButton.innerText = "Delete"                   
        document.getElementById("words-div").append(span)
        document.getElementById("words-div").append(deleteButton)
    }


    // const deleteFromWordBank = (word, id) => {
    //     const options = {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json',
    //             'accept': 'application/json'
    //         },   
    //     }

    //     fetch('http://localhost:3000/users/' + id + `/?words=:${word}`, options)
    // }

    submitHandler()
    clickHandler()
})