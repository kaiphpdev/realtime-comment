const express = require('express');
const app = express();


app.use(express.json);


app.get('/dmoe', (req, res) => {
    res.send('GET request to the homepage')
  })


const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));


// START DATABASE

const dbConnection = require('./db');
const Comment = require('./models/comment');
dbConnection()

// END DATABASE

// START API's



// app.get('api/comments', (req, res)=>{
//     console.log('req');
//     return res.send(req);
//     const comment = new Comment({
//         username:req.body.username,
//         comment:req.body.comment,
//     });
//     comment.save().then((response)=>{
//         return res.send(response)
//     });

// });

// END API's






const server = app.listen(PORT, () => {
    console.log(`post is ${PORT}`);
})

// let io = require('socket.io')(server);


// io.on('connection', (socket)=>{
//     // console.log(`new connection >>> ${socket.id}`)



// // Receive Event
//     socket.on('comment', (data)=>{
//         console.log('data >>> ', data);
//         data.time = Date();
//         socket.broadcast.emit('serverComment', data)
//     });
    
//     socket.on('typing', data => {
//         console.log('data >>> ', data);
//         socket.broadcast.emit('serverTyping', data)
//     });

// })
