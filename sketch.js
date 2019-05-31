// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyADB92HlWxVYWxm7tRxwwYdFMuKmjFONyw",
    authDomain: "game-8869a.firebaseapp.com",
    databaseURL: "https://game-8869a.firebaseio.com",
    projectId: "game-8869a",
    storageBucket: "game-8869a.appspot.com",
    messagingSenderId: "45237459101",
    appId: "1:45237459101:web:a49a8c4f30c0ee9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
let database = firebase.database()
let x
let y
let a
let b
let direction
let score
let o
let p
let direction2
let enemyCount
let level
let time
let game = document.getElementById("game")
let scoreboard = {  }


function setup() {
  createCanvas(windowWidth,windowHeight);
  s = width/859
  x=60;
  y=360;
  a=400;
  b=600;
  direction=1;
  score=10;
  o=[200,400,600,800,100,150,450,650,250,50];
  p=[600,500,400,500,400,150,450,150,250,50];
  direction2=[1,1,1,1,1,1,1,1,1,1]
  enemyCount=2;
  level=1;
  time=10


}

function draw() {
  if (time > 0) {
  background(50,190, 50);	
  fill(70, 600, 450);
  x = x + 5*direction
  circle(x*s, y, 50*s);
  
  if ( x*s > width || x*s < 0) {
	direction = direction * -1

}


  circle(a*s, b, 100*s)

 if (keyIsDown(LEFT_ARROW)) {
    a = a - 20
  }
 if (keyIsDown(RIGHT_ARROW)) {
    a = a + 20
  }
 if (keyIsDown(UP_ARROW)) {
    b = b - 20
  }
 if (keyIsDown(DOWN_ARROW)) {
    b = b + 20
  }
  
  for (i=0; i<enemyCount; i=i+1) {
    square(o[i]*s, p[i], 75*s)
    p[i] = p[i] + 5*direction2[i]


    if ( p[i] > height || p[i] < 0) {
      direction2[i] = direction2[i] * -1

  }
    if (dist( a*s, b, o[i]*s, p[i]) < 50*s + 37.5*s) {
      score = score - 1
    }

}


  textSize(24)
  text("score: " + score, 500*s, 100)
  text(time.toFixed(3), 500, 50)
  time = time-.02

  
  if (dist( x*s, y, a*s, b) < 50*s + 25*s) {
	score = score + 1
}
if (score > 200 && level == 1) {
enemyCount = enemyCount + 1
level = 2

  
}

  
if (score > 300 && level == 2) {
enemyCount = enemyCount + 1
level = 3

  
}

  
if (score > 400 && level == 3) {
enemyCount = enemyCount + 1
level = 4
}

  
if (score > 500 && level == 4) {
enemyCount = enemyCount + 1
level = 5
}

  
if (score > 600 && level == 5) {
enemyCount = enemyCount + 1
level = 6
}

if (score > 650 && level == 6) {
enemyCount = enemyCount + 1
level = 7
}

  if (score > 679 && level == 7) {
enemyCount = enemyCount + 1
level = 8
}
  if (score > 700 && level == 8) {
enemyCount = enemyCount + 1
level = 9
}
}
  
   else {
     game.innerHTML = "Name? <input id='lame'><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()>All-time leaderboard</button>"
     noLoop()


}
}

function restart() { 
        let lame= document.getElementById("lame")
		name = lame.value 
		database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        
        alert("Scoreboard: " + JSON.stringify(scoreboard,null,1)) 
		time = 10
		score = 0
        level = 1
		enemycount = 2
		loop()
		game.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
