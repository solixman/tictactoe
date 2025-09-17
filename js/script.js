

function Play() {
    let GridNumber = document.getElementById('GridNumber').value;

    let body = document.getElementById('main');
    body.innerHTML = `
<div class="gamePage" >

   <div id="grid">
     <div id="gridBoxes">

     <h3 class='gameStatus'></h3>


       <div id="boxes">
       <p>hiiiiiii</p>
       </div>

     </div>
    </div>
    
    <div class="ActionButtons">

        <button id="resetButton" type='button' onclick=Play() button>Reset game</button>

        <button id="StartNewGameButton" type='button' onclick=Play() button>Start New Game </button>

    </div>

</div>

`

    setUpGrid(GridNumber)

}




function setUpGrid(GN) {


    let boxes = document.getElementById('boxes');

    boxes.innerHTML = "";

    boxes.style.gridTemplateColumns = `repeat(${GN}, 1fr)`;
    boxes.style.gridTemplateRows = `repeat(${GN}, 1fr)`;

    for (let i = 0; i < GN * GN; i++) {

        boxes.innerHTML += `    
 <div data-cell-index = ${i}  id="box" onclick="pressBox(this)">
      
       </div>
    

        `



    }
    

}



let currentPlayer="X";
let gameActive=true;

function pressBox(box) {
       i=box.getAttribute("data-cell-index");
    box.innerHTML="";

    if(!gameActive){
return;
    }

    if(currentPlayer === "X"){

    
        box.innerHTML=`
        <div data-cell-index = ${i}  id="box" onclick="pressBox(this)">
        <img src="/src/icons/X.png" alt="X" style="width:95%; height:95%;">
        </div>
        `
        currentPlayer="O";
     }
     else if (currentPlayer === "O") {
         box.innerHTML=`
        <div data-cell-index = ${i}  id="box" onclick="pressBox(this)">
        <img src="/src/icons/O.png" alt="X" style="width:95%; height:95%;">
        </div>
        `
        currentPlayer="X"
     }

     


}

