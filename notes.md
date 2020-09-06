1. Get HTML search bar with submit event, for a search for an EXACT twitter handle.
<div>
    <form>
        <input text></input><>
    </form>
</div>

<div>
    scrolling tweets somehow 
</div>

2. Dynamic embed of a user's timeline through:
<a class="twitter-timeline" href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw">Tweets by TwitterDev</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

where, the handle is dynamic 

add all arrays together after parsing
and then split and get count


3. if pattern matches RT/https/filler words, delete, obj[word],
for each in obj,

    make a div or ul and li elements, 
    append each one to those elements
    render to page 



Things we've done: 
-Dynamic API calls to twitter
-Conglomerate all twitter words into an object, based on frequency 
-Twitter feed displays for last amount of requested tweets
-Got words and their count to display on screen 


Things we need to do:
-Sort words in array better, i.e. remove filler words (and, of, a ,the ,rt) if == string pattern/strings then .remove array[key]
-Render words onto page
    -Must be dependent on freq weight = styling, if freq > 2 class = word used alot , if === 0 style.display = hidden
    -Styling for this is important, some styling
-User model on backend 
    -Log in authorizations (devise)
    -Wordbank is an array in the table of User 
        -if user logged in through sessions/ current_user(devise)
            -have access to save feature for a word to get later
        -else 
            -no save, when trying to save, open a register option or something 



Stretch goals:
-Random poem 
-Translations
