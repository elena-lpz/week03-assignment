console.log("hello world");

//default starting values for cookie count and cps (either or)
// let damageCount = 10;
// let dps = 5;

// TODO TRY: Start screen found this: https://www.reddit.com/r/programming/comments/10h4307/can_anyone_help_me_to_make_a_start_screen_in_this/

const stats = {
  damageCount: 1,
  dps: 0,
};

//if there is data in local storage, update stats with this data, so the user picks it up where they left off

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
let damageCount = JSON.parse(damageCountData) || 0; // David helped :)

// if (dpsData = null) {
//   stats.dps = JSON.parse(dpsData);
// }
let dps = JSON.parse(dpsData) || 0;

//=======================================================
//shop upgrades
//fetch the upgrades from the API
//API url: https://cookie-upgrade-api.vercel.app/api/upgrades

async function getSpells() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// getSpells();

//To create multiple elements in a more convenient way, loops are your friend.
// create DOM elements to contain the upgrades data
// create an element
// assign the value to its text content
// append it to the DOM
// after you complete this task, you should see the upgrades on your website

// How do I update the name of the upgrades -- spells

//create a list with the spells names used to rename the upgrades

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

// Not sure how to replace upgrade names after this

// const spellsContainer = document.getElementById("spells-container");

// const spells = getSpells();

// function createIconImages(icon) {
//   const spellIcon = document.createElement("img");
//   spellIcon.setAttribute("src", icon.src);
//   spellIcon.setAttribute("alt", icon.alt);
//   spellIcon.setAttribute("class", icon.class);
//   spellsContainer.appendChild(icon);
// }

// spells.forEach((icon) => {
//   createIconImages();

//   // name = spellNames

//   spellsContainer.appendChild(icon);
// });

const spellsContainer = document.getElementById("spells-container");

// async function createGetSpells() {
//   const spells = await getSpells();
//   getSpells(fetchedData);
// }
// async const spells = getSpells();
// console.log(spells);

async function spellsData() {
  const fetchedData = await getSpells();
  fetchedData.forEach((spell, index) => {
    const spellContainer = document.createElement("div"); //created div for styling
    const spellIcon = document.createElement("img");
    const spellName = document.createElement("p");
    const castButton = document.createElement("button");
    const increaseDamage = document.createElement("p");
    const skillCost = document.createElement("p"); // create elements for increase and cost
    const spellDataContainer = document.createElement("div"); //needed a container for the spell data, so that Icould style it properly.

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

        alert(
          `You cast ${spellNames[index].spell}! DPS increased by ${increase}.`
        );
      } else {
        alert("Not enough mana to cast this spell.");
      }
      //would like to try and style this for next time, wondering if there's an easy way of styling alerts?
    });
  });
}

spellsData();

//How can I update the name of the spells only when there's a container with images and buttons already in my html

// increase in the API updates dps
// cost in the API is dependable of damageCount

//====================================================
//the interval

// We need to retrieve the previous saved damage from the local storage and parse it
const damageNumber = document.getElementById("damage-count");
const dpsNumber = document.getElementById("dps-count");

// First attempt
// stats.dps = JSON.parse(localStorage.getItem("dps"));
// dpsNumber.textContent = stats.dps;
// console.log(dpsNumber.textContent);

// stats.damageCount = JSON.parse(localStorage.getItem("damageCount"));
// damageNumber.textContent = stats.damageCount;

// This was fine, until I decided to access it on my desktop computer, this made the DPS number empty and it would log on the console as an empty space. I tried again on incognito mode and the same happened

// using what I learned above, I set a fallback value --> if value is null then show 0
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

vampireChar.addEventListener("click", function () {
  stats.damageCount += 1; // on click, we add 1 to the damage count and update the value of it with the new number
  console.log("vampire clicked"); // console check for clicks
  damageNumber.textContent = stats.damageCount; //we also update the number on the screen
});

//when the user clicks on the buy button in an upgrade in teh shop, the cookieCount value goes down, and the cps value goes up

// const spellButton = document.getElementById("spell-button");

// spellButton.forEach(function () {});

// if (damageCount >= dpsData) {
//   damageCount - +skillCost;
// }

// need to be able to buy if the damamgeCount is high enough to purchase the upgrade or spell --> If damageCount >= spellcost

// then we can spend those damage points --> damageCount -+ spellcost AND we need to also update the dps with the upgraded "dps += whatever the upgrade is"

// We save this to our local storage

//We update it on our screen

// disable button if no longer able to buy. if damageCount < spellcost, then spellButton.disable = true

// might want to add an alert or something: "you cast SpellName. Your damage per second grows stronger" or "you dont have enough damage points to cast this spell"

//you will need functions to contain the game logic.
//to create the logic of the shop, you could have a function per upgrade OR you could have a reusable function that works for ALL upgrades
//since we are using local storage, make sure that the local storage values are updated after the user buys an upgrade OR when the user clicks on the cookie

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

// Audio controls

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
