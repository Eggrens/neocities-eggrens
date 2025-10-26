// theme changing logic
var themeDiv = document.createElement('div');
themeDiv.className = "theme-switch clickable";

function getTheme() {
    // light mode by default if not defined yet
    if (!localStorage.hasOwnProperty("theme")) {
        return "light";
    } else {
        return localStorage.getItem("theme");
    }
}

function toggleTheme() {
    if (getTheme() === "dark") {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
    setColours();
}

function getVar(prop) {
    return window.getComputedStyle(document.body).getPropertyValue(prop);
}

function setVar(prop, value) {
    document.body.style.setProperty(prop, value);
}

function getVarArray(props) {
    return props.map((p) => getVar(p));
}

function setVarArray(props, vals) {
    for (let i = 0; i < props.length; i++) {
        setVar(props[i], vals[i]);
    }
}

function setColours() {
    const theme = getTheme();
    var lightCols = [
        '--stripe-one', '--stripe-two', '--stripe-three', '--cyblack', '--shade', '--link-one', '--link-two', '--link-three', '--grid'
    ];
    var darkCols = [
        '--stripe-one-dark', '--stripe-two-dark', '--stripe-three-dark', '--offwhite', '--shade-dark', '--link-one-dark', '--link-two-dark', '--link-three-dark', '--grid-dark'
    ];
    var themeProps = [
        '--primary', '--secondary', '--tertiary', '--main-text', '--dark', '--link', '--link-visited', '--link-hover', '--bg-grid'
    ];

    themeDiv.innerHTML = `<img class="theme-icon" src="/assets/${theme}-icon.png" alt="Switch the theme">`;
    document.body.style.backgroundImage = `url('/assets/${theme}-bg.png')`;
    setVarArray(themeProps, theme === 'dark' ? getVarArray(darkCols) : getVarArray(lightCols));

    var iframe = document.querySelector("iframe");
    if (iframe) {
        // just set grid background for iframe, don't bother with other colours, this code is ugly enough
        iframe.contentDocument.body.style.setProperty("--bg-grid", theme === 'dark' ? getVar('--grid-dark') : getVar('--grid'));
    }

    // set header image and buttons
    var top = document.getElementById("top");
    top.innerHTML = `
        <img class="header" src="/assets/header-${theme}.webp">
        <img class="nav" src="/assets/nav-${theme}.png" usemap="#navmap">
        <map name="navmap">
        <area alt="Home" title="Home" href="/index.html" coords="0,100,100,0,279,0,179,100" shape="poly">
        <area alt="Art Gallery" title="Art Gallery" href="/gallery.html" coords="180,100,280,0,459,0,359,100" shape="poly">
        <area alt="OCs (original characters)" title="OCs (original characters)" href="/characters.html" coords="360,100,460,0,639,0,539,100" shape="poly">
        <area alt="Commissions" title="Commissions" href="/commissions.html" coords="540,100,640,0,819,0,719,100" shape="poly">
        <area alt="Projects" title="Projects" href="/projects.html" coords="720,100,820,0,1000,0,900,100" shape="poly">
        </map>
    `;

    // set forum image and species if on index
    var forumPortrait = document.getElementById("forum-portrait");
    var forumSpecies = document.getElementById("forum-species");
    if (forumPortrait && forumSpecies) {
        forumPortrait.src = theme === "dark" ? "/portraits/ode.png" : "/portraits/perry.png";
        forumSpecies.innerText = "Species: " + (theme === "dark" ? "White-tailed deer" : "Canada jay");
    }
}

addEventListener("DOMContentLoaded", function() {
    setColours();
    document.body.append(themeDiv);
    themeDiv.addEventListener('click', toggleTheme);
});