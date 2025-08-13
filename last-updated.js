const UPDATE_LOG = `
It's been a while since I made a big update to this site .. I've been wanting to redesign it with a new coat of paint for a while, but never really had the time to do so..
I have made one step closer towards a redesign tho! I overhauled the art gallery to make it look a lot nicer, and included a sorting feature and tags!!
The tags might be a little pointless at the moment but I'm intending to upload all my past art here, and having tags and sorting makes it a lot easier to sift through a big collection of arts :>
They're also part of another thing I wanna do, which is making a page with information about all my OCs, and each OC will have their own tag.
But yeah, there's big plans for this site! Whether I'm gonna see them through or not is unknown but I at least wanna visually redesign the site, if I have the time and motivation :3
`;

const LOG_DATE = "2025-05-16";
const COMMS_UPDATED = "N/A";

window.addEventListener("load", (event) => {
    const p_log = document.querySelector("#update-log");
    const p_web = document.querySelector("#website-last-updated");
    const p_comm = document.querySelector("#comms-last-updated");

    if (p_log != null) {
        p_log.textContent = UPDATE_LOG;
    }

    if (p_web != null) {
        p_web.textContent = "Log date: " + LOG_DATE;
    }

    if (p_comm != null) {
        p_comm.textContent = "Comms last updated: " + COMMS_UPDATED;
    }
});
