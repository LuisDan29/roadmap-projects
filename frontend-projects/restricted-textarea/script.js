const TEXTAREA = document.getElementById("textarea");
const COUNTER = document.getElementById("counter");
const MAXIMUM = 250;


TEXTAREA.maxLength = MAXIMUM;
TEXTAREA.placeholder = "Escreva aqui...";


TEXTAREA.addEventListener("keyup", updateCounter);


function updateCounter() {
    let count = TEXTAREA.value.length;
    COUNTER.textContent = `${count}/${MAXIMUM}`;
    
    if (count === MAXIMUM) {
        changeColors("red");
    } else {
        changeColors("black");
    }
}

function changeColors(color) {
    TEXTAREA.style.border = `solid 2px ${color}`;
    TEXTAREA.style.color = color;
    COUNTER.style.color = color;
}