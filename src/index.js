document.addEventListener("DOMContentLoaded", e => {
    console.log("page loaded")
    
    const submitHandler = () => {
        const form = document.getElementById('handle-search-bar')
        form.addEventListener("submit", e => {
            e.preventDefault()
            const handle = form.handle.value
            const tweetContainer = document.getElementById("tweets-container")
            tweetContainer.innerHTML = ""
            const a = document.createElement('a')
            a.classList.add("twitter-timeline")
            a.dataset.width = "250"
            a.dataset.height = "450"
            a.dataset.theme = "light"
            a.dataset.tweetLimit = parseInt(form.amount.value) 
            a.href = `https://twitter.com/${handle}`
            const script = document.createElement("script")
            script.src = "https://platform.twitter.com/widgets.js"
            script.charset = "utf-8"
            tweetContainer.append(a)
            tweetContainer.append(script)         
        })
    }
    submitHandler()
})