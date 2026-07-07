const envelope = document.getElementById('envelope');
const closedImg = document.getElementById('envelope-closed');
const openedImg = document.getElementById('envelope-opened');
const inviteContent = document.getElementById('invite-content');
const rsvpEndpoint = 'https://wedding-rsvp.ramandambrouski.workers.dev';

envelope.addEventListener('click', () => {
    closedImg.classList.remove('active');
    openedImg.classList.add('active');

    setTimeout(() => {
        envelope.style.display = 'none';
        inviteContent.style.display = 'block';
        inviteContent.classList.add('visible');
    }, 1000);
});


document.getElementById('myForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(e.target);

    if (rsvpEndpoint.includes('YOUR-WORKER-NAME')) {
        alert('Нужно указать адрес Cloudflare Worker в script/script.js');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Отправляем...';

    try {
        const response = await fetch(rsvpEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                attendance: formData.get('attendance'),
                comment: formData.get('comment'),
                website: formData.get('website')
            })
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        alert('Сообщение отправлено!');
        form.reset();
    } catch (error) {
        alert('Ошибка при отправке сообщения');
        console.error(error);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить';
    }
});
