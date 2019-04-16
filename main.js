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



document.getElementById("sport").addEventListener("click", function() { wordpool = sports; hideDIV();  setGame(); addElement(); });
document.getElementById("vegie").addEventListener("click", function() { wordpool = vegetables; hideDIV();  setGame(); addElement();  });
document.getElementById("anim").addEventListener("click", function() { wordpool = animals; hideDIV();  setGame(); addElement();  });
document.getElementById("food").addEventListener("click", function() { wordpool = foods; hideDIV();  setGame(); addElement();  });
document.getElementById("tries").innerHTML = totaltries;
// document.getElementById("btn").addEventListener("click", addElement);
document.getElementById("sendbtn").addEventListener("click", addLetters);
document.addEventListener("keydown", keylistener);
document.getElementById("reload").addEventListener("click", reload);

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
    alert("You've lost!");
    document.getElementById("tries").innerHTML = 0;
    document.getElementById("gues").innerHTML = "The answer was: " + word;
}
} else alert("enter a letter")
}

document.getElementById("senddata").addEventListener("click", function() {
    var z = document.getElementsByClassName("cube");
        var y;
        for (y = 0; y <z.length; y++) {
            z[y].classList.remove("wrong");
        }
});




