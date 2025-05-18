# 🧛 Slay the Vampire

A cookie Clicker Game without cookies.

For this week's assignment we needed to build a cookie clicker game based on the following examples:

- https://orteil.dashnet.org/experiments/cookie/
- https://www.decisionproblem.com/paperclips/index2.html

# Live demo

- https://elena-lpz.github.io/week03-assignment/

## Requirements

🎯 Fetch upgrade data from the provided API and at least one upgrade from the API update the cookie count.
🎯 Ensure that functions are used effectively to keep code organised and reusable.
🎯 Implement event listeners to handle user interactions.
🎯 Use local storage to save and restore the cookie count and relevant game information.
🎯 Use setInterval to increment the cookie count and manage the game state each second. - Managing the game state includes saving progress and updating the DOM.

This week I have completed all the requirements.

## Stretch Goals

🏹 Consolidate upgrade management by managing all upgrades in a single function.
🏹 Improve UX with animations, sound effects, or other visual effects.
🏹 Fantastic use of README to provide important information such as a description of the project, how to deploy and other app information.
🏹 Implement error handling using try/catch.
🏹 Create a menu for users to adjust game options like sound effects or display preferences.

I have completed all stretch goals (I think? Some better than others) and done some extras

## Design

This project is a creative take on the Cookie Clicker format. Instead of baking cookies, your goal is to defeat a vampire through rapid clicks and strategic spellcasting (doesn't this make it sound better than it is?).

To enhance the experience, I’ve added:

🎮 A start screen with a brief narrative to set the scene.

🖱️ Responsive click interactions with animated state changes.

🔊 Sound effects for immersive feedback during attacks and spellcasting.

The aim was to make it feel as much like a real game as possible, blending interactivity with a touch of story and atmosphere.

Before starting the development stage, I create wireframes and Figma screens that changed slightly as I was building the game, but were useful as a starting point.

## Challenges

This has been the most challenging assignment of the course so far, but also the most rewarding. I really enjoyed how much creative freedom it allowed. Once I started building, the ideas just kept flowing and it was hard to stop.

The biggest challenge was managing the large function that controls most of the game's logic. I definitely needed some help with it initially, but once the basic structure was in place, it became much easier to understand and expand upon. That one function eventually grew into nearly two pages of code. Through this project, I’ve learned a huge amount, from working with asynchronous functions to creating sprite-based animations and handling dynamic DOM elements.

## Things I could not achieve (yet)

- I wasn’t able to fully solve the issue where the animation and sound effects freeze or overlap when clicks are spammed.

- I added a start screen, but not in the way I originally envisioned. I considered a more polished approach, but decided not to modify the main JavaScript too much, especially since I didn’t want the game to run in the background (in case there was any DPS happening) while the start screen was still visible.

- I'm aware that the styling for this project ended up a bit messy. With so many changes happening during development, it became difficult to maintain a clean and organized CSS file. For example, I initially used a static image for the vampire embedded directly in the HTML, but later transitioned to dynamically generating and animating two separate vampire states using JavaScript. I did my best to tidy things up afterward, but I know there's room for improvement in keeping the styles more structured and consistent.

- I would like to get some tips on how to organise my .js file better. Should arrays and variables go at the top, etc

# Resources

- https://developer.mozilla.org/en-US/
- https://www.w3schools.com/
- Music and sound effects from https://unsplash.com/
- Sprite Animations: this video SAVED me https://www.youtube.com/watch?v=ekI7vjkFrGA
- Coloure palette https://color.adobe.com/es/search?q=vampire

# Credits

- Vampire sprite: https://craftpix.net/freebies/free-vampire-4-direction-pixel-character-sprite-pack/?num=1&count=22&sq=vampire&pos=8
- Swords: https://craftpix.net/freebies/32x32-pixel-art-weapons-free-collection/?num=7&count=281&sq=weapon&pos=11
- Backgrounds: Forest https://craftpix.net/freebies/forest-and-trees-free-pixel-backgrounds/?num=1&count=14&sq=forest&pos=4 Sky https://craftpix.net/freebies/free-moon-pixel-game-backgrounds/?num=1&count=13&sq=moon&pos=4
