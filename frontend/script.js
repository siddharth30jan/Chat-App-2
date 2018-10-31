let socket= io();
socket.on('connected',()=>{
    console.log("Connected "+socket.id);
})

$(function(){
    let msglist=$('#msglist')
    let sendbtn=$('#sendmsg')
    let msgbox=$('#msgbox')
    let loginbox=$('#loginbox')
    let loginbtn=$('#loginbtn')
    let logindiv=$('#login-div')
    let chatdiv=$('#chat-div')

    let user=''
    sendbtn.click(function(){
        socket.emit('send_msg', {
            user: user,
            message: msgbox.val()})
    })

    loginbtn.click(function(){
        user=loginbox.val()
        chatdiv.show()
        logindiv.hide()
    })

    socket.on('recv_msg',function(data){
        msglist.append($('<li>'+ data.user + ':' + data.message+ '</li>'))
    })
})