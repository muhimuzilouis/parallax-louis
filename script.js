
    function loadMessages() {
    fetch('chat.php?action=get')
        .then(response => response.json())
        .then(data => {
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = "";
            data.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message');
                messageElement.innerHTML = `<span class="username">${message.username}:</span> <span class="message">${message.message}</span>`;
                chatMessages.appendChild(messageElement);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const messageText = chatInput.value.trim();
    if (messageText !== "") {
        fetch('chat.php?action=send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `message=${encodeURIComponent(messageText)}&username=Anonyme`
        }).then(() => {
            chatInput.value = "";
            loadMessages();
        });
    }
}

// Charger les messages toutes les 3 secondes
setInterval(loadMessages, 3000);
window.onload = loadMessages;





