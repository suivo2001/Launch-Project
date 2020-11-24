const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
// use dotenv
require('dotenv').config()
// set the directory to public
app.use(express.static(__dirname + '/public'));
// set up body parsing
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// set up session and flash
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

// creates array to store emails, not ideal compared to database
const emails = []
// creates variables to send to the webpage
var curName = ""
var percent = null


// set up our templating engine
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

/** 
* Get request for home page.
* @summary Loads ejs and the variables from other post requests. Uses error message for subscribe function
*/
app.get('/', (req,res) => {
    res.render("index.ejs", {name: curName, percentage: percent, message: req.flash('message')})
})

/** 
* Get request for unsubscribe page
* @summary Loads ejs, current name and error message for unsubscribe function
*/
app.get('/unsubscribe', (req,res) =>{
    res.render('unsubscribe.ejs', {name: curName, errormessage: req.flash('errormessage')})
})

/** 
* Get request for download page
* @summary downloads powerpoint version of the website
*/
app.get('/download', (req,res) => {
    res.download("./public/downloads/summary.pptx")
})

/** 
* Post request for check page
* @summary reads the input number in the field, and returns the percent based on a graph.
*/
app.post('/check', (req,res) => {
    // reads the age from the field
    var age = req.body.age
    // sets percent to the appropriate percentage
    if (age>=50){
        percent = 14.3
    }
    else if(age>=26){
        percent = 21.4
    }
    else {
        percent = 29.8
    }
    // loads homepage with the value
    res.redirect('/')
})

/** 
* Post request for unsubscribe page
* @summary reads the input email in the field, and removes email from the list if it was in it.
*/
app.post('/unsubscribe', (req,res) =>{
    // checks if our mail list contains the email
    var contained = false
    for (i = 0;i<emails.length;i++){
        if(emails[i].email===req.body.email){
            // removes email if it was contained sets contained to true
            contained = true
            emails.splice(i, 1)
        }
    }
    // sets message to successful if removed and redirects to bottom of homepage
    if(contained){
        req.flash('message','Sucessfully unsubscribed!')
        res.redirect('/#subscribe')
        curName = ""
    }
    // if didn't include in the list, display message and stay on the page
    else {
        req.flash('errormessage','Email not subscribed!')
        res.redirect('/unsubscribe')
    }
})

/** 
* Post request for home page
* @summary reads the input email and name in the fields, and adds email to list if email was not subscribed.
*/
app.post('/', (req,res) =>{
    // check if email is already subscribed
    var contained = false
    for (i = 0;i<emails.length;i++){
        if(emails[i].email===req.body.email){
            contained = true
        }
    }
    // if it is not in list, add email to list and update current name based on the field.
    if(!contained){
        req.flash('message','Sucessfully subscribed!')
        emails.push({
            email: req.body.email
        })
        curName = req.body.name
    }
    // else flash message
    else {
        req.flash('message','Email already subscribed!')
    }
    // goes to bottom of the page in the subscribe section.
    res.redirect('/#subscribe')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})