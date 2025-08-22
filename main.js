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
        <img class="header" src="/assets/header-${theme}.png">
        <img class="nav" src="/assets/placeholder-buttons.png" usemap="#navmap">
        <map name="navmap">
        <!-- temporary image map until actual buttons get drawn :) -->
        <area alt="Home" title="Home" href="/index.html" coords="1,1,169,124" shape="rect">
        <area alt="Art Gallery" title="Art Gallery" href="/gallery.html" coords="174,1,367,124" shape="rect">
        <area alt="OCs (original characters)" title="OCs (original characters)" href="/characters.html" coords="371,0,576,124" shape="rect">
        <area alt="Commissions" title="Commissions" href="/commissions.html" coords="582,1,784,124" shape="rect">
        <area alt="Projects" title="Projects" href="/projects.html" coords="789,0,1000,124" shape="rect">
        </map>
    `;
}

addEventListener("DOMContentLoaded", function() {
    setColours();
    document.body.append(themeDiv);
    themeDiv.addEventListener('click', toggleTheme);
});