/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    //For Of loop iterates through arrays of objects
    for( let game of games ) {
        
        // create a new div element, which will become the game card
        const createDiv = document.createElement("div");
        
        // add the class game-card to the list
        createDiv.classList.add("game-card");
        let gameAttributes = `
            <img src="${game.img}" height=100>
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: ${game.pledged}</p>
            `
        
        
        
        // set the inner HTML using a template literal to display some info 
        // about each game

        createDiv.innerHTML = gameAttributes;
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        
        
        // append the game to the games-container
        gamesContainer.append(createDiv);


    }
  
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// accumulates the game.backers with reduce function
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas

let contributionsTotalText = `
    <p>${totalContributions}</p>
`;
contributionsCard.innerHTML = contributionsTotalText;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0)

// set inner HTML using template literal
let raisedText = `<p>${totalRaised}</p>`
raisedCard.innerHTML = raisedText;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((acc, games) => {
    return acc + 1;
}, 0)
let totalGamesText = `<p>${totalGames}</p>`
gamesCard.innerHTML = totalGamesText;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // Prevents multiple div instances of games populating the page
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
    })
    
    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    console.log(`Unfunded games are : ${unfundedGames.length}`);
}
// show only games that are fully funded
function filterFundedOnly() {
    // Prevents multiple div instances of games populating the page
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    console.log(`Funded games are : ${fundedGames.length}`);

}
// show all games
function showAllGames() {
    // Prevents multiple div instances of games populating the page
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    console.log(`All games list length : ${GAMES_JSON.length}`);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let allUnfundedGames = GAMES_JSON.reduce((acc, game) => {
    if(game.goal > game.pledged){
        return acc + 1;
    }else{
        return acc;
    }
}, 0)


// create a string that explains the number of unfunded games using the ternary operator
const displayStr =
`A total of $${totalRaised.toLocaleString("en-US")}
 has been raised for ${GAMES_JSON.length} games. 
Currently, ${allUnfundedGames} ${allUnfundedGames == 1 ? `game remains`:`games remain`} unfunded. We need your help to fund these amazing games!`


// create a new DOM element containing the template string and append it to the description container
let challenge6 = `<p>${displayStr}</p>`;
descriptionContainer.innerHTML += challenge6;



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...rest] = sortedGames;
console.log(first)
console.log(second)
console.log(rest)

// Challenge 7 Component 3
// const numbers = [1, 2, 3, 4, 5, 6];
// const [one, two, ...rest] = numbers;
// console.log(rest)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstText = `${first.name}`;
firstGameContainer.innerHTML += `<p>${firstText}</p>`

// do the same for the runner up item
secondGameContainer.innerHTML += `<p>${second.name}</p>`