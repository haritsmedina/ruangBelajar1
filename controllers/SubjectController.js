const {Subject,User, Homework} = require('../models/index')
class Controller {

    static show(req,res){
        Subject.findAll()
        .then(
            data=>{
                // console.log(data)
                // res.send(data)
                // res.send(data)
                res.render(('subject') , {data})
            }
        )
        .catch(
            err=>{
                res.send(err)
            }
        )
    }

    static add(req,res){
        res.render('addSubject')
    }

    static addPost(req,res){
        
        Subject.create({
            description : req.body.description,
            category : req.body.category
        })
        .then(data=>{
            res.redirect('/subjects')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static del(req,res){
        Subject.destroy({
            where: {
                id : +req.params.id
            }
        })
        .then(()=>{
            res.redirect('/subjects')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addTask(req, res) {
        let taskList;
        let getId = Number(req.params.id)
        Subject.findByPk(getId, {
            include: {
                model: User
            }
        })
        .then((data) => {
            taskList = data;
            return User.findAll()
        })
        .then((data) => {
            // res.send(taskList)
            // res.send(data)
            res.render('addTask', {data, taskList})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static postTask(req, res) {
        const taskSend = {
            SubjectId: Number(req.params.id),
            UserId: Number(req.body.UserId),
        }

        Homework.create(taskSend)
        .then((data) => {
            // res.send(data)
            res.redirect('/subjects')
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static edit(req,res){
        // console.log(req.params.id,'INI DARI PARAMS')
        Subject.findByPk(+req.params.id)
        .then(data=>{
            
            res.render('editSubject',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editPost(req,res){
        console.log(req.body)
        Subject.update({
            description: req.body.description,
            
        }, {where: {
            id : +req.params.id
        }})
        .then(
            ()=>{ console.log('MASUK PAK EKO');
                res.redirect('/subjects')
            }
          
        )
        .catch(
            err =>{

                res.send(err)
            }
        )      

    }

}

module.exports = Controller