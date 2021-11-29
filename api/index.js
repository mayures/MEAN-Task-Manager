const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())

const { List, Task } = require('./models')

const port = 3000

app.listen(port, () => {
    console.log(`app listening on port:${port}`)
})

mongoose.connect(process.env.mongodb).then(() => {
    console.log('connected to database')
}).catch(err => {
    console.error(err)
})

app.get('/lists', (req, res) => {
    List.find().then((lists) => {
        res.send(lists)
    })
})

app.post('/lists', (req, res) => {

    let title = req.body.title

    const newList = new List({
        title: title
    })
    newList.save().then((list) => {
        res.send(list)
    }).catch(err => {
        res.send(err)
    })
})

app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title } }).then(() => {
        res.sendStatus(200)
    })
})

app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({ _id: req.params.id }).then((removedList) => {
        res.send(removedList)
    })
})

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId }).then((tasks) => {
        res.send(tasks)
    })
})

app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })

    newTask.save().then((newTask) => {
        res.send(newTask)
    })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _id: req.params.taskId, _listId: req.params.listId }, { $set: req.body }).then(() => {
        res.sendStatus(200)
    })
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({ _id: req.params.taskId, _listId: req.params.listId }).then((deletedTask) => {
        res.send(deletedTask)
    })
})

// app.get('/lists/:listId/tasks/:taskId', (req, res) => {
//     Task.findOne({ _id: req.params.taskId, _listId: req.params.listId }).then((Task) => {
//         res.send(Task)
//     })
// })