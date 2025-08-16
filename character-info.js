var icons = document.querySelectorAll(".icon");
var lastIconClicked;
var selectedName = document.getElementById("name");
var selectedSpecies = document.getElementById("species");
var selectedPronouns = document.getElementById("pronouns");
var selectedGender = document.getElementById("gender");
var selectedAge = document.getElementById("age");
var selectedHeight = document.getElementById("height");
var selectedSmell = document.getElementById("smell");
var selectedBio = document.getElementById("bio");
var selectedPortrait = document.getElementById("portrait");
var selectedFlags = document.getElementById("character-flags");

var characters;

fetch("/characters.yml")
.then((resp) => resp.text())
.then((text) => {
    characters = jsyaml.load(text);
    console.log(characters);
});

icons.forEach(icon => {
    icon.addEventListener("click", function() {
        if (lastIconClicked) {
            lastIconClicked.src = `/icons/${lastIconClicked.getAttribute("name")}.png`;
        }

        const attrName = this.getAttribute("name")
        const oc = characters[attrName];

        selectedName.innerHTML = oc.name;
        selectedName.style.color = oc.colour;
        selectedName.style.webkitTextStrokeColor = oc.stroke;

        selectedPortrait.src = `/portraits/${attrName}.png`;
        selectedPortrait.setAttribute("alt", oc.name);
        selectedFlags.innerHTML = "";

        for (const flag of oc.flags) {
            var li = document.createElement("li");
            li.innerHTML = `<img class="flag" src="/flags/${flag}-flag.png" alt="${flag}">`;
            selectedFlags.append(li);
        }

        selectedSpecies.innerHTML = oc.species;
        selectedPronouns.innerHTML = oc.pronouns;
        selectedGender.innerHTML = oc.gender;
        selectedAge.innerHTML = oc.age;
        selectedHeight.innerHTML = oc.height;
        selectedSmell.innerHTML = oc.smell;
        selectedBio.innerText = oc.bio;
        this.src = `/icons/${attrName}-rotate.gif`;
        lastIconClicked = this;
    });
});