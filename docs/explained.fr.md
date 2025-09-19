Contrairement à la programmation normale où vous pouvez utiliser des *action listeners* sur les parties HTML et faire quelque chose lorsqu’elles sont déclenchées, j’ai utilisé la programmation fonctionnelle où je peux appeler une fonction quand je le veux, comme dans une balise HTML utilisant `onClick:""` ou simplement l’appeler dans une autre fonction JavaScript.

Après avoir créé ma page d’accueil, j’ai commencé avec la fonction `play()` qui est appelée par le bouton *Play*. Son rôle principal est de capturer `n` — le nombre de colonnes et de lignes — afin qu’il soit multiplié par lui-même pour donner le nombre de cases cliquables du jeu, ainsi que `k` qui est le nombre nécessaire de positions jouées par le même joueur à la suite.  
Elle commence par définir deux limites : `n` doit être compris entre 3 et 10, et `k` ne doit jamais être plus grand que `n`. Elle prend ces deux variables et les stocke dans le *local storage*, puis elle prend la section principale de la page d’accueil et la transforme en configuration pour la grille, puis appelle la fonction `setUpGrid()` pour continuer le travail.  
Ce que fait cette fonction : elle prend la section des cases et la remplace par `n*n` cases.  

Les cases, lorsqu’elles sont cliquées, déclenchent la fonction `pressBox()`, mais avant cela j’ai défini mes variables utilisées comme ci-dessous :

```javascript
let currentPlayer = "";
let gameActive = true;
let clickedByX = [];
let clickedByO = [];
Ces variables plus celles enregistrées dans le local storage suffisent pour la logique que j’utilise.
La fonction pressBox() fait les choses suivantes :

Vérifie si le jeu est actif (le jeu devient inactif dans certains cas)

Vérifie si la case est déjà jouée

Récupère le joueur courant et met son symbole dans la case

Ajoute l’index de la case au tableau associé au joueur

Appelle findWinner()

Passe l’attribut played de la case à true

Change le joueur courant.

J’utilise la fonction findWinner() comme un routage : elle recherche le dernier joueur qui a joué et appelle les fonctions :

javascript
Copy code
checkHorizontal(); 
checkVertical(); 
checkDiagonal();
javascript
Copy code
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
La logique que j’ai utilisée dans toutes les méthodes de vérification commence avec un compteur initialisé à 1 — la case cliquée doit être comptée — puis elle vérifie dans une direction s’il y a le même symbole et ajoute au compteur.
Quand elle trouve une case différente, elle part dans la direction opposée et fait de même.
Le point important est que j’utilise uniquement un système 1D dans la grille : toutes les cases ont un seul index et il ne doit pas y avoir de “retour à la ligne” vers les rangées précédentes ou suivantes (cela sera expliqué une par une).
Ainsi, je finis avec un compteur qui a le nombre de X ou O alignés. La fonction compare ensuite ce nombre à k défini au début et décide si c’est un gagnant ou si la partie doit continuer.

La méthode checkHorizontal(k, n, i, boxes) a quatre arguments pour faciliter la logique : k, n, i sont connus, et il y a boxes donné lors de l’appel de la fonction, c’est le tableau qui contient les index des cases cliquées pour chaque X et O.

En commençant par la plus difficile pour moi : la fonction checkHorizontal(). C’était difficile car c’était la première et je devais trouver la connexion mathématique entre k, n, la position à vérifier (j’ai utilisé les variables LeftBox et RightBox comme ci-dessous), ainsi que la première et la dernière colonne.

javascript
Copy code
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
Principalement, je devais trouver la dernière colonne et la première.
La première colonne est facile : puisque j’ai commencé avec l’index 0 pour les cases, l’index de la première colonne divisé par n donnera toujours un modulo = 0, ce qui conduit à la condition rightBox % n !== 0 dans la boucle.
Et après un certain temps, j’ai trouvé que lorsque je divise l’index d’une case dans la dernière colonne par n, cela donne n - 1, ce qui nous donne la condition leftBox % n !== n - 1.
Les autres conditions garantissent que nous restons entre 0 et n*n (donc à l’intérieur des cases) et que la case actuelle est bien dans le tableau.

Pour la fonction checkVertical(), nous devons vérifier au-dessus et au-dessous de la case cliquée. Clairement, je me déplace entre elles en ajoutant ou soustrayant n de son index.

javascript
Copy code
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
Et il n’y a aucun moyen que cela dépasse dans une autre rangée, ni mathématiquement ni logiquement, donc c’était plus simple comme montré.

Pour la vérification en diagonale, c’était amusant logiquement. J’ai ajouté la logique entre horizontal et vertical, j’ai su où mettre chaque condition pour éviter le retour à une autre ligne, et cela m’a donné une logique claire.
Cependant, un point important à garder à l’esprit : il y a deux diagonales, de haut-droite à bas-gauche et de haut-gauche à bas-droite. J’ai géré cela en vérifiant la première, et si ce n’était pas un gagnant, je vérifiais l’autre.

javascript
Copy code
while (upRight >= 0 && upRight % n !== 0 && boxes.includes(upRight)) {
    count++;
    upRight -= (n - 1);
}

while (downLeft <= n * n && downLeft % n !== n - 1 && boxes.includes(downLeft)) {
    count++;
    downLeft += n - 1;
}

if (count >= k) {
    winnerFound(currentPlayer)
    return
} else {
    let count = 1;
    let upLeft = i - (n + 1);
    let downRight = i + n + 1;
    console.log('here');
    while (upLeft >= 0 && upLeft % n !== n - 1 && boxes.includes(upLeft)) {
        console.log('inside upleft');
        count++;
        upLeft -= (n + 1);
    }

    while (downRight <= n * n && downRight % n !== 0 && boxes.includes(downRight)) {
        console.log('inside downright');
        count++;
        downRight += n + 1;
    }
}
Tout cela nous mène à la dernière étape : toutes ces fonctions appellent WinnerFound().
Voici les étapes suivies :

Vérifie le gagnant

Récupère le score dans le local storage

Ajoute 1 au score

Affiche le gagnant dans le statut du jeu

Affiche le score

Rend le jeu inactif en mettant la variable gameActive à false.

Pour démarrer une nouvelle partie, il faut cliquer sur le bouton New Game.
Cela appelle la fonction initialiseGame() qui vide les tableaux des cases cliquées, réactive le jeu et appelle setUpGrid() pour nettoyer les X et O de la partie précédente.