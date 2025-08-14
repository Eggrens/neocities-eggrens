var galleryDiv = document.querySelector(".gallery");
var gallerySort = document.getElementById("sort-by");
var gallerySubmit = document.getElementById("submit");
var gallerySearchTags = document.getElementById("search-tags");
var galleryVersion = "";

var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modal-title");
var modalCaption = document.getElementById("modal-caption");
var modalDate = document.getElementById("modal-date");
var modalTags = document.getElementById("modal-tags");
var modalLink = document.getElementById("modal-link");
var modalClose = document.getElementById("close");
var modalButtons = document.getElementById("modal-buttons");
var buttonPrev = document.getElementById("prev");
var buttonNext = document.getElementById("next");

// holds information for currently active carousel
var carouselImages = [];
var carouselCaptions = [];
var carouselId = 0;

// close modal
modalClose.addEventListener("click", function() {
    modal.style.display = "none";
    modalButtons.style.display = "none";
});

// clicking outside modal closes it
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        modalButtons.style.display = "none";
    }
});

// fetch version of gallery
fetch("/gallery-version.txt")
.then((response) => response.text())
.then((text) => {
    lines = text.split(/\r\n|\n/);
    galleryVersion = lines[0];
    const galleryUpdated = lines[1];
    document.getElementById("gallery-last-updated").innerText = "Gallery last updated: " + galleryUpdated;
});

function buildGallery(init) {
    const prevVersion = localStorage.getItem("galleryVersion");

    // store gallery data if not defined yet, or version number does not match
    if (!localStorage.hasOwnProperty("galleryData") || prevVersion !== galleryVersion) {
        localStorage.setItem("galleryData", JSON.stringify(init));
        localStorage.setItem("galleryVersion", galleryVersion);
        console.log("new data loaded!");
        console.log("old version: " + prevVersion + "  |  new version: " + galleryVersion);
    }
}

function makeGallery(sort, tags) {
    // use copy of sorted gallery data for sorting and filtering
    var data = JSON.parse(localStorage.getItem("galleryData"));
    data.sort(sort);

    galleryDiv.innerHTML = "";

    for (var art of data) {
        // if there is at least one tag, find posts only containing all tags
        if (tags != null) {
            let containsUserTags = true;
            let artTags = art.tags.split(" ");

            // iterate over each user inputted tag
            for (var t of tags) {
                if (!artTags.includes(t)) {
                    containsUserTags = false;
                    break;
                }
            }

            // if a user tag is not present in the art, don't add to gallery
            if (!containsUserTags) continue;
        }

        let artwork = document.createElement('div');
        artwork.className = "artwork clickable";
        artwork.id = art.id;
        const images = art.image.split("|");
        const captions = art.caption.split("|");

        artwork.innerHTML = `
        <img class="thumb" src="/gallery-images/${images[0]}" title="${captions[0]}" />
        <div class="info">
            <table class="date-and-num">
                <td class="date">${art.date}</td>
                ${images.length > 1 ? '<td class="num">' + images.length + '</td>' : ''}
            </table>
            <div class="title-and-tags">
                <p class="title">${art.title}</p>
                <p class="tags">${art.tags}</p>
            </div>
        </div>
        `;

        // when artwork clicked, show modal
        artwork.addEventListener('click', (event) => {
            const id = parseInt(event.currentTarget.id);
            const galleryData = JSON.parse(localStorage.getItem("galleryData"));
            const refArt = galleryData[id];
            carouselImages = refArt.image.split("|");
            carouselCaptions = refArt.caption.split("|");
            carouselId = 0;

            modalTitle.innerText = refArt.title;
            modalDate.innerText = refArt.date;
            modalTags.innerText = refArt.tags;
            if (carouselImages.length > 1) modalButtons.style.display = "block";
            refreshModal();
            modal.style.display = "block";
        });

        galleryDiv.appendChild(artwork);
    }

    // if gallery has no results in it, display a message showing no results found
    if (galleryDiv.innerHTML == "") {
        let msg = document.createElement('p');
        var msgColor = getComputedStyle(document.body).getPropertyValue("--light-bg");
        msg.style.color = msgColor;
        msg.innerHTML = "No results found :&lpar;";
        galleryDiv.append(msg);
    }
}

function refreshModal() {
    buttonPrev.disabled = carouselId == 0 ? true : false;
    buttonNext.disabled = carouselId == carouselImages.length-1 ? true : false;

    modalCaption.innerText = carouselCaptions[carouselId];
    modalLink.setAttribute("href", "/gallery-images/" + carouselImages[carouselId]);
    modalLink.innerHTML = `<img class="big" src="/gallery-images/${carouselImages[carouselId]}" title="${carouselCaptions[carouselId]}" />`;
}

buttonPrev.addEventListener("click", function() {
    carouselId -= 1;
    refreshModal();
});

buttonNext.addEventListener("click", function() {
    carouselId += 1;
    refreshModal();
})

const dateAsc = (a,b) => {
    return new Date(a.date) - new Date(b.date);
}

const dateDesc = (a,b) => {
    return new Date(b.date) - new Date(a.date);
}

const alphabetic = (a,b) => {
    var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
}

function searchGallery() {
    let searchTagsValue = gallerySearchTags.value;
    let tags = searchTagsValue != "" ? searchTagsValue.split(" ") : null;
    switch (gallerySort.value) {
        case "oldest":
            makeGallery(dateAsc, tags);
            break;
        case "alphabetic":
            makeGallery(alphabetic, tags);
            break;
        default:
            makeGallery(dateDesc, tags);
    }
}

fetch("/gallery.csv")
.then((response) => response.text())
.then((text) => {
    Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            // make gallery once results fetched
            buildGallery(results.data);
            searchGallery();
        }
    });
});

gallerySort.addEventListener("change", (event) => {
    searchGallery();
});

gallerySubmit.addEventListener("click", (event) => {
    searchGallery();
});