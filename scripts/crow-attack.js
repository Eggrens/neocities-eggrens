var crowStart = document.getElementById("crow-start");

var crowContainer = document.createElement("div");
crowContainer.id = "crow-container";

var crowControls = document.createElement("div");
crowControls.id = "crow-controls";

var crowLand = document.createElement("div");
crowLand.id = "crow-land";

var crowMsgContainer = document.createElement("div");
crowMsgContainer.id = "crow-msg-container";
crowMsgContainer.innerHTML = `
<span class='crow-msg'>Crow attack!</span>
<span class='crow-msg'>Crow attack!</span>
`;

var crowButtonContainer = document.createElement("div");
crowButtonContainer.id = "crow-button-container";

var crowStop = document.createElement("button");
crowStop.id = "crow-stop";
crowStop.className = "clickable"
crowStop.innerHTML = "Stop Crow Attack";

var crowMore = document.createElement("button");
crowMore.id = "crow-more";
crowMore.className = "clickable"
crowMore.innerHTML = "Uh-oh!";

var crowMusic = document.createElement("audio");
crowMusic.id = "crow-music";
crowMusic.controls = true;
crowMusic.src = "https://files.catbox.moe/xa6ymx.mp3";

var trackMsg = document.createElement("span");
trackMsg.id = "crow-track";
trackMsg.innerHTML = "&#x266B; Survival Step - Tomonori Sawada, Sonic Riders OST";

crowButtonContainer.append(crowStop, crowMore);
crowControls.append(crowButtonContainer, crowMusic, trackMsg);
crowContainer.append(crowControls, crowLand, crowMsgContainer);
document.body.append(crowContainer);

var crowCounter = 0;
var crowCaw = new Audio("https://files.catbox.moe/a0qn7c.mp3");
crowCaw.volume = 0.25;

function randomCoords() {
    const x = Math.floor(Math.random() * crowLand.offsetWidth);
    const y = Math.floor(Math.random() * crowLand.offsetHeight);
    return [x, y];
}

function randomHeight() {
    return Math.floor(Math.random() * 150) + 105;
}

function changeMessage(text) {
    var msgs = crowMsgContainer.querySelectorAll(".crow-msg");
    for (m of msgs) {
        m.textContent = text;
    }
}

function makeCrows() {
    if (crowCounter <= 100) {
        var crows = document.createElement("img");
        crows.className = "crows";
        crows.src = "/assets/crows.gif";

        var coords = randomCoords();
        crows.style.left = `${coords[0]}px`;
        crows.style.top = `${coords[1]}px`;
        crows.style.height = `${randomHeight()}px`;
        crowLand.appendChild(crows);
        crowCaw.play();
        crowCounter++;
    } else if (crowCounter == 101) {
        changeMessage("No more crows are coming, for now...");
        clearInterval(crowContainer.dataset.intervalId);
    }
}

crowStart.addEventListener("click", function() {
    crowContainer.style.display = "block";
    changeMessage("Crow attack!");

    crowMusic.volume = 0.25;
    crowMusic.currentTime = 0;
    crowMusic.play();

    var crowsNormalIntervalId = setInterval(makeCrows, 2900);
    crowContainer.dataset.intervalId = crowsNormalIntervalId;
});

crowMore.addEventListener("click", function() {
    var intervalId = crowContainer.dataset.intervalId;
    clearInterval(intervalId);
    changeMessage("More crows?!");
    var crowsFastIntervalId = setInterval(makeCrows, 1450);
    crowContainer.dataset.intervalId = crowsFastIntervalId;
});

crowStop.addEventListener("click", function() {
    crowContainer.style.display = "none";
    crowMusic.pause();

    var intervalId = crowContainer.dataset.intervalId;
    clearInterval(intervalId);

    while (crowLand.hasChildNodes()) {
        crowLand.removeChild(crowLand.firstChild);
    }
});