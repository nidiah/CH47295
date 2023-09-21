const socket = io();

let user = '';

Swal.fire({
  title: 'Ingresa un correo',
  input: 'text',
  confirmButtonText: 'Ingresar',
}).then((result) => {
    user = result.value;
});

const box = document.getElementById('box');
const content = document.getElementById('cont');

box.addEventListener('change', (e) => {
  socket.emit('message', {
    email: user,
    message: e.target.value,
  });
});


socket.on('newMessage', (data) => {
  const messages = data.map(({ email, message }) => {
    return `<p>${email} dijo: ${message}</p>`;
  });

  content.innerHTML = messages.join('');
});