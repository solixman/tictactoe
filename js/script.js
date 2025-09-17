

function Play() {
    let GridNumber = document.getElementById('GridNumber').value;

   let body = document.getElementById('main');
body.innerHTML=`
<div class="gamePage" >

   <div id="grid">
     <div id="gridBoxes">


       <div id="boxes">
       <p>hiiiiiii</p>
       </div>

     </div>
    </div>
</div>
`

setUpGrid(GridNumber)

}




function setUpGrid(GN){

    
    let boxes=  document.getElementById('boxes');
    
    boxes.innerHTML="";
    
      boxes.style.gridTemplateColumns = `repeat(${GN}, 1fr)`;
  boxes.style.gridTemplateRows = `repeat(${GN}, 1fr)`;
    
    for (let i = 0; i < GN*GN; i++) {

        boxes.innerHTML+=`    
 <div  id="box" onclick=pressBox()>
       <p>i </p>
       </div>
        `    
        console.log(boxes);


    }
   

}


       


