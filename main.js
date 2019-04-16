var u = 0;
var txt = 'Welcome to Hangman!'; 
var speed = 75; 

function typeWriter() {
  if (u < txt.length) {
    document.querySelector("h1").innerHTML += txt.charAt(u);
    u++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

//declaring all variables
var wordpool = [];
var word;
var win;
var sports = ["aerobics", "basketball", "badminton", "billiards", "canoeing", "deadlifting", "fencing", "gymnastics", "ice hockey", "snowboarding" ];
var animals = ["platypus", "chimpanzee", "blue whale", "brown bear", "dalmatian", "electric eel", "hammerhead shark", "grasshopper", "kangaroo", "manta ray" ];
var vegetables = ["artichoke", "asparagus", "black beans", "cauliflower", "mushrooms", "beetroot", "butternut squash", "cucumber", "fiddleheads", "swiss chard" ];
var foods = ["apple pie", "clam chowder", "cheesecake", "guacamole", "pasta alfredo", "baked potatoes", "chicken parmesan", "beef chilli", "enchiladas", "poutine" ];
var wordNumber = Math.floor(Math.random() * Math.floor(10));
var totaltries = 6;
var guessedletters = [];
var wincounter = 0;

var audioCircle = new Audio("assets/circle.mp3");
var audioLine = new Audio("assets/line.mp3");
var audioClick = new Audio("assets/click.mp3");


//event listeners and functions

document.getElementById("sport").addEventListener("click", function() { wordpool = sports; hideDIV();  setGame(); addElement(); });
document.getElementById("vegie").addEventListener("click", function() { wordpool = vegetables; hideDIV();  setGame(); addElement();  });
document.getElementById("anim").addEventListener("click", function() { wordpool = animals; hideDIV();  setGame(); addElement();  });
document.getElementById("food").addEventListener("click", function() { wordpool = foods; hideDIV();  setGame(); addElement();  });
document.getElementById("tries").innerHTML = totaltries;

document.getElementById("sendbtn").addEventListener("click", addLetters);
document.addEventListener("keydown", keylistener);
document.getElementById("reload").addEventListener("click", reload);
document.getElementById("sendAnswer").addEventListener("click", wholeAnswer);

function reload() {
    location.reload();
}

function setGame() {
    word = wordpool[wordNumber];
    win = word.length;
}

function hideDIV() {
    document.getElementById("select").classList.add("hidden");
    document.getElementById("logic").classList.remove("logic2");
}

function stopgame() {
    document.getElementById("sendbtn").disabled = true;
}

function keylistener() {
    const keyName = event.keyCode; 
    if(keyName === 13) { addLetters()}
}

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}

function removeClass() {
    var z = document.getElementsByClassName("cube");
        var y;
        for (y = 0; y <z.length; y++) {
            z[y].classList.remove("wrong");
        }
};


var i = 0;
// div creation & styling
function addElement () {
  // create a new div element 
  var newDiv = document.createElement("div"); 
  //add class to the element to differentiate it
  newDiv.classList.add("cube");
  newDiv.classList.add("addCube");
  newDiv.id = "block" + i;
  // setup ?
  if(word[i] == false) {
    var newContent = document.createTextNode('+');
    wincounter = 1;
  } else {
    var newContent = document.createTextNode("?");
  }
  // add the text node to the newly created div
  newDiv.appendChild(newContent);  
  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("main").parentNode; 
  var currentDiv2 = document.getElementById("main");
  currentDiv.insertBefore(newDiv, currentDiv2);
  audioClick.play();
  i++;
  if( i < word.length) {
      setTimeout(addElement, 175);
  }
}


// main logic of the game



function addLetters () {

    
    // make sure the input is not empty & there are still tries left
    if(document.getElementById("senddata").value !== "") {
    if(totaltries > 1) {
    // establish letter sent
    var x = document.getElementById("senddata").value;

    // correct or wrong & guess tracker
    if(word.includes(x)) {
        document.getElementById("gues").innerHTML = "You've guessed correct!";
    } else {
        document.getElementById("gues").innerHTML = "You've guessed wrong!";
        document.getElementById("tries").innerHTML = totaltries -= 1;
        animHang();
        var z = document.getElementsByClassName("cube");
        var y;
        for (y = 0; y <z.length; y++) {
            z[y].classList.add("wrong");
            z[y].classList.remove("addCube");
        }
    }

  
    

    // checks the word if there are matching letters
    for(var i = 0; i<word.length; i++) {
        if(word[i] === x && guessedletters.includes(x) == false) {
                // select the appropriate div & change value of said div
                document.getElementById("block" + i).innerHTML = x; 
                document.getElementById("block" + i).classList.add("flip"); 
                // check if it is a win
                wincounter += 1;
                if(win == wincounter) { 
                    alert("You won!");
                    stopgame();
                }

    }
}
    // updates previous guess array & resets the input
    if (guessedletters.includes(x)) { alert("You've already guessed this letter!"); document.getElementById("tries").innerHTML = totaltries += 1; } else {
        guessedletters += x + ", ";
    document.getElementById("letters").innerHTML = guessedletters;
    document.getElementById("senddata").value = "";
    }
    
} else {
    totaltries = 0;
    animHang();
    alert("You've lost!");
    document.getElementById("tries").innerHTML = 0;
    document.getElementById("gues").innerHTML = "The answer was: " + word;
}
} else alert("enter a letter")
}

function wholeAnswer() {
    var fullAnswer = document.getElementById("wholeAnswer");
    if( fullAnswer.value == word) {
        alert("You've won!");
        stopgame();
    } else {
        totaltries -= 1;
        guessedletters += fullAnswer.value + ", ";
        document.getElementById("tries").innerHTML = totaltries;
        fullAnswer.value = "";
        document.getElementById("letters").innerHTML = guessedletters;
        animHang();
    }
}
document.getElementById("senddata").addEventListener("click", removeClass );
document.getElementById("sendAnswer").addEventListener("click", removeClass);




// hangman animation 


var canvas = document.getElementById("canvas1");
// if (canvas.getContext("2d")) {
context = canvas.getContext("2d");
context.strokeStyle = "black";

context.beginPath();
context.moveTo(25, 500);
context.lineTo(325, 500);
context.stroke();

//the frame - pole
context.beginPath();
context.moveTo(275, 500);
context.lineTo(275, 50);
context.stroke();

//the frame - top
context.beginPath();
context.moveTo(275, 50);
context.lineTo(125, 50);
context.stroke();

//the noose
context.beginPath();
context.moveTo(125, 50);
context.lineTo(125, 125);
context.stroke();


function animHang() {
    
    switch(totaltries) {

        case 5 :
        audioCircle.play();
        context.beginPath();
        context.arc(125, 150, 25, 0, Math.PI * 2, true); // draw circle for head
        // (x,y) center, radius, start angle, end angle, anticlockwise
        context.stroke();
        break;

        case 4 :
        // body
        audioLine.play();
        context.beginPath();
        context.moveTo(125, 175);
        context.lineTo(125, 300);
        context.stroke();
        break;

        case 3 :
        audioLine.play();
        context.beginPath();
        //left arm
        context.moveTo(125, 200);
        context.lineTo(75, 250);
        context.stroke();
        break;

        case 2 :
        audioLine.play();
        context.beginPath();
        //right arm
        context.moveTo(125, 200);
        context.lineTo(175, 250);
        context.stroke();
        break;

        case 1 :
        audioLine.play();
        context.beginPath();
        context.moveTo(125, 300);
        context.lineTo(75, 375);
        context.stroke();
        break;

        case 0 :
        audioLine.play();
        context.beginPath();
        context.moveTo(125, 300);
        context.lineTo(175, 375);
        context.stroke();
        break;
    }

}

//sounds




