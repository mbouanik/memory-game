const gameContainer = document.getElementById("game");
let match = {}
const btn = document.querySelector('button')
const score = document.querySelector('#score')
const attempts = document.querySelector('#attempts')
const highScore = document.querySelector('#best-score')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

btn.addEventListener('click', () => {
  const divs = document.querySelectorAll('div')
  for(div of divs){
    if(div.id != "game")
    div.remove()
  }
  createDivsForColors(shuffle(COLORS))
  localStorage.removeItem("div0")
  localStorage.removeItem("div1")
  localStorage.n = 0
  match = {}
  score.innerText = 0
  attempts.innerText = 0


})
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let id = 1
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id =`${id}`
    id = id + 1
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if( parseInt(localStorage.n) < 2){
    event.target.style.backgroundColor = event.target.classList.value
    if (!match[event.target.classList.value]){
      localStorage.setItem( `div${localStorage.n}`,JSON.stringify({color: event.target.classList.value, id:event.target.id}))
      localStorage.n = parseInt(localStorage.n) + 1
    }
    
    if (localStorage.n == '2'){
      if (JSON.parse(localStorage.div0).id === JSON.parse(localStorage.div1).id || 
      JSON.parse(localStorage.div0).color != JSON.parse(localStorage.div1).color){
       setTimeout(() => {
        let div1 = document.querySelectorAll(`.${JSON.parse(localStorage.div0).color}`)
        let div2 = document.querySelectorAll(`.${JSON.parse(localStorage.div1).color}`)
        for(div of div1){
          div.style.backgroundColor = 'white'
        }
        for(div of div2){
          div.style.backgroundColor = 'white'
        }
        localStorage.n = 0 
       }, 750)
      }else{
        localStorage.n = 0 
        match[`${event.target.classList.value}`] = 1
        score.innerText = parseInt(score.innerText) + 1

      }
        attempts.innerText = parseInt(attempts.innerText) + 1
        localStorage.attempts = attempts.innerText
    }
  }
  
 
    


}



// when the DOM loads
// createDivsForColors(shuffledColors);
