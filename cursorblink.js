var cursorBlink = document.getElementById("cursorBlink");

function blink() {
  if (cursorBlink.innerText === ">_") {
    cursorBlink.innerText = ">";
  } else {
    cursorBlink.innerText = ">_";
  }
}

setInterval(blink, 1000);
