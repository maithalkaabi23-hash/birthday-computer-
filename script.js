/* =========================
   PROGRESSION
========================= */

let gamesUnlocked = false;
let secretUnlocked = false;


/* =========================
   WINDOW FUNCTIONS
========================= */

function openWindow(id) {

    // Games stays locked until File Explorer is opened
    if (id === "gamesWindow" && !gamesUnlocked) {
        return;
    }

    document.getElementById(id).classList.remove("hidden");

    // Opening File Explorer unlocks Games
    if (id === "filesWindow") {
        gamesUnlocked = true;
    }
}


function closeWindow(id) {
    document.getElementById(id).classList.add("hidden");
}


/* =========================
   MUSIC
========================= */

function unlockMusic() {

    const input = document.getElementById("musicInput");
    const error = document.getElementById("musicError");

    if (input.value.toLowerCase() === "monkey") {

        document.getElementById("musicPassword")
            .classList.add("hidden");

        document.getElementById("musicPlayer")
            .classList.remove("hidden");

        error.textContent = "";

    } else {

        error.textContent = "incorrect password.";
        input.value = "";

    }
}


/* =========================
   FILE EXPLORER
========================= */

function openReadme() {

    document.getElementById("readme")
        .classList.remove("hidden");

}


/* =========================
   SECRET
========================= */

function openSecret() {

    // Secret stays locked until the game is completed
    if (!secretUnlocked) {
        return;
    }

    openWindow("secretWindow");
}


function unlockSecret() {

    const input = document.getElementById("secretInput");
    const error = document.getElementById("secretError");

    if (input.value === "0313") {

        document.getElementById("secretWindow")
            .classList.add("hidden");

        showFinalScreen();

    } else {

        error.textContent = "access denied.";
        input.value = "";

    }
}


/* =========================
   FINAL SCREEN
========================= */

function showFinalScreen() {

    document.getElementById("finalScreen")
        .classList.remove("hidden");

}


/* =========================
   AIM GAME
========================= */

let targetsHit = 0;
const totalTargets = 10;


function startAimGame() {

    // Prevent bypassing the Games lock
    if (!gamesUnlocked) {
        return;
    }

    targetsHit = 0;

    document.getElementById("targetCount")
        .textContent = "0";

    document.getElementById("aimGame")
        .classList.remove("hidden");

    spawnTarget();

}


function spawnTarget() {

    const area = document.getElementById("aimArea");

    const oldTarget = document.querySelector(".target");

    if (oldTarget) {
        oldTarget.remove();
    }

    const target = document.createElement("div");

    target.classList.add("target");

    const maxX = area.clientWidth - 18;
    const maxY = area.clientHeight - 18;

    target.style.left =
        Math.random() * maxX + "px";

    target.style.top =
        Math.random() * maxY + "px";

    target.addEventListener("click", hitTarget);

    area.appendChild(target);

}


function hitTarget() {

    targetsHit++;

    document.getElementById("targetCount")
        .textContent = targetsHit;

    if (targetsHit >= totalTargets) {

        const target = document.querySelector(".target");

        if (target) {
            target.remove();
        }

        // Completing the game unlocks Secret
        secretUnlocked = true;

        setTimeout(() => {

            alert(
                "TEST COMPLETE\n\n" +
                "ACCURACY: 0%\n\n" +
                "ACCESS CODE: 0313"
            );

        }, 150);

        return;
    }

    spawnTarget();

}


/* =========================
   START MENU
========================= */

function toggleStartMenu() {

    document.getElementById("startMenu")
        .classList.toggle("hidden");

}


/* =========================
   CLOCK
========================= */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const suffix = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    minutes = minutes.toString().padStart(2, "0");

    document.getElementById("clock")
        .textContent = `${hours}:${minutes} ${suffix}`;

}


updateClock();

setInterval(updateClock, 30000);
