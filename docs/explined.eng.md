unlike normal programing where you can use action listeners on html
part\'s and do something when trigered, i used functional programing
where i can call a function when ever i wanted , like in an html balise
using onClick:\"\" or just call it on another javascript function;

after i made my landing page i started whit the function \'play()\'
which is called by the play button, it\'s main role is to capture \'n\'
-the number of columns and rows- so it get\'s multiplied by it self to
give the number of clickable boxes for the game, and \'k\' which is the
necessery number of positions played by the same player in a row , it
stars with setting two limits, the \'n\' should be between 3 and 10, and
k should never be bigger than n, it takes those two variables and stores
them in local storage, and then it takes the main landing page section
and turns it to the setup for the grid, and then it calls the
\'setUpGrid()\' function to continue the work, what it does is it takes
the boxes section and replaces it with n\*n boxes. the boxes made so
when are clicked they trigger the \'pressBox()\' function, but before
that i have my used variables set as shown below.



```JavaScript
let currentPlayer = "";
let gameActive = true;
let clickedByX = [];
let clickedByO = [];
```



those plus the ones saved in the local storage are enough for the logic
i\'m using. the \'pressbox()\' function does things as follow: checks if
the game is active (the game gets inactive in some cases) -\> checks if
the box is already played -\>gets the current player and puts its symbol
in the box -\> adds the box\'s index to the array associated with the
player -\> calls ```JavaScript findWinner()\ ``` -\> turns the played attribut of the
box to true -\> change currentPlayer.

I\'m using the ```JavaScript findWinner() ``` function just like a routing , it searches
for the player last played and calls the functions 
```JavaScript 
checkHorizontal();checkVertical(); chackDiagonel();
```
```JavaScript
if (currentPlayer == \"X\") {

checkHorizontal(k, GridNumber, i, clickedByX); checkVertical(k,
GridNumber, i, clickedByX); checkDiagonal(k, GridNumber, i, clickedByX);
} if (currentPlayer == \"O\") { checkHorizontal(k, GridNumber, i,
clickedByO); checkVertical(k, GridNumber, i, clickedByO);
checkDiagonal(k, GridNumber, i, clickedByO); }
```

the logic i used with all of the checking methods is starting with a
counter set to 1 -the clicked box should count- and then checks in one
direction if there\'s the sale symbol adding to the counter, and when it
first finds one different it goes to the opposite direction and does the
same, but the big catch is I am using only 1d in the grid system , all
the boxes have one index and it i should not wrap-over to the previous
or next rows (will be explained one by one next ), so I end up with a
counter that has the number of Xs or Os in a row, the function now
compares it to the \"k\" given in the beginning, and decides if it\'s a
winner or we should just continue the game. the metohd
checkHorizontal(k, n, i, boxes); had four arguments to make the logic
easier k,n,i are known , and there\'s \'boxes\' given when calling the
function , it is the array that holds the indexes for the clicked boxes
for each \'O\' and \'X\',

starting with the hardest to figure out for me, it was the
\"checkHorizntal()\" function, it was dificult cause it was the first
and i had to find the mathematicall connection between \'k\' \'n\' the
position that would be checked ( used variables LeftBox and RightBox as
shown bellow), and the first and last row.

```JavaScript
let leftBox = i - 1; while (leftBox \>= 0 && leftBox % n !== n - 1 &&
boxes.includes(leftBox)) {

count++; leftBox\--; }

let rightBox = i + 1; while (rightBox \< n \* n && rightBox % n !== 0 &&
boxes.includes(rightBox)) { count++; rightBox++; }

```

mainly i had to find the last column and the first one, the first
columnis easy, since I started with the index 0 in the boxes the first
column\'s index divided by \"n\" will always give a modulo=0, which lead
to \"rightBox % n !== 0\" in the while condition, and just after some
time that I found that when I divided i box\'s index in the last column
by \"n\" it gives n-1, giving us the leftBox % n !== n - 1, and for the
other conditions it checks so we stay between 0 and n\*n so we stay in
the boxes and it checks that the current box being checked is in the
array.

for the checkVertical() function , we should check above the clicked box
and below it, clearly i navigated between then by adding or subtracting
\'n\' from it\'s index,

```JavaScript
aboveBox = i - n;
while (aboveBox \>= 0 && boxes.includes(aboveBox)) { count++; aboveBox =
aboveBox - n; }

underBox = parseInt(i) + parseInt(n); while (underBox \<= n \* n &&
boxes.includes(underBox)) { console.log(\'under\'); count++; underBox =
underBox + parseInt(n); }
```

and there\'s no way for it to wrap to the next row , not mathematically
not logically, so it was easier as shown.

for the check diagonal it was logically fun , I added the logic between
check horizontal and check vertical, knew where to put every condition
so it won\'t wrap-over, and it left me with a clean logic. however
there\'s one important concept to keep in mind, there area two diagonals
,top right to bottom left ,and top left to bottom right, I dealt with
that with checking one see if it\'s a winner if not check the other.

```JavaScript
while (upRight \>= 0 && upRight % n !== 0 && boxes.includes(upRight)) {
count++; upRight -= (n - 1); }

while (downLeft \<= n \* n && downLeft % n !== n - 1 &&
boxes.includes(downLeft)) { count++; downLeft += n - 1; }

if (count \>= k) { winnerFound(currentPlayer) return } else {

let count = 1; let upLeft = i - (n + 1); let downRight = i + n + 1;
console.log(\'here\') while (upLeft \>= 0 && upLeft % n !== n - 1 &&
boxes.includes(upLeft)) { console.log(\'inside upleft\') count++; upLeft
-= (n + 1); }

while (downRight \<= n \* n && downRight % n !== 0 &&
boxes.includes(downRight)) { console.log(\'inside downright\') count++
downRight += n + 1 }
```

which direct us to the last destination, all of these call the function
\"WinnerFound()\", and these are the steps it goes by:

checks the winner -\> gets the score from local storage -\> adds one to
it -\> shows the winner in the game status -\> shows the score -\>
changes the game to inactive by setting the gameActive variable to
false.

to start a new game the new game button must be clicked, it calls the
functino \'intialiseGame()\' which emptys the clicked boxes arrays and
reactivates the game and callign \"setUpGrid()\" to clean the Xs and Os
for the next game.
