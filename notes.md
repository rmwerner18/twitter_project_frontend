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



Things we've done: 
-Dynamic API calls to twitter
-Conglomerate all twitter words into an object, based on frequency 
-Twitter feed displays for last amount of requested tweets
-Got words and their count to display on screen 


Things we need to do:

-User model on backend 
    -Log in authorizations (devise)
    -Wordbank is an array in the table of User 
        -if user logged in through sessions/ current_user(devise)
            -have access to save feature for a word to get later
        -else 
            -no save, when trying to save, open a register option or something 

Goals for 9/7

All promary goals met
Secondary goals:
    go back from the definition page
    Refactoring in general
    Nicer styling for borders/colors on main page 
        -Larger search bar
        -Custom buttons maybe

Goals for 9/8

go back from the definition page
Authorize with Twitter account
Basic authorization done
User model building
WordBank model Building 
Join table model building 
Saving words 
Mailer set up to send someone list of synonyms in their word bank at the end of their session




styling of search bar: 
    .parent of search bar {
        display: grid;
        place-items: center;
    }

    on click ---> change to what we have now only if class is 

Stretch goals:
-Random poem 
-Translations
