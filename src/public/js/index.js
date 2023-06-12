console.log('funcionando');

const socket = io();
socket.emit('message','Se está dando la comunicación');

socket.on('evento_socket_individual', data =>{
    console.log(data);
})

socket.on('evento_para_todos_menos_elactual', data =>{
    console.log(data);
})

socket.on('evento_para_todos', data =>{
    console.log(data);
})