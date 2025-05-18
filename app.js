console.log("hello world");

//default starting values for cookie count and cps // damagecount/mana and dps in my case

const stats = {
  damageCount: 0,
  dps: 0,
};

//TODO if there is data in local storage, update stats with this data, so the user picks it up where they left off

// const stringifiedDamageCount = JSON.stringify(stats.damageCount);
// localStorage.setItem("damageCount", stringifiedDamageCount);
// const stringifiedDps = JSON.stringify(stats.dps);
// localStorage.setItem("dps", stringifiedDps);

const damageCountData = localStorage.getItem("damageCount");
const dpsData = localStorage.getItem("dps");

//why is this not working?
// if (damageCountData = null) {
//   stats.damageCount = JSON.parse(damageCountData);
// }

// if (dpsData = null) {
//   stats.dps = JSON.parse(dpsData);
// }

let damageCount = JSON.parse(damageCountData) || 0; // David helped :)
let dps = JSON.parse(dpsData) || 0;

//=======================================================
//shop upgrades
//fetch the upgrades from the API
//API url: https://cookie-upgrade-api.vercel.app/api/upgrades

//TODO fetch data
async function getSpells() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// getSpells(); //we were calling this twice

//To create multiple elements in a more convenient way, loops are your friend.
// create DOM elements to contain the upgrades data
// create an element
// assign the value to its text content
// append it to the DOM
// after you complete this task, you should see the upgrades on your website

// TODO ARRAYS

const spellIcons = [
  {
    src: "./assets/images/spell-icons/radiant.png",
    alt: "Radiant Smite spell",
    className: "icon-outline",
  },

  {
    src: "./assets/images/spell-icons/concentrated-flame.png",
    alt: "Concentrated Flame spell",
    className: "icon-outline",
  },

  {
    src: "./assets/images/spell-icons/holy-nova.png",
    alt: "Holy Nova spell",
    className: "icon-outline",
  },

  {
    src: "./assets/images/spell-icons/sickening-radiance.png",
    alt: "Sickening Radiance spell",
    className: "icon-outline",
  },

  {
    src: "./assets/images/spell-icons/searing-light.png",
    alt: "Searing Light spell",
    className: "icon-outline",
  },

  {
    src: "./assets/images/spell-icons/sunbeam.png",
    alt: "Sunbeam spell",
    className: "icon-outline",
  },
];

const spellNames = [
  { spell: "Radiant Smite" },
  { spell: "Concentrated Flame" },
  { spell: "Holy Nova" },
  { spell: "Sickening Radiance" },
  { spell: "Sunbeam" },
  { spell: "Searing light" },
];

const vampireStates = [
  {
    src: "assets/images/vampire/vampires_idle.png",
    alt: "Vampire character in idle state",
    className: "vampire-sprite pixel-art",
    id: "vampire-idle",
  },

  {
    src: "assets/images/vampire/vampire_hurt.png",
    alt: "Vampire character receiving damage",
    className: "vampire-sprite pixel-art hidden",
    id: "vampire-hurt",
  },
];

// I was not sure how to replace upgrade names after this // got help with it on Friday

const spellsContainer = document.getElementById("spells-container");
const spellEffect = new Audio("assets/audio/sound-effects/spell-cast.mp3");
const errorSound = new Audio("assets/audio/sound-effects/error-sound.mp3");

// async function createGetSpells() {
//   const spells = await getSpells();
//   getSpells(fetchedData);
// }
// async const spells = getSpells();
// console.log(spells);

// TODO - generate spells with images, info from the API and buttons. Make buttons work. Change character animations. Sound effects and modals.
//The next function makes my eyes water when I see it, doesn't fit my screen, could have never done it without help even though once it was all layed out I was able to add a ton of extra stuff to it and it all actually makes sense, but the thought of doing something like this again is daunting.

async function spellsData() {
  const fetchedData = await getSpells();
  fetchedData.forEach((spell, index) => {
    const spellContainer = document.createElement("div"); //created div for styling
    const spellIcon = document.createElement("img");
    const spellName = document.createElement("p");
    const castButton = document.createElement("button");
    const increaseDamage = document.createElement("p");
    const skillCost = document.createElement("p"); // create elements for increase and cost
    const spellDataContainer = document.createElement("div"); //needed a container for the spell data, so that I could style it properly.

    spellIcon.setAttribute("src", spellIcons[index].src);
    spellIcon.setAttribute("alt", spellIcons[index].alt);
    spellIcon.setAttribute("class", spellIcons[index].className);

    spellName.textContent = spellNames[index].spell;
    // console.log(spellName);

    castButton.textContent = "Cast";
    castButton.classList.add("spell-button");

    // update the values of increase and cost elements using the fetched data and then append them
    increaseDamage.textContent = `DPS: + ${spell.increase}`;
    skillCost.textContent = `Cost: ${spell.cost} Mana`;
    spellContainer.classList.add("spell-container");
    spellDataContainer.classList.add("spell-data");

    //append each element individually
    spellsContainer.appendChild(spellContainer); //this goes inside the main spellscontainer
    spellContainer.appendChild(spellIcon); //each spell goes inside a spell container (image + data + button)
    spellContainer.appendChild(spellDataContainer);
    spellDataContainer.appendChild(spellName); //all the data goes inside another container
    spellDataContainer.appendChild(increaseDamage);
    spellDataContainer.appendChild(skillCost);
    spellContainer.appendChild(castButton);

    // we need the event listener in here so that it's added to every button when all the elements are created
    castButton.addEventListener("click", function () {
      const cost = spell.cost;
      const increase = spell.increase;
      const alertMessageContainer = document.createElement("section");
      const alertMessage = document.createElement("h1");
      alertMessage.classList.add("alert-message");
      document.body.appendChild(alertMessageContainer);
      alertMessageContainer.appendChild(alertMessage);

      if (stats.damageCount >= cost) {
        //is the damage count or mana is bigger or equal to the cost  ==> spell can be cast
        stats.damageCount -= cost; //damageCount will equal the result of substracting the cost
        stats.dps += increase; // damage per second will equal the result of adding the increase to the dps

        // we need to update this data in the dom
        damageNumber.textContent = stats.damageCount;
        dpsNumber.textContent = stats.dps;

        // and store it in the local storage
        localStorage.setItem("damageCount", JSON.stringify(stats.damageCount));
        localStorage.setItem("dps", JSON.stringify(stats.dps));

        // want the character to also change when casting spell // coppied what I did below for the character click event

        const vampireIdle = document.getElementById("vampire-idle");
        const vampireHurt = document.getElementById("vampire-hurt");

        // following the logic from above, we add the classlist hidden from the idle character and remove it from the hurt character for  seconds
        vampireIdle.classList.add("hidden");
        vampireHurt.classList.remove("hidden");

        // after 1 second it does the opposite
        setTimeout(() => {
          vampireIdle.classList.remove("hidden");
          vampireHurt.classList.add("hidden");
        }, 2000);

        alertMessage.textContent = `You cast ${spellNames[index].spell}! DPS increased by ${increase}.`;
        spellEffect.play();
        //alert message on timeout
        setTimeout(() => {
          alertMessageContainer.remove();
        }, 3000);
      } else {
        alertMessage.textContent = "Not enough mana to cast this spell.";
        errorSound.play(); //this audio is unfortunately very quiet but could not find anything better
        setTimeout(() => {
          alertMessageContainer.remove();
        }, 3000);

        //FIRST ATTEMPT
        //
        // It was a bit annoying to have to click OK to got back to the game, so decided to add a modal instead

        // alert(
        //   `You cast ${spellNames[index].spell}! DPS increased by ${increase}.`
        // );

        // } else {
        //   alert("Not enough mana to cast this spell.");
        // }
      }
    });
  });
}

spellsData();

//====================================================
// TODO The interval
// Notes to myself
// increase in the API updates dps
// cost in the API is dependable of damageCount

// We need to retrieve the previous saved damage from the local storage and parse it
const damageNumber = document.getElementById("damage-count");
const dpsNumber = document.getElementById("dps-count");

// FIRST ATTEMPT
// stats.dps = JSON.parse(localStorage.getItem("dps"));
// dpsNumber.textContent = stats.dps;
// console.log(dpsNumber.textContent);

// stats.damageCount = JSON.parse(localStorage.getItem("damageCount"));
// damageNumber.textContent = stats.damageCount;

// This was fine, until I decided to access it on my desktop computer, this made the DPS number empty and it would log on the console as an empty space. I tried again on incognito mode and the same happened. Realised I was getting a null value.

// Using what I learned above, I set a fallback value --> if value is null then show 0
//https://chipcullen.com/javascript-fallback-values-booleans/

stats.dps = JSON.parse(localStorage.getItem("dps")) || 0;
stats.damageCount = JSON.parse(localStorage.getItem("damageCount")) || 0;

setInterval(function () {
  stats.damageCount += stats.dps;
  //cookieCount = cookieCount + cps

  //update the text content in the DOM with the new values
  damageNumber.textContent = stats.damageCount;
  dpsNumber.textContent = stats.dps;

  //save the new values in local storage
  localStorage.setItem("damageCount", JSON.stringify(stats.damageCount));
  localStorage.setItem("dps", JSON.stringify(stats.dps));
}, 1000);

//==========================================================
//game logic

//when the user clicks on the vampire, the mana count or damage count value goes up by 1

const vampireChar = document.getElementById("vampire-char"); //declared a var for the vampire image
const swordEffect = new Audio("assets/audio/sound-effects/sword-sound.mp3");

const vampireCharacterContainer = document.getElementById("vampire-character");

// Originally created my character in HTML, but decided to dynamically generate it so that I could also easily change its state when clicked

// TODO - This creates the vampire in its normal idle state
function createVampireIdle() {
  const vampireCharacterIdle = document.createElement("img");
  vampireCharacterIdle.ondragstart = () => false;
  //Avoid dragging of character - After some testing realised clicking on the image could sometimes cause it to drag, which would show the sprite with all the different versions of the character

  //had to move this inside the createVampire functions so that it works AFTER creating the images

  vampireCharacterIdle.setAttribute("src", vampireStates[0].src);
  vampireCharacterIdle.setAttribute("alt", vampireStates[0].alt);
  vampireCharacterIdle.setAttribute("class", vampireStates[0].className);
  vampireCharacterIdle.setAttribute("id", vampireStates[0].id);

  vampireCharacterContainer.appendChild(vampireCharacterIdle);
}
createVampireIdle();

// TODO - This will create the vampire when its receiving damage

function createVampireHurt() {
  const vampireCharacterHurt = document.createElement("img");
  vampireCharacterHurt.ondragstart = () => false;

  vampireCharacterHurt.setAttribute("src", vampireStates[1].src);
  vampireCharacterHurt.setAttribute("alt", vampireStates[1].alt);
  vampireCharacterHurt.setAttribute("class", vampireStates[1].className);
  vampireCharacterHurt.setAttribute("id", vampireStates[1].id);

  vampireCharacterContainer.appendChild(vampireCharacterHurt);
}

createVampireHurt();

//we could potentially create more states ie when vampire receives magic damage. I will leave this for another time.

// I am having a little problem with the following event listener --> if you spam the click, the animation freezes, so looked up how to set up some form of a cooldown https://stackoverflow.com/questions/77667024/how-can-i-code-a-cooldown-to-a-key-press
//Tried to set a cooldown for when the vampire is hurt, so we avoid the event triggering several times and freezing my animation

// let vampireIsHurt = false; // create a variable for when the vampire is hurt and we set it to false

// I didn't get far with it... I would need to only run the event if wampireIsHurt is false? That will stop the animation from triggering several times and freezing, and stop it from running if it's set to true... I don't quite know how to do this. Also I feel like this would stop the whole event alltogether, I want only the animation to not trigger, but the count to still go up. Elena from the future might like to pick this up.

//TODO Event listener when clicking the vampire - mana goes up

vampireCharacterContainer.addEventListener("click", function () {
  stats.damageCount += 1; // on click, we add 1 to the damage count and update the value of it with the new number
  console.log("vampire clicked"); // console check for clicks

  swordEffect.play();

  //this is probably not the best way of doing this but after trying a few things this is what I did. Both states of the character are generated on load and we just add or remove the class hidden when we want to show one or the other....
  const vampireIdle = document.getElementById("vampire-idle");
  const vampireHurt = document.getElementById("vampire-hurt");

  // if (vampireIdle.classList.contains("hidden")) {
  //   vampireIdle.classList.remove("hidden");
  //   vampireHurt.classList.add("hidden");
  // } else {
  //   vampireIdle.classList.add("hidden");
  //   vampireHurt.classList.remove("hidden");
  // }

  //  if (vampireIdle.classList.contains("hidden")) {
  //   vampireIdle.classList.remove("hidden");
  //   vampireHurt.classList.add("hidden");
  // } else if (vampireHurt.classList.contains("hidden")) {
  //   vampireIdle.classList.add("hidden");
  //   vampireHurt.classList.remove("hidden");
  // }

  //Tried to do this with a conditional, but this was causing the states to switch between them on click (OBVIOUSLY) which is not what we want as I want them to switch back to the idle state after say 1 second. We can use timeout for this instead

  // following the logic from above, we add the classlist hidden from the idle character and remove it from the hurt character for 1 second
  vampireIdle.classList.add("hidden");
  vampireHurt.classList.remove("hidden");

  // after 1 second it does the opposite
  setTimeout(() => {
    vampireIdle.classList.remove("hidden");
    vampireHurt.classList.add("hidden");
  }, 1000);
  // It doesn't work the best, but it's my best :D

  damageNumber.textContent = stats.damageCount; //we also update the number on the screen
});

//TODO when the user clicks on the buy button in an upgrade in the shop, the cookieCount value goes down, and the cps value goes up

//This is all part of the crazy async function spellsData() above now. Was originally going to have it as a separate function, but thought it best to be part of the loop. I started with some comments here to get the logic right, so leaving it all here for context.

// const spellButton = document.getElementById("spell-button");

// spellButton.forEach(function () {});

// if (damageCount >= dpsData) {
//   damageCount - +skillCost;
// }

//not really pseudocode but something along those lines:
// need to be able to buy if the damamgeCount is high enough to purchase the upgrade or spell --> If damageCount >= spellcost

// then we can spend those damage points --> damageCount -+ spellcost AND we need to also update the dps with the upgraded "dps += whatever the upgrade is"

// We save this to our local storage

//We update it on our screen

// disable button if no longer able to buy. if damageCount < spellcost, then spellButton.disable = true

// might want to add an alert or something: "you cast SpellName. Your damage per second grows stronger" or "you dont have enough damage points to cast this spell"

//Manny's notes
//you will need functions to contain the game logic.
//to create the logic of the shop, you could have a function per upgrade OR you could have a reusable function that works for ALL upgrades
//since we are using local storage, make sure that the local storage values are updated after the user buys an upgrade OR when the user clicks on the cookie

// TODO Reset button
const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function () {
  stats.damageCount = 0;
  stats.dps = 0;
  //updates the dom stats

  damageNumber.textContent = 0; //updates damage on screen

  localStorage.setItem("damageCount", JSON.stringify(0));
  localStorage.setItem("dps", JSON.stringify(0));
  //updates local storage
});

// TODO Audio controls // I have to admit I just copied this from my assignment for week 1...

const audioPlay = document.querySelector("audio");
const playMusic = document.getElementById("play");
playMusic.addEventListener("click", function (event) {
  audioPlay.play();
  console.log(play.textContent);
});

const audioPause = document.querySelector("audio");
const pauseMusic = document.getElementById("pause");
pauseMusic.addEventListener("click", function (event) {
  audioPause.pause();
  console.log(pause.textContent);
});
