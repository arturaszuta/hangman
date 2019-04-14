var wordpool = ["motorcycle", "helicopter", "basketball", "mountains", "homemade", "powerless", "ballistics", "treasure", "perception", "conclusion" ];

var wordNumber = Math.floor(Math.random() * Math.floor(10));

var word = wordpool[wordNumber];
var totaltries = 6;
var guessedletters = [];
var win = word.length;
var wincounter = 0;
document.getElementById("tries").innerHTML = totaltries;

document.getElementById("btn").addEventListener("click", addElement);
document.getElementById("sendbtn").addEventListener("click", addLetters);



function stopgame() {
    document.getElementById("sendbtn").disabled = true;
}


// div creation & styling
function addElement () {
    
    for(var i = 0; i<word.length; i++) {
  // create a new div element 
  var newDiv = document.createElement("div"); 
  //add class to the element to differentiate it
  newDiv.classList.add("cube");
  newDiv.id = "block" + i;
  // and give it some content 
  var newContent = document.createTextNode("?"); 
  // add the text node to the newly created div
  newDiv.appendChild(newContent);  

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("main").parentNode; 
  var currentDiv2 = document.getElementById("main");
  currentDiv.insertBefore(newDiv, currentDiv2);
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
        document.getElementById("gues").innerHTML = "Correct!";
    } else {
        document.getElementById("gues").innerHTML = "Wrong!";
        document.getElementById("tries").innerHTML = totaltries -= 1;
    }
    

    // checks the word if there are matching letters
    for(var i = 0; i<word.length; i++) {
        if(word[i] === x) {
                // select the appropriate div & change value of said div
                document.getElementById("block" + i).innerHTML = x; 
                // check if it is a win
                wincounter += 1;
                if(win == wincounter) { 
                    alert("You won!");
                    stopgame();
                }

    }
}
    // updates previous guess array & resets the input
    guessedletters += x + ", ";
    document.getElementById("letters").innerHTML = guessedletters;
    document.getElementById("senddata").value = "";
} else {
    alert("You've lost!")
}
} else alert("enter a letter")
}
