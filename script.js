const container = document.querySelector(".container");
const reset = document.querySelector(".reset-grid");
const range = document.querySelector(".grid-range");


const black = document.querySelector(".black")
const rainbow = document.querySelector(".rainbow");
const shadow = document.querySelector(".shadow");
const lighten = document.querySelector(".lighten");

const stateButtons = document.querySelectorAll(".state");


let state = "black"; 

reset.addEventListener("click", clearGrid);

range.addEventListener("input", resizeGrid);

black.addEventListener("click", (e) =>{
  state = "black";
  highlightSelectedButton(e)

})

rainbow.addEventListener("click", (e) =>{
  state = "rainbow";
  highlightSelectedButton(e)

})

shadow.addEventListener("click", (e) =>{
  state = "shadow";
  highlightSelectedButton(e)


});

lighten.addEventListener("click", (e) =>{
  state = "lighten";
  highlightSelectedButton(e)
})








let dimensionDesired = range.value;
createGrid(Math.pow(dimensionDesired, 2));



/****** Highlights whichever button user selects ******/
function highlightSelectedButton(buttonClicked) {
  Array.prototype.forEach.call(stateButtons, (button) => {
    button.classList.remove("selected")
  });

  if (buttonClicked.target.textContent == "Reset") {
    black.classList.add("selected")
  } else {
    buttonClicked.target.classList.add("selected");
  }
  
}



/* Creates # of boxes desired inside of container 
    and adds mouseover event listener to them */
    function createGrid(numberOfBoxes) {

      for (let i = 0; i < numberOfBoxes; i++) {
        let num = Math.sqrt(numberOfBoxes);
        let num2 = (1 / num) * 100; 
    
        let size = `calc(${num2}% - 2px)`;
        let div = document.createElement("div");
        div.setAttribute("style", `border: 1px solid black; background-color: rgb(255, 255, 255); height: ${size}; flex-basis: ${size}; flex-grow: 1;`);
        div.classList.add("square");
        container.appendChild(div); 
        div.addEventListener("mouseover", changeColor)
      }
      
    }



/***** Resizes grid based on range input ****/
function resizeGrid() {
  dimensionDesired = range.value;
  removeOldGrid();
  createGrid(Math.pow(dimensionDesired, 2));
}



/**** Removes old grid before creating new one ****/
function removeOldGrid() {
  let squares = document.querySelectorAll(".square");
  for (i = 0; i < squares.length; i++) {
    container.removeChild(squares[i])
  }
}





/**** Resets all squares to white background ****/
function clearGrid(e) {
  let grid = document.querySelectorAll(".square");

  for (let i=0; i<grid.length; i++){
    grid[i].style.backgroundColor = "rgb(255, 255, 255)"
  }

  state = "black";

  highlightSelectedButton(e);

};





/****** Checks color of current square, if default color changes to light gray 
and becomes darker at each pass ******/
function changeColor(e) {
  
  switch (state) {
    case "black":
      e.target.style.backgroundColor = "rgb(110,110,110)";
      break;
    
    case "rainbow":
      e.target.style.backgroundColor = changeColorRainbow();
      break;
    

    case "shadow":
    case "lighten":
      e.target.style.backgroundColor = createHighlight(e);
      break;



    default:
      console.log("Error: No conditions met");
      break;
  }
  
}






function changeColorRainbow() {

  return `rgb(${createRandomNumber()}, ${createRandomNumber()}, ${createRandomNumber()})`;


}

function createRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 256)
  return randomNumber

}



/***** Lightens or Darkens current square depending on 
       Shadow or Lighten button selected ******/
function createHighlight(currentSquare) {
  let currentColor = currentSquare.target.style.backgroundColor;
  let rgbArray = [];
  let newArray = [];

  // Takes square's current rgb and puts values into an array  
  rgbArray = currentColor.substring(4, currentColor.length-1)
            .replace(/ /g, '')
            .split(',');



  if (state == "shadow") {
    for (i=0; i<3; i++){
      let newColor = Math.floor(rgbArray[i] - (rgbArray[i]*.1));
      newArray.push(newColor)
      
    }


  } else if (state == "lighten") {
    for (i=0; i<3; i++){
      let newColor = Math.floor(Number(rgbArray[i]) + (Number(rgbArray[i])*.1));
      newArray.push(newColor)
    }

  } 

  let newArrayString = newArray.toString()

  let newRGB = `rgb(${newArrayString})`
  return newRGB
}




