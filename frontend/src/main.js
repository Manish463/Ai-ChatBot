const chatBox = document.getElementById("chatBox");

function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.classList.add("message", className);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value;

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    // Show loading
    addMessage("Typing...", "bot");

    try {
        const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        // Remove "Typing..."
        chatBox.lastChild.remove();

        addMessage(data.reply, "bot");

    } catch (error) {
        chatBox.lastChild.remove();
        addMessage("Error connecting to server", "bot");
    }
}