var togglePerry = document.getElementById("themeTogglePerry");
var toggleOde = document.getElementById("themeToggleOde");
var headerImage = document.getElementById("header");
var forumPortrait = document.getElementById("forum-portrait");
var forumSpecies = document.getElementById("forum-species");
var iframe = document.querySelector("iframe");

function getTheme() {
    // perry by default if not defined yet
    if (!localStorage.hasOwnProperty("theme")) {
        return "perry";
    } else {
        return localStorage.getItem("theme");
    }
}

function setTheme(theme) {
    localStorage.setItem("theme", theme);
}

function updateElements(theme) {
    document.body.className = (theme == "ode") ? "theme-ode" : "theme-perry";
    headerImage.src = (theme == "ode") ? "/assets/header-ode.webp" : "/assets/header-perry.webp";

    if (theme == "ode") {
        togglePerry.classList.remove("active");
        toggleOde.classList.add("active");
    } else {
        togglePerry.classList.add("active");
        toggleOde.classList.remove("active");
    }

    if (forumPortrait && forumSpecies) {
        forumPortrait.src = (theme == "ode") ? "/portraits/ode.jpg" : "/portraits/perry.jpg";
        forumSpecies.innerText = "Species: " + (theme == "ode" ? "White-tailed deer" : "Canada jay");
    }

    if (iframe) {
        iframe.contentDocument.body.className = (theme == "ode") ? "theme-ode" : "theme-perry";
    }
}

togglePerry.addEventListener("click", () => {
    updateElements("perry");
    setTheme("perry");
});

toggleOde.addEventListener("click", () => {
    updateElements("ode");
    setTheme("ode");
});

document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = getTheme();
    updateElements(currentTheme);
});