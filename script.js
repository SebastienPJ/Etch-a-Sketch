const container = document.querySelector(".container");
const clear = document.querySelector(".clear-grid");
const range = document.querySelector(".grid-range");
 

let dimensionDesired = range.value;
createGrid(Math.pow(dimensionDesired, 2));



clear.addEventListener("click", clearGrid);

range.addEventListener("input", resizeGrid);














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









let r;
let g; 
let b;


function changeColorRainbow(e) {
  let rgb = "rgb(255, 255, 255)"
  let rgbArrayRainbow;

  
  rgbArrayRainbow = rgb.substring(4, rgb.length-1)
      .replace(/ /g, '')
      .split(',');

  console.log(rgbArrayRainbow);

  for (i = 0; i < 3; i++) {

    let number = createRandomNumber();
    rgbArrayRainbow[i] = number


  }
  console.log( rgbArrayRainbow);
}



function createRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 256)
  return randomNumber

}

changeColorRainbow();


/****** Checks color of current square, if default color changes to light gray 
        and becomes darker at each pass ******/
function changeColor(e) {
  let currentColor = e.target.style.backgroundColor;
  let rgbArray = []; 

  let newRGB = [];
  let newRgbString;
 
  if (currentColor == "rgb(255, 255, 255)") {
    e.target.style.backgroundColor = "rgb(100, 100, 100)";

  } else {

    // Takes square's current rgb and puts values into an array
    rgbArray = currentColor.substring(4, currentColor.length-1)
          .replace(/ /g, '')
          .split(',');

    // Makes current color darker
    for (let i = 0; i < 3; i++ ){
      let newColor = rgbArray[i] - 10
      newRGB.push(newColor)
    };

    newRgbString = newRGB.toString();


    e.target.style.backgroundColor = `rgb(${newRgbString})`

  }
}