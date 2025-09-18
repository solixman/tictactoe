

function Play() {


        let GridNumber = document.getElementById('GridNumber').value;
        localStorage.setItem("GridNumber",GridNumber);
        
        console.log(GridNumber);
  
    
        let k = document.getElementById('k').value;
        localStorage.setItem("k",k);
        console.log(k);
    

    
    let body = document.getElementById('main');
    body.innerHTML = `
    
<div class="main" >
<div style="display: flex; justify-content: center; align-items: center; margin =0">
<h3 id='gameStatus'></h3>
</div>
<div class="gamePage" >

<div id="grid">
<div id="gridBoxes">



<div id="boxes">
<p>hiiiiiii</p>
</div>

</div>
</div>


       <div class="ActionButtons">
     
       <button id="StartNewGameButton" type='button' onclick=setUpGrid() button>Start New Game </button>
       
       </div>
       
       </div>
       </div>
        
       
       `
       
       setUpGrid()
       
    }
    
    
    
    
    function setUpGrid() {
        
        document.getElementById('gameStatus').innerHTML = `
        <h3 style="">it's ${ currentPlayer }'s turn </h3>
        `;
         
        GN =localStorage.getItem("GridNumber");
        let boxes = document.getElementById('boxes');
        
        boxes.innerHTML = "";
        
        boxes.style.gridTemplateColumns = `repeat(${GN}, 1fr)`;
        boxes.style.gridTemplateRows = `repeat(${GN}, 1fr)`;
        
        for (let i = 0; i < GN * GN; i++) {
            
            boxes.innerHTML += `    
            <div data-cell-index = ${i+1}  id="box" onclick="pressBox(this)">
            
            </div>
            
            
        `
      


    }
    
    
}



let currentPlayer="X";
let gameActive=true;
localStorage.setItem("scoreX",0);
localStorage.setItem("scoreO",0);
  let clicked = [];




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
       console.log(i);
       
          clicked.push({"X":i});
       currentPlayer="O";
       document.getElementById('gameStatus').innerHTML = `
        <h3 style="">it's ${ currentPlayer }'s turn </h3>
        `;
    }
    else if (currentPlayer === "O") {
        box.innerHTML=`
        <div data-cell-index = ${i}  id="box" onclick="pressBox(this)">
        <img src="/src/icons/O.png" alt="X" style="width:95%; height:95%;">
        </div>
        `

        console.log(i);
        
        clicked.push({"O":i});
        currentPlayer="X" 
        document.getElementById('gameStatus').innerHTML = `
        <h3 style="">it's ${ currentPlayer }'s turn </h3>
        `;
    }

    console.log(clicked);

}


function intialiseGame(){
clicked = [];
 

}
