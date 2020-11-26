# Launch Project

## About / Synopsis

* Educational website with basic information about text based mental health therapy
* Based on a powerpoint I did for a project
* Uses react and express for front end and backend


## Features
* Navbar for fast accessing
* About section: Why care about mental health
  * Top changes based on last subscribed name
  * Field to enter age. This sends a post request that displays statistics based on the entered age.
  * A button to show the hidden statistics graph
* Advantages section: 3 advantages of text based therapy
  * Question with image that displays answer when hovered over
* Subscribe section:
  * Subscribe form with name and email.
  * Backend keeps track of which email is subscribed and displays errors accordingly
  * Unsubscribe link to unsubscribe page
  * Download button for a get request for full pptx
* Unsubscribe page:
  * Email field and checks if it is already subscribed or not and displays error message accordingly


## Repository structure

* .gitignore with .env and node_modules.
* server.js with all of the structural code
* views folder with two ejs folder.
  * index.ejs for homepage
  * unsubscribe.ejs for unsubscribe page
* public folder
  * dowloads folder with a pptx file for my full presentation
  * css folder with main.css
  * images folder with images used in the website
 

    


## Limitations

* Emails are not stored in a database but in a local list.
* .env file has to be created with the key.

## How to run

Code uses node.js. Install yarn, create a new file named .env and type in 
    
    SESSION_SECRET = secret

In the terminal, run: 

    npm install
    yarn start

