const envelope = document.getElementById('envelope');
const closedImg = document.getElementById('envelope-closed');
const openedImg = document.getElementById('envelope-opened');
const inviteContent = document.getElementById('invite-content');

envelope.addEventListener('click', () => {
closedImg.classList.remove('active');
openedImg.classList.add('active');

setTimeout(() => {
    envelope.style.display = 'none';
    inviteContent.style.display = 'block';
    inviteContent.classList.add('visible');
}, 1000);
});


document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const attendance = formData.get('attendance');
    const name = formData.get('name');
    const comment = formData.get('comment');

    const botToken = '8028551885:AAG9peBsjpohy2tjtV7SmrwCD0pHNwse9gA';
    const chatId = -1003415517742;
    const message = `Гость: ${name}\nОтветил: ${attendance}\nКомментарии: ${comment}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Сообщение отправлено!');
    })
    .catch(error => {
        alert('Ошибка при отправке сообщения');
        console.error(error);
    });
});