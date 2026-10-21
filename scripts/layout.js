// This is an "okay" way to do shared layout stuff, but not ideal
// In an ideal world, Neocities would have server-side includes, but they do not
// And I can't be bothered to setup some precompiling / preprocessing shit for this site lol
// ... not yet at least
// Once I self-host my own site I shall have free reign over server-side rendering teehee

var header = document.createElement("header");
header.innerHTML = `
<img id="header" class="header" src="/assets/header-perry.webp">
<div class="extra">
    <div>
        <div class="theme-picker">
        <img class="clickable theme-button" id="themeTogglePerry" src="/icons/perry.png" title="Switch to Perry colour theme" alt="Perry">
        <img class="clickable theme-button" id="themeToggleOde" src="/icons/ode.png" title="Switch to Ode colour theme" alt="Ode">
        </div>
    </div>
    <div id="crow-start" class="fr clickable" alt="Crow Attack">
        <img src="/assets/FunFind_crow_left.gif" alt="Crow Attack">
    </div>
</div>
`;

var links = document.createElement("div");
links.className = "links";
links.innerHTML = `
<a href="https://bsky.app/profile/eggrens.bsky.social"><img src="/assets/nav/bluesky-icon.png" alt="Bluesky"></a>
<a href="https://bsky.app/profile/denizendeerjay.bsky.social"><img src="/assets/nav/bluesky-nsfw-icon.png" alt="Bluesky 18+"></a>
<a href="https://eggrens.tumblr.com/"><img src="/assets/nav/tumblr-icon.png" alt="Tumblr"></a>
<a href="https://github.com/Eggrens"><img src="/assets/nav/github-icon.png" alt="Github"></a>
`;

var nav = document.createElement("nav");
nav.innerHTML = `
<ul class="nav-links">
    <li class="nav-section">Main Pages</li>
    <ul class="nav-section-content">
        <li>
            <img class="nav-icon" src="/assets/placeholder.png">
            <a href="#">Home</a>
        </li>
        <li>
            <img class="nav-icon" src="/assets/placeholder.png">
            <a href="#">Art Gallery</a>
        </li>
        <li>
            <img class="nav-icon" src="/assets/placeholder.png">
            <a href="#">My Characters</a>
        </li>
        <li>
            <img class="nav-icon" src="/assets/placeholder.png">
            <a href="#">My Programming Stuff</a>
        </li>
        <li>
            <img class="nav-icon" src="/assets/placeholder.png">
            <a href="#">Commissions</a>
        </li>
    </ul>
    <li class="nav-section">Other Pages</li>
    <ul class="nav-section-content">
        <li>
            <img class="nav-icon" src="/assets/placeholder.png">
            <a href="#">BTD6 Monkey Team Generator</a>
        </li>
    </ul>
</ul>
`;

var footer = document.createElement("footer");
footer.innerHTML = `
<img style="height: 40px; margin-top: 10px;" src="/assets/neocities.png" alt="Hosted by Neocities">
`;

var main = document.getElementById("main");
main.before(header, links, nav);
main.after(footer);