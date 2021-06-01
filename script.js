const container = document.querySelector(".container");
const clear = document.querySelector(".clear-grid");
const form = document.querySelector(".create-grid");

let dimensionDesired = 5;
createGrid(Math.pow(dimensionDesired, 2));


form.addEventListener("submit", resizeGrid);


clear.addEventListener("click", clearGrid);





/**** Resizes the grid ****/
function resizeGrid(e) {

  e.preventDefault();
  const value = form.querySelector("input[type='text']").value;
  console.log(value);


  form.querySelector("input[type='text']").value = ""
  clearGrid();


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