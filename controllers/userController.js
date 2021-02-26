const {User, Subject, Homework} = require('../models/index')
const {compare,hash} = require('../helpers/bcrypt')
const nodemailer = require('nodemailer')

class Controller {
    static create (req,res){
        res.render('register')
    }

    static createPost (req,res){
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        .then(
            (data)=>{
                console.log(data,'MASUKKK')
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: `hektiv8dami@gmail.com`,
                      pass: 'Aisobi40'
                    }
                  }); 
                  let mailOptions = {
                    from: 'hektiv8dami@gmail.com',
                    to: `${data.email}`,
                    subject: `inform`,
                    text: 'Your email has been registered!'
                  };

                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });


                res.redirect('/login')
            }
        )
        .catch(
            err=>{
                res.send(err)
            }
        )
    }

    static loginForm (req,res) {
        console.log(req.query)
        let error 
        if(req.query.message){
          error = req.query.message
        }
        res.render('login',{error})
    }

    static loginPost (req,res) {
        
        const login = {
            email: req.body.email,
            password: req.body.password 
        }
        User.findOne({
            where : {email : login.email}
        })
        .then(
            (user)=>{
                // console.log(user, 'INI USER')

                if(compare(login.password,user.password)&&(user.role === 'admin')){
                    req.session.admin = true 
                    // console.log('masuk admin');
                    res.redirect('/Subjects')
                }else if(compare(login.password,user.password)&&(user.role ==='user')){
                    req.session.admin = false
                    // console.log('masuk user');
                    res.redirect('/Subjects')
                }else {
                    console.log('gaktuh masuk sini')
                    res.redirect('/login?message=Invalid Username/password')
                }
            }
        )
        .catch(
            err=>{
                console.log('masuk catch')
                res.redirect('/login?message=Invalid Username/password')
            }

        )

    }
    static showUser(req, res){
        User.findAll()
        .then((data) => {
            res.render('user', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if(err) {
                res.send(err)
            } else {
                res.redirect('/subjects')
            }
        })   
    }

    static inspectUser(req, res) {
        let userId = Number(req.params.id)
        User.findByPk(userId, {
            include: {
                model: Subject
            }
        })
        .then((data) => {
            // res.send(data)
            res.render('inspectUser', {data})

        })
        .catch((err) => {
            res.send(err)
        })
    }

    static mark(req, res) {
        let markId = Number(req.params.id)
        Homework.findByPk(markId)
        .then((data) => {
            data.status = 'Finished'
            return data.save()
        })
        .then((data) => {
            res.redirect('/user')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static destroy(req,res){
        User.destroy({
            where : {
                id : +req.params.id
            }
        })
        .then(()=>{
            res.redirect('/user')

        })
        .catch(err=>{
            res.send(err)
        })
    }

}

module.exports = Controller