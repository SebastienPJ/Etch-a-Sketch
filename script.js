const container = document.querySelector(".container");
const clear = document.querySelector(".clear-grid");
const range = document.querySelector(".grid-range");
const black = document.querySelector(".black")
const rainbow = document.querySelector(".rainbow");
const shadow = document.querySelector(".shadow");
const lighten = document.querySelector(".lighten");


let state = "black"; 

clear.addEventListener("click", clearGrid);

range.addEventListener("input", resizeGrid);

black.addEventListener("click", (e) =>{
  state = "black";
})

rainbow.addEventListener("click", (e) =>{
  state = "rainbow";
})

shadow.addEventListener("click", (e) =>{
  state = "shadow";

});

lighten.addEventListener("click", (e) =>{
  state = "lighten";
})




let dimensionDesired = range.value;
createGrid(Math.pow(dimensionDesired, 2));





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
function clearGrid() {
  let grid = document.querySelectorAll(".square");

  for (let i=0; i<grid.length; i++){
    grid[i].style.backgroundColor = "rgb(255, 255, 255)"
  }


};





/****** Checks color of current square, if default color changes to light gray 
and becomes darker at each pass ******/
function changeColor(e) {
  let rainbow = true;
  let currentColor = e.target.style.backgroundColor;
  let rgbArray = []; 

  let newRGB = [];
  let newRgbString;
  
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
      console.log("No conditions met");
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




