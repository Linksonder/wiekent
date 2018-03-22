
var socket = require('../config/socket');


module.exports = function(app, passport, io)
{
    app.get('/', (req, res) => {
        sockets.send('new user', req.user);
        res.render('home', {user: req.user}) 
    });

    app.get('/reset', (req, res, next) =>  null );   
    app.get('/login', (req, res) => res.render('login') );
    app.get('/signup', (req, res) => res.render('signup', { message: req.flash('signupMessage') }));

    app.post('/login',  passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //posts
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    })); 

    
    /**
     * @swagger
     * /api/ishetweekend:
     *   get:
     *     tags:
     *       - wiekent
     *     description: Returns a object containg the truth and nothing but the truth
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An object containg the truth
     */
    app.get('/api/ishetweekend', (req, res) => {
        socket.emitAll('update', 'een nieuwe gebruiker!');
        res.send({ isWeekend: true, msg: "Het is altijd weekend!"});
    })

};