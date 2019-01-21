// Javascript & JQuery //
$(document).ready(function() {

// My Questions //
var questions = [
{
    question: "What band first recorded the iconic song “Motorhead”?",
    answers: ["Motorhead", "The Stooges", "Budgie", "Hawkwind"],
    rightAnswer: 3,
},
{
    question: "Before his time in The Ramones, Mark Bell (A.K.A. Marky Ramone) played drums in which Proto-Metal power trio?",
    answers: ["Sir Lord Baltimore", "Dust", "Overkill", "Black Sabbath"],
    rightAnswer: 1,
},
{
    question: "What was the name of Iggy Pop's Pre-Stooges Garage Rock band?",
    answers: ["The Stoogettes", "Johnny and the Things", "The Iguanas", "Barry and the Remains"],
    rightAnswer: 2,
  },
  {
    question: "Which band did Dave Mustaine play in prior to forming Megadeth?",
    answers: ["Exodus", "Anthrax", "Metallica", "Slayer"],
    rightAnswer: 2,
  },
  {
    question: "What 60’s Psych band was briefly known as 'The Loudest Band in the World'?",
    answers: ["Blue Cheer", "MC5", "13th Floor Elevators", "The A-Bones"],
    rightAnswer: 0,
  },
  {
    question: "Which band recorded the Punk Rock masterpiece Los Angeles?",
    answers: ["The Ramones", "The Clash", "The Germs", "X"],
    rightAnswer: 3,
  },
  {
    question: "Pretty Things drummer, John Charles Edward “Twink” Alder went on to record with which London-based Punk band?",
    answers: ["Sex Pistols", "The Rings", "The Exploited", "Public Image Ltd"],
    rightAnswer: 1,
  },
  {
    question: "Before she “Loved Rock ’N Roll”, Joan Jett played guitar in which all-girl band?",
    answers: ["The Shaggs", "Shonen Knife", "The Runaways", "Hootie and the Blowfish"],
    rightAnswer: 2,
  },
  {
    question: "What was the name of Phil Lynott’s band before forming Thin Lizzy?",
    answers: ["Bon Jovi", "Skid Row", "Taste", "Eden’s Children"],
    rightAnswer: 1,
  },
  {
    question: "Early in his career, Neil Young played in a band with which fellow Canadian musician?",
    answers: ["Rick James", "Geddy Lee", "Bryan Adams", "Alanis Morissette"],
    rightAnswer: 0,
  },
];

var correct = 0;
var wrong = 0;
var unanswered = 0;
var holder = [];
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var quesCount = questions.length;
var pick;
var index;

$("#reset").hide();
//click to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < questions.length; i++) {
	holder.push(questions[i]);
}
	});
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer for questions
function decrement() {
	$("#timer").html("<h3>Time Left: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswered++;
		stop();
		$("#answerDiv").html("<p>MMMNNNNHHHH It's " + pick.answers[pick.rightAnswer] + "</p>");
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*questions.length);
	pick = questions[index];

		$("#questionDiv").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.answers.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerChoice");
			userChoice.html(pick.answers[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerDiv").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerChoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.rightAnswer) {
		stop();
		correct++;
		userGuess="";
    $("#answerDiv").html("<p>Correct!</p>");
    displayQuestion();
		

	} else {
		stop();
		wrong++;
		userGuess="";
		$("#answerDiv").html("<p>Wrong! It's " + pick.answers[pick.rightAnswer] + "</p>");
    displayQuestion();
	}
})
}





  
    
	//run the score screen if all questions answered
	if ((wrong + correct + unanswered) === quesCount) {
		$("#questionDiv").empty();
		$("#questionDiv").html("<h3>Game Over! Your Score </h3>");
		$("#answerDiv").append("<h4> Correct: " + correct + "</h4>" );
		$("#answerDiv").append("<h4> Incorrect: " + wrong + "</h4>" );
		$("#answerDiv").append("<h4> Unanswered: " + unanswered + "</h4>" );
		$("#reset").show();
		correct = 0;
		wrong = 0;
		unanswered = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerDiv").empty();
	$("#questionDiv").empty();
	for(var i = 0; i < holder.length; i++) {
		questions.push(holder[i]);
	}

runTimer();
displayQuestion();


});



