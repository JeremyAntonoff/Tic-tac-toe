var pChoice = "";
var aiChoice = "";
var one = $("#one");
var two = $("#two");
var three = $("#three");
var four = $("#four");
var five = $("#five");
var six = $("#six");
var seven = $("#seven");
var eight = $("#eight");
var nine = $("#nine");
var availableArray = [];
var ticArray = [one, two, three, four, five, six, seven, eight, nine] //Array to store player/ai moves
var resetTicArray = ticArray.slice(0);
var winArray = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]] //all combinations that can win
var gameObj =  {
	1: "no input",
	2: "no input",
	3: "no input",
	4: "no input",
	5: "no input",
	6: "no input",
	7: "no input",
	8: "no input",
	9: "no input",
} 

function ready() { 
	$("#selectWindow").fadeIn(1000, function() {
		$(this).css("display", "block")
	});
	$("#x").on("click", function() {
		pChoice = "x";
		aiChoice = "o";
		selectFade();
	});
	$("#o").on("click", function() {
		pChoice = "o"
		aiChoice = "x";
		selectFade();
	});
}

function selectFade() { 
	if (pChoice === "x") {
				playerChoose()
			} else if (pChoice === "o") {
				playerChoose();
				aiChoose();
			}
	$("#selectWindow").fadeOut(500, function() {
		$(this).css("display", "none");
		$("#ticBox").fadeIn(800, function() {
			$(this).css("display", "block");
		});
	});
}

function playerChoose() { 
	$("#one").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[0] = pChoice; 
		aiChoose(); 
		$(this).off("click");
	});
	$("#two").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[1] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#three").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[2] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#four").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[3] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#five").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[4] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#six").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[5] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#seven").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[6] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#eight").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[7] = pChoice;
		aiChoose();
		$(this).off("click");
	});
	$("#nine").on("click", function(){
		$(this).text(pChoice).css("text-transform", "uppercase");
		ticArray[8] = pChoice;
		aiChoose();
		$(this).off("click");
	});
}

function aiChoose() {
	updateGameObj()
	updateWinArray();
	availableArray = findAvailable()
	if (availableArray.length > 0 && (!checkWinner())) { 
		makeMove();
	}

	if (checkWinner()) { 
		resetGame(); 
		checkWinner(); 
		availableArray = findAvailable()
	} else if (availableArray.length < 1 || !(availableArray)) { 
		$("h1").text("tie")
		resetGame()
	}
}

function findAvailable() { 
	return ticArray.filter(function(item) {
		return item !== pChoice && item !== aiChoice;
	});
}

function randomSpace(available) { 
	var numberItem = Math.floor(Math.random() * available.length)
	return numberItem;
}

function updateGameObj() {
	var objArray = Object.keys(gameObj); 
	for (var i=0; i < objArray.length; i++) {
		if (ticArray[i] === pChoice || ticArray[i] === aiChoice) {
			gameObj[objArray[i]] = ticArray[i]; 
		}
	}
}

function updateWinArray() {
	for (var i=0; i < winArray.length; i++) {
		for (var j=0; j < winArray[j].length; j++) {
			if (gameObj[winArray[i][j]] === pChoice || gameObj[winArray[i][j]] === aiChoice) {
				winArray[i][j] = gameObj[winArray[i][j]]; 
			}
		}
	}
}

function makeMove() {
	if (makeWinner()) {
		return true
	} else if (makeBlock()) {
		return true
	}
	return randomMove();
}

function makeBlock() {
	for (var i=0; i < winArray.length;i++) {
		if (winArray[i][0] === pChoice && winArray[i][1] === pChoice) {
			if (ticArray[winArray[i][2]-1] !== pChoice && ticArray[winArray[i][2]-1] !== aiChoice && ticArray[winArray[i][2]-1] !== undefined ) {
				ticArray[winArray[i][2]-1].text(aiChoice).css("text-transform", "uppercase")
				ticArray[winArray[i][2]-1].off("click");
				ticArray[winArray[i][2]-1] = aiChoice;
				return true;
			}
		} else if (winArray[i][0] === pChoice && winArray[i][2] === pChoice) {
				if (ticArray[winArray[i][1]-1] !== pChoice && ticArray[winArray[i][1]-1] !== aiChoice && ticArray[winArray[i][1]-1] !== undefined) {
						ticArray[winArray[i][1]-1].text(aiChoice).css("text-transform", "uppercase") 
						ticArray[winArray[i][1]-1].off("click");
						ticArray[winArray[i][1]-1] = aiChoice;
						return true;
				}
		} else if (winArray[i][1] === pChoice && winArray[i][2] === pChoice) {
				if (ticArray[winArray[i][0]-1] !== pChoice && ticArray[winArray[i][0]-1] !== aiChoice && ticArray[winArray[i][0]-1] !== undefined) {
						ticArray[winArray[i][0]-1].text(aiChoice).css("text-transform", "uppercase")
						ticArray[winArray[i][0]-1].off("click");
						ticArray[winArray[i][0]-1] = aiChoice;
						return true;
				}
		}
	}
}

function makeWinner() {
		for (var i=0; i < winArray.length;i++) {
		if (winArray[i][0] === aiChoice && winArray[i][1] === aiChoice) {
			if (ticArray[winArray[i][2]-1] !== pChoice && ticArray[winArray[i][2]-1] !== aiChoice && ticArray[winArray[i][2]-1] !== undefined) {
				ticArray[winArray[i][2]-1].text(aiChoice).css("text-transform", "uppercase");
				ticArray[winArray[i][2]-1].off("click");
				ticArray[winArray[i][2]-1] = aiChoice;
				return true
			}
		} else if (winArray[i][0] === aiChoice && winArray[i][2] === aiChoice) {
				if (ticArray[winArray[i][1]-1] !== pChoice && ticArray[winArray[i][1]-1] !== aiChoice && ticArray[winArray[i][1]-1] !== undefined) {
						ticArray[winArray[i][1]-1].text(aiChoice).css("text-transform", "uppercase"); 
						ticArray[winArray[i][1]-1].off("click");
						ticArray[winArray[i][1]-1] = aiChoice;
						return true
				}
		} else if (winArray[i][1] === aiChoice && winArray[i][2] === aiChoice) {
				if (ticArray[winArray[i][0]-1] !== pChoice && ticArray[winArray[i][0]-1] !== aiChoice && ticArray[winArray[i][0]-1] !== undefined) {
						ticArray[winArray[i][0]-1].text(aiChoice).css("text-transform", "uppercase"); 
						ticArray[winArray[i][0]-1].off("click");
						ticArray[winArray[i][0]-1] = aiChoice;
						return true;
				}
		}
	}
}

function randomMove() {
		availableArray = findAvailable()
		var randomNum = randomSpace(availableArray); 
		availableArray[randomNum].text(aiChoice).css("text-transform", "uppercase") 
		var index = ticArray.indexOf(availableArray[randomNum]) 
		ticArray[index].off("click");
		ticArray[index] = aiChoice; 
		availableArray = findAvailable(); 
}

function checkWinner() {
	updateGameObj()
	updateWinArray();
	for (var i=0; i < winArray.length; i++) {
		if (winArray[i].every(aiCheck)) { 
			return $("h1").text("Computer Wins!")
		} else if (winArray[i].every(pCheck)) {
			return $("h1").text("Player Wins!")
		}
	}
	return false;
}

function aiCheck(item, array, index) { 
		return item === aiChoice;
}

function pCheck(item, array, index) { 
		return item === pChoice;
}

function offClicks() { 
	for (var i =0; i < resetTicArray.length; i++) {
		resetTicArray[i].off("click");
	}
	$("#x").off();
	$("#o").off();
}

function resetGame() { 
	offClicks(); 
	ticArray = [one, two, three, four, five, six, seven, eight, nine]; 
	winArray = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]; 
	var keys = Object.keys(gameObj);
	for (var i=0; i < keys.length; i++) {
		gameObj[keys[i]] = "no input";
	} 
	pChoice = "";
	aiChoice = "";
	setTimeout(function() { 
		$("h1").css("display", "none");
		$("h1").text("Reset?");
		$("h1").fadeIn(1000, function() {
		$("h1").css("display","block");
		$("h1").addClass("reset"); 
		})

		$("h1").on("click",function() {
			$("h1").removeClass("reset")
			$("#ticBox").css("display", "none"); 
			$("h1").text("Tic-Tac-Toe");
			for (var i=0; i < ticArray.length; i++) {
				ticArray[i].text(""); 
			}
			ready();
			$("h1").off();
		});
	},2500);
}
ready();
