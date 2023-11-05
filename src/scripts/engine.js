const emojis = [
    "🦝",
    "🦝",
    "🐱",
    "🐱",
    "🐶",
    "🐶",
    "🐵",
    "🐵",
    "🐮",
    "🐮",
    "🐷",
    "🐷",
    "🐼",
    "🐼",
    "🐸",
    "🐸"
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i=0; i < emojis.length; i++) {
    let box = document.createElement("div");
    let idBox = document.createAttribute("id");
    idBox.value = i;
    box.setAttributeNode(idBox);

    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {

    playSound("mixkit-page-back-chime-1108.wav");

    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this)
    }  

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {

    if (openCards[0].innerHTML === openCards[1].innerHTML && openCards[0].id !== openCards[1].id) {
        openCards[0].classList.add("boxmatch");
        openCards[1].classList.add("boxmatch");
        playSound("mixkit-correct-answer-fast-notification-953.wav");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        playSound("mixkit-failure-arcade-alert-notification-240.wav");
    }

    openCards = [];

    if (document.querySelectorAll(".boxmatch").length === emojis.length) {
        Swal.fire({
            title: "Parabéns!",
            text: "Você encontrou todos os pares de animais.",
            imageUrl: "./src/images/logo2.webp",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Logo Jogo da Memória",
          });
    }

}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

const fullDate = new Date();
const date = document.getElementById("date");
date.innerHTML = fullDate.getFullYear();