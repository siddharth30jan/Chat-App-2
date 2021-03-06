const express=require('express')
const path=require('path')
const socketio=require('socket.io')
const http=require('http')
const app=express();
const server=http.createServer(app);

const io=socketio(server)
app.use('/',express.static(path.join(__dirname,'frontend')));

let storage={}

io.on('connection',(socket)=>{
    console.log("New socket formed from "+socket.id)
    socket.emit('connected')

   
    socket.on('send_msg',(data)=>{
        storage[data.user]=socket.id
    })

    socket.on('send_msg',(data)=>{
        //console.log("Recieved Message = " + data.message)

        //io.emit  sabko jayega including ME
        //socket.broadcast se sirf dusron ko jayega!!
        if(data.message.startsWith('@'))
        {
            let temp=data.message.split(':')[0].substr(1)
            let send_socketid=storage[temp]
           io.to(send_socketid).emit('recv_msg',data)

        }
        else{
            socket.broadcast.emit('recv_msg', data);
        }
    })
})


server.listen(1478);
