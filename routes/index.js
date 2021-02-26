const route = require('express').Router()
const User = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const Subject = require('../controllers/SubjectController')
// const { Router } = require('express')

route.get('/register',User.create)
route.post('/register',User.createPost)
route.get('/login',User.loginForm)
route.post('/login',User.loginPost)
route.get('/logout',User.destroy)
route.use(authentication)

route.get('/user', User.showUser)

// route.get('/',Subject.show)

//showUser
//showSubject
route.get('/subjects', Subject.show)

//addTask
route.get('/subjects/:id/addTask', Subject.addTask);
route.post('/subjects/:id/addTask', Subject.postTask);
route.get('/subject/:id/delete',Subject.del)
route.get('/subject/:id/edit',Subject.edit)
route.post('/subject/:id/edit',Subject.editPost)

//Show data Student
route.get('/user/:id/checkTask', User.inspectUser)


route.get('/user/:id/mark', User.mark)

module.exports = route


