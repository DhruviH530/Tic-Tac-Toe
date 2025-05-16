const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currnetPlayer;
let gameGrid;

// wining
 const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],        
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
 ];

//  function  create je gam ene initialise 

function initGame (){
    currnetPlayer = "x";
    // Grid ma change 
    gameGrid = ["","","","","","","","",""]; 
    // ui pr empty krvu padse jyre new game pr clicl krvu hase to
    boxes.forEach((box, index)=>{
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        // green colr ne bi remove krvano che jyre game jitiya pachi new game aave 
        box.classList =`box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currnetPlayer}`;
}

initGame();

function checkGameover(){
    // newGameBtn.classList.add("active");
    let answer = "";
    winningPosition.forEach((position)=>{

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="")
        && (gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]]) ){

            // check kro k winner (x) che ? na hoy to (O)
            if(gameGrid[position[0]] === "x")
                answer = "x";
            else{
                 answer = "O";
            }
               
            // ek jiti jay to evnet bandh kri devnau 
                boxes.forEach((box) =>{
                    box.style.pointerEvents ="none";
                })

            // hve check kro winner x/o che to colour green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    }

});

        // winner che to 
        if(answer !== ""){
            gameInfo.innerText = `Winner Player -${answer}`;
            newGameBtn.classList.add("active");
            return;
        }

        // tie che k nai 
        let fillCount = 0;
        gameGrid.forEach((box) =>{
            if(box !== "") 
                fillCount++;
        });

        // badhu bhrai jay to game tie thase aena mate 

        if(fillCount ===9){
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }



}

    function swapTurn(){
        if(currnetPlayer === "x"){
            currnetPlayer = "o";

        }
        else{
            currnetPlayer ="x";
        }
        // ui update
        gameInfo.innerText = `Currnet Player - ${currnetPlayer}`;
    }


function handleClick(index){
    if(gameGrid[index] === "" ){
        //ui ma change thse 
         boxes[index].innerText = currnetPlayer; 
         gameGrid[index] = currnetPlayer;
         boxes[index].style.pointerEvents = "none";
         
        //  turn 
        swapTurn();
        // koi jiti nai gyu ne
        checkGameover();

    }

}

boxes.forEach( (box, index)=>{
    box.addEventListener('click', () =>{
        handleClick(index);
    })
});

// new game pr click krisu to badhu fari thnai jase  

newGameBtn.addEventListener("click", initGame);