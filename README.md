// Tweet from the Clouds // 

Link to back-end repo: https://github.com/cdemarti/twitter_project_backend

1. Introduction
2. PreReqs
3. Instructions
4. Contributors/Contact Info
5. License 



1. Our application uses the Twitter API and the WordsAPI as well as the wordcloud2.js library to make a visually appealing data analysis of a User's word selection in their Tweets. We select either the last 10, 15 or 20 Tweets of a User and return their most frequently used words in a word cloud. A User is then able to select words, getting a list of definitions as well as a list of synonyms for these words. If a User chooses to log in, they also have the ability to save a word to their WordBank, being able to call upon the words at a later time. This application was designed with social media managing in mind. Unique word choice in social media posts is extremely important for user engagement. 

2. A solid understanding of the following concepts would be beneficial to using and expanding on this project: 
    - Ruby on Rails
    - Vanilla JavaScript
    - JQuery
    - wordcloud2.js 
    - Twitter API
    - WordsAPI

3. Instructions
    - For viewing your own Tweets:
        - Locate the sign in field at the top left corner of the page. 
        - After you enter your Twitter handle, you will automatically be shown your TweetCloud of the last 20 Tweets.
        - Click on a word in the word cloud to have the definitions panel pop up.
        - To exit the panel, click on the button located on the left hand side of the panel.
        - To save words, click on the desired word, either from the word cloud or the synonyms list, and then click the save word button
        in order to save that word to your word bank.
        - To view your saved words, hit the word bank button located next to the sign in button. 
        - To exit your WordBank, hit the same button as you did to exit the definitions panel. 


    - For viewing someone else's Tweets:
        - Locate the search bar in the middle of the page.
        - Enter the EXACT handle, case sensitive, for the user whose tweets you would like to see.
        - Select the amount of Tweets you would like to see as well. 
        - There is no word bank functionality for non signed-in users. 
        - In order or to make a new search, locate the new search bar in the header and repeat the above steps. 

4. Contributors
   
    - Cody DeMartin (https://github.com/cdemarti/)
        - Contact Information: 
            - codythomasdemartin@gmail.com
    
    - Ryan Werner (https://github.com/rmwerner18)
        - Contact Information: 
            - rmwerner@umich.edu

5. License 
    Copyright (c) 2005-2020 David Heinemeier Hansson

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.