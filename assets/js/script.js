$(document).ready(function() {
	$('#restartGame').hide();
	let answerResponseHTML;
	let counter = 0;
	let questionCounterTime = 0;
	let progressBarCounter;
	let questionCounter = 0;
	let theClock;
	let correctCount = 0;
	let incorrectCount = 0;
	let unansweredCount = 0;
	let startGame = false;
	let wrongAnswerImg = "./assets/images/wrongAnswer.gif";
	let badJobImg = "./assets/images/loserImg.jpg"
	let goodJobImg = "./assets/images/winnerGif.gif"
	let gameSetup = {
		qaArray: [
			{
				question: "What’s the name of Ron’s sax-playing alterego??",
				potentialAnswers: ["Duke Silver",
					"Bud King",
					"Ace Raegan"
				],
				correctAnswer: "Duke Silver",
				correctAnswerImg: "./assets/images/dukeSilver.jpg",
				answerHTML: `<ul class"list-group" id="answerList">`
			},
			{
				question: "According to Ron, what holiday is “a scam”?",
				potentialAnswers: ["Birthdays",
					"Valentine's Day",
					"Labor Day",
					"Christmas"
				],
				correctAnswer: "Birthdays",
				correctAnswerImg: "./assets/images/swansonBDay.jpg",
				answerHTML: `<ul class"list-group answerList">`
			},
			{
				question: "At what age did Ron start his first job?",
				potentialAnswers: ["15",
					"9",
					"3",
					"7"
				],
				correctAnswer: "9",
				correctAnswerImg: "./assets/images/swansonJob.jpg",
				answerHTML: `<ul class"list-group answerList">`
			},
			{
				question: "What is Ron’s ringtone?",
				potentialAnswers: ["Silence",
					"The sound of the grill",
					"Lesilie Knope's voice",
					"A gunshot"
				],
				correctAnswer: "A gunshot",
				correctAnswerImg: "./assets/images/swansonRingtone.gif",
				answerHTML: `<ul class"list-group answerList">`
			},
			{
				question: "What is the secret of Ron’s hamburger recipe?",
				potentialAnswers: ["Instead of a bun, another hamburger.",
					"Instead of ground beef, just use a steak",
					"A hamburger made out of meat on a bun with nothing.",
					"Instead of a bun, wrap it in bacon."
				],
				correctAnswer: "A hamburger made out of meat on a bun with nothing.",
				correctAnswerImg: "./assets/images/swansonBurger.jpg",
				answerHTML: `<ul class"list-group answerList">`
			}

		],

		generateCurrentQuestionHTML: function(){
			if(startGame){
				let currentQuestionDiv = $('<div>');
				let currentQuestionHTML = `<h2 class="question text-center">${gameSetup.qaArray[questionCounter].question}</h2>`;
				for(let i=0; i<gameSetup.qaArray[questionCounter].potentialAnswers.length; i++){
					gameSetup.qaArray[questionCounter].answerHTML += (`
	                       	<li class="list-group-item d-flex justify-content-between align-items-center answer">
	                        	${gameSetup.qaArray[questionCounter].potentialAnswers[i]}
	                      	</li>
		                 `);
				}
				gameSetup.qaArray[questionCounter].answerHTML += `</ul>`;
				currentQuestionDiv.append(currentQuestionHTML);
				currentQuestionDiv.append(gameSetup.qaArray[questionCounter].answerHTML);
				$('#questionContainer').html(currentQuestionDiv);
				gameSetup.timer();
			}
		},

		timer: function() {
			if(startGame){
				theClock = setInterval(tenSeconds, 1000);
				function tenSeconds(){
					if(counter === 0){
						clearInterval(theClock);
						gameSetup.outOfTime();
					}
					else if(counter > 0){
						counter--;
						console.log(counter);
						progressBarCounter = (counter/questionCounterTime)*100
					}
					$('#timerBar').attr('aria-valuenow', progressBarCounter).css('width',progressBarCounter+'%');
				}
			}
		},

		pauseForResponse: function() {
			if(startGame){
				if (questionCounter < gameSetup.qaArray.length - 1) {
				questionCounter++;
				gameSetup.generateCurrentQuestionHTML();
				counter = 10;
				}
				else {
					gameSetup.gameOver();
				}
			}
		},

		outOfTime: function() {
			if(startGame){
				unansweredCount++;
				$('#unansweredCount').html(unansweredCount);
				answerResponseHTML = `
					<div class="text-center">
						<h3>You didn't choose an answer. Better luck next time!</h3>
						<img src="${wrongAnswerImg}"/>
					</div>
				`;
				$("#questionContainer").html(answerResponseHTML);
				setTimeout(gameSetup.pauseForResponse, 6000);
			}
		},

	 	winner: function() {
	 		if(startGame){
				correctCount++;
				$('#correctCount').html(correctCount);
				answerResponseHTML = `
					<div class="text-center">
						<h3>You guessed it!</h3>
						<img src="${gameSetup.qaArray[questionCounter].correctAnswerImg}"/>
					</div>
				`;
				$("#questionContainer").html(answerResponseHTML);
				setTimeout(gameSetup.pauseForResponse, 8000);  
			}
		},

	 	loser: function() {
	 		if(startGame){
				incorrectCount++;
				$('#incorrectCount').html(incorrectCount);
				answerResponseHTML = `
					<div class="text-center">
						<h3>You guessed incorrectly, better luck next time!</h3>
						<img src="${wrongAnswerImg}"/>
					</div>
				`;
				$("#questionContainer").html(answerResponseHTML);
				setTimeout(gameSetup.pauseForResponse, 6000); 
			}
		},

		

		gameOver: function() {
			if(startGame){
				if(correctCount > incorrectCount){
					answerResponseHTML = `
						<div class="text-center">
							<h2>You got more right than wrong!</h2>
							<img src="${goodJobImg}"/>
						</div>
					`;
				}
				else{
					answerResponseHTML = `
						<div class="text-center">
							<h2>You got more wrong than right...</h2>
							<img src="${badJobImg}"/>
						</div>
					`;
				}
				$(".questionContainer").html(answerResponseHTML);
			}
		},

		restartGame: function() {
			if(startGame){
				counter = 0;
				questionCounterTime = 0;
				questionCounter = 0;
				correctCount = 0;
				incorrectCount = 0;
				unansweredCount = 0;
				startGame = false;
				answerResponseHTML = '';
				window.clearTimeout();
				for(var i = 0; i < gameSetup.qaArray.length; i++){
					gameSetup.qaArray[i].answerHTML = '';
				}
				clearInterval(theClock);
				$('#correctCount').html(correctCount);
				$('#incorrectCount').html(incorrectCount);
				$('#unansweredCount').html(unansweredCount);
				$('#questionContainer').empty();
				$('#startGame').show();
				$('#restartGame').hide();
			}
		}
	}
	$('#startGame').click(function(){
		counter = 10;
		questionCounterTime = 10;
		startGame = true;
		gameSetup.generateCurrentQuestionHTML();
		$('#startGame').hide();
		$('#restartGame').show();
	});

	$('#restartGame').click(function(){
		gameSetup.restartGame();
	});
	$("body").on("click", ".answer", function(event){
		if($(this).text().trim() === gameSetup.qaArray[questionCounter].correctAnswer) {
			clearInterval(theClock);
			gameSetup.winner();
		}
		else {
			clearInterval(theClock);
			gameSetup.loser();
		}
	}); 
});