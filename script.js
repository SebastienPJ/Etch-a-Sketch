const container = document.querySelector(".container");


let dimensionDesired = 4
createGrid(Math.pow(dimensionDesired, 2));





// Creates # of boxes desired inside of container
function createGrid(numberOfBoxes) {

  for (let i = 0; i < numberOfBoxes; i++) {
    let num = Math.sqrt(numberOfBoxes);
    let num2 = (1 / num) * 100; 

    let size = `calc(${num2}% - 2px)`;
    let div = document.createElement("div");
    div.setAttribute("style", `border: 1px solid black; background-color: blue; height: ${size}; flex-basis: ${size}; flex-grow: 1;`);

    container.appendChild(div); 
  }
  
}