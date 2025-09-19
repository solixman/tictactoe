

function Play() {


    let GridNumber = document.getElementById('GridNumber').value;
    localStorage.setItem("GridNumber", parseInt(GridNumber));

    let k = document.getElementById('k').value;
    localStorage.setItem("k", k);




    if (parseInt(k) < 3) {
        alert("Veuillez entrer une valeur entre 3 et 10")
        return
    }

    if (parseInt(k) > parseInt(GridNumber)) {
        alert('k cannot be bigger than the grid number');
        return;
    }



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
     
       <button id="StartNewGameButton" type='button' onclick=intialiseGame() button>Start New Game </button>
       
       </div>
       
       </div>
       </div>
        
       
       `

    setUpGrid()

}




function setUpGrid() {

    document.getElementById('gameStatus').innerHTML = `
        <h3 style="">it's ${currentPlayer}'s turn </h3>
        `;

    GN = localStorage.getItem("GridNumber");
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
    let winner = '';
}



let currentPlayer = "X";
let gameActive = true;
localStorage.setItem("scoreX", 0);
localStorage.setItem("scoreO", 0);
let clickedByX = [];
let clickedByO = [];




function pressBox(box) {
    if (!gameActive) {
        return;
    }
    if (box.getAttribute("data-played")) {
        return;
    }



    i = box.getAttribute("data-cell-index");

    box.innerHTML = "";


    if (currentPlayer === "X") {


        box.innerHTML = `
        <div data-cell-index = ${i + 1}  id="box">
        <img src="/src/icons/X.png" alt="X" style="width:95%; height:95%;">
        </div>
        `

        clickedByX.push(parseInt(i));

        if (clickedByX.length >= localStorage.getItem('k')) {

            findWinner(i);
        }
        if (gameActive) {

            currentPlayer = "O";


            document.getElementById('gameStatus').innerHTML = `
              <h3 style="">it's ${currentPlayer}'s turn </h3>
              `;
        }
    }
    else if (currentPlayer === "O") {
        box.innerHTML = `
        <div data-cell-index = ${i}  id="box"">
        <img src="/src/icons/O.png" alt="X" style="width:95%; height:95%;">
        </div>
        `



        clickedByO.push(parseInt(i));
        if (clickedByO.length >= localStorage.getItem('k')) {

            findWinner(i);
        }
        if (gameActive) {

            currentPlayer = "X"


            document.getElementById('gameStatus').innerHTML = `
            <h3 style="">it's ${currentPlayer}'s turn </h3>
            `;
        }
    }
    box.setAttribute("data-played", "true");



}


function intialiseGame(P = 'X') {
    clickedByO = [];
    clickedByX = [];
    gameActive = true;
    currentPlayer = P;
    setUpGrid();
}






function findWinner(i) {


    i = parseInt(i);
    GridNumber = localStorage.getItem('GridNumber');
    k = parseInt(localStorage.getItem('k'))



    if (currentPlayer == "X") {

        checkHorizontal(k, GridNumber, i, clickedByX);
        checkVertical(k, GridNumber, i, clickedByX);
        checkDiagonal(k, GridNumber, i, clickedByX);
    }
    if (currentPlayer == "O") {
        checkHorizontal(k, GridNumber, i, clickedByO);
        checkVertical(k, GridNumber, i, clickedByO);
        checkDiagonal(k, GridNumber, i, clickedByO);
    }

}





function checkHorizontal(k, n, i, boxes) {
    let count = 1;
    
    let leftBox = i - 1;
    while (leftBox >= 0 && leftBox % n !== n - 1 && boxes.includes(leftBox)) {
        
        count++;
        leftBox--;
    }
    
    let rightBox = i + 1;
    while (rightBox < n * n && rightBox % n !== 0 && boxes.includes(rightBox)) {
        count++;
        rightBox++;
    }
    
    
    if (count >= k) {
        winnerFound(currentPlayer);
    }
}


function checkVertical(k, n, i, boxes) {
    
    let count = 1;
    aboveBox = i - n;
    
    while (aboveBox >= 0 && boxes.includes(aboveBox)) {
        count++;
        aboveBox = aboveBox - n;
    }
    
    
    underBox = parseInt(i) + parseInt(n);
    while (underBox <= n * n && boxes.includes(underBox)) {
        console.log('under');
        count++;
        underBox = underBox + parseInt(n);
    }
    
    if (count >= k) {
        winnerFound(currentPlayer);
    }
}



function checkDiagonal(k, n, i, boxes) {
    n = parseInt(n);
    i = parseInt(i);

    let count = 1;
    
    let upRight = i - (n - 1);
    let downLeft = i + n - 1;
    
    while (upRight >= 0 && upRight % n !== 0 && boxes.includes(upRight)) {
        count++;
        upRight -= (n - 1);
    }
    
    while (downLeft <= n * n && downLeft % n !== n - 1 && boxes.includes(downLeft)) {
        count++;
        downLeft += n - 1;
    }
    
    if(count >= k){
     winnerFound(currentPlayer)
     return
    }else{
        
        let count = 1;
        let upLeft = i - (n + 1);
        let downRight = i + n + 1;
        console.log('here')
        while (upLeft >= 0 && upLeft % n !== n - 1 && boxes.includes(upLeft)) {
            console.log('inside upleft')
            count++;
            upLeft -= (n + 1);
        }
        
        while (downRight <= n * n && downRight % n !== 0 && boxes.includes(downRight)) {
            console.log('inside downright')
            count++
            downRight+=n+1
        }
       if(count >= k){
        winnerFound(currentPlayer)
     return
       }
    }
    
    
    
    
}

function winnerFound() {

    document.getElementById('gameStatus').innerHTML = `
            <h3 style="">winner is ${currentPlayer} </h3>
            `;
    gameActive = false;
    console.log('winner is ' + currentPlayer);
    return
}