var crowStart = document.getElementById("crow-start");
var crowStop = document.getElementById("crow-stop");
var crowMore = document.getElementById("crow-more");
var crowMsg = document.getElementById("crow-msg");
var crowMusic = document.getElementById("crow-music");
var crowContainer = document.getElementById("crow-container");
var crowLand = document.getElementById("crow-land");
var crowTemplate = document.getElementById("crow-template");

function randomCoords() {
    const x = Math.floor(Math.random() * crowLand.offsetWidth);
    const y = Math.floor(Math.random() * crowLand.offsetHeight);
    return [x, y];
}

function randomHeight() {
    return Math.floor(Math.random() * 150) + 105;
}

function makeCrows() {
    var crows = crowTemplate.cloneNode();
    var coords = randomCoords();
    crows.removeAttribute("id");
    crows.removeAttribute("hidden");
    crows.style.left = `${coords[0]}px`;
    crows.style.top = `${coords[1]}px`;
    crows.style.height = `${randomHeight()}px`;
    crowLand.appendChild(crows);
}

crowStart.addEventListener("click", function() {
    crowContainer.style.display = "block";
    crowMsg.textContent = "Crow attack!";

    crowMusic.volume = 0.25;
    crowMusic.currentTime = 0;
    crowMusic.play();

    var crowsNormalIntervalId = setInterval(makeCrows, 3000);
    crowContainer.dataset.intervalId = crowsNormalIntervalId;
});

crowMore.addEventListener("click", function() {
    var intervalId = crowContainer.dataset.intervalId;
    clearInterval(intervalId);
    crowMsg.textContent = "More crows?!";
    var crowsFastIntervalId = setInterval(makeCrows, 1000);
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