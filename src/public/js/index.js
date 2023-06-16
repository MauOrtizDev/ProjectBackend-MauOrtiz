console.log('funcionando');

const socket = io();

function updateProducts(products) {
    const ul = document.getElementById("real-time-products");
    ul.innerHTML = '';
  
    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product.title;
      // li.className = "real-time-item";
      ul.appendChild(li);
    });
  };
  
  // Recibir productos
  socket.on("products", products => {
    updateProducts(products);
  });

if(!document.getElementsByTagName("form")){
  
Swal.fire({
    title: "Welcome",
    input: "text",
    text: "Please enter your Nickname",
    inputValidator: (value) => {
        return !value && 'Entering a nickname is mandatory'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.emit("user", { user, message: "has joined the chat." });
});

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length>0) {
            socket.emit('message', {user:user,message:chatBox.value});
            chatBox.value = '';
        }};
});

socket.on("messageLogs", data => {

    let log = document.getElementById("messageLogs");
    let messages = '';

    data.forEach(message => {
      messages = messages+`${message.user} says: ${message.message}</br>`;
    });
    log.innerHTML = messages;
  });
/*

socket.emit('message', 'Se está dando la comunicación');

socket.on('evento_socket_individual', data => {
    console.log(data);
})

socket.on('evento_para_todos_menos_elactual', data => {
    console.log(data);
})

socket.on('evento_para_todos', data => {
    console.log(data);
})

*/
}