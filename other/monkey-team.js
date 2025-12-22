var genButton = document.getElementById("generate");
var pickPathsToggle = document.getElementById("pick-paths");
var monkeyPortraits = document.querySelectorAll(".monkey-portrait");
var monkeyInfos = document.querySelectorAll(".monkey-info");
var pickPathsSet;
var monkeys;

fetch("/other/monkeys.json")
.then((resp) => resp.json())
.then((data) => {
    monkeys = data.monkeys;
});

window.onload = togglePath;
genButton.addEventListener("click", generateTeam);
pickPathsToggle.addEventListener("change", togglePath);

function togglePath() {
    pickPathsSet = pickPathsToggle.checked;
    monkeyInfos.forEach((info) => {
        let path = info.querySelector(".monkey-path");
        path.hidden = !pickPathsSet;
        let pathName = info.querySelector(".monkey-path-name");
        pathName.hidden = !pickPathsSet;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateTeam() {
    var currentTeam = [-1, -1, -1];
    for (let i = 0; i < 3; i++) {
        var randIndex;
        do {
            randIndex = getRandomInt(monkeys.length);
        } while (currentTeam.includes(randIndex));

        currentTeam[i] = randIndex;
        var monkey = monkeys[randIndex];
        var portrait = monkeyPortraits[i];
        var info = monkeyInfos[i];

        info.querySelector(".monkey-name").innerHTML = monkey.name;
        portrait.setAttribute("src", `btd6-portraits/${monkey.portrait}`);
        setRandomPath(info, monkey);
    }
}

function setRandomPath(info, monkey) {
    switch (getRandomInt(3)) {
        case 0:
            info.querySelector(".monkey-path").innerHTML = "5-X-X";
            info.querySelector(".monkey-path-name").innerHTML = monkey.top_path;
            break;
        case 1:
            info.querySelector(".monkey-path").innerHTML = "X-5-X";
            info.querySelector(".monkey-path-name").innerHTML = monkey.mid_path;
            break;
        default:
            info.querySelector(".monkey-path").innerHTML = "X-X-5";
            info.querySelector(".monkey-path-name").innerHTML = monkey.bot_path;
    }
}