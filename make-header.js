var header = document.createElement("div");
var main = document.querySelector("div.main");
header.innerHTML = `
    <img class="top" src="/assets/placeholder.png">
    <img class="top" style="height: 100px;" src="/assets/placeholder-buttons.png" usemap="#navmap">
    <map name="navmap">
      <!-- temporary image map until actual buttons get drawn :) -->
      <area alt="Home" title="Home" href="/index.html" coords="1,1,169,124" shape="rect">
      <area alt="Art Gallery" title="Art Gallery" href="/gallery.html" coords="174,1,367,124" shape="rect">
      <area alt="OCs (original characters)" title="OCs (original characters)" href="/characters.html" coords="371,0,576,124" shape="rect">
      <area alt="Commissions" title="Commissions" href="/commissions.html" coords="582,1,784,124" shape="rect">
      <area alt="Projects" title="Projects" href="/projects.html" coords="789,0,1000,124" shape="rect">
    </map>
`;
main.before(header);