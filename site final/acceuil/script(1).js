document.addEventListener("DOMContentLoaded", function() {
    const chatForm = document.getElementById("chat-form");
    const chatBox = document.getElementById("chat-box");

    // Intercepter la soumission du formulaire de discussion
    chatForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la page de se recharger

        const usernameInput = document.getElementById("username");
        const messageInput = document.getElementById("message-text");

        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();

        if (username !== "" && message !== "") {
            // Créer dynamiquement la boîte de message
            const messageElement = document.createElement("div");
            messageElement.classList.add("chat-message");
            
            // Ajouter la date et l'heure actuelles
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageElement.innerHTML = `<strong>${username}</strong> <small style="color:#888;"> à ${timeString}</small>:<br>${message}`;
            
            // Ajouter le message en haut de l'espace de discussion
            chatBox.insertBefore(messageElement, chatBox.firstChild);

            // Vider la zone de texte du message uniquement (conserver le pseudo)
            messageInput.value = "";
        }
    });
});
