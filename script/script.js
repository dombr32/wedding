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