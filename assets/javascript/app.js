// Javascript & JQuery

$(document).ready(function() {

    // My Questions //
    var questions= [
    {
        question: "What band first recorded the iconic song “Motorhead”?",
        posAnswers: ["Motorhead", "The Stooges", "Budgie", "Hawkwind"],
        answer: 3,
        image: "assets/images/hawkwind.jpg"
    },
    {
        question: "Before his time in The Ramones, Mark Bell (A.K.A. Marky Ramone) played drums in which Proto-Metal power trio?",
        posAnswers: ["Sir Lord Baltimore", "Dust", "Overkill", "Black Sabbath"],
        answer: 1,
        image: "assets/images/Dust.jpg"
    },
    {
        question: "What was the name of Iggy Pop's Pre-Stooges Garage Rock band?",
        posAnswers: ["The Stoogettes", "Johnny and the Things", "The Iguanas", "Barry and the Remains"],
        answer: 2,
        image: "assets/images/iguanas.jpg"
        },
        {
        question: "Which band did Dave Mustaine play in prior to forming Megadeth?",
        posAnswers: ["Exodus", "Anthrax", "Metallica", "Slayer"],
        answer: 2,
        image: "assets/images/metallica.jpg"
        },
        {
        question: "What 60’s Psych band was briefly known as 'The Loudest Band in the World'?",
        posAnswers: ["Blue Cheer", "MC5", "13th Floor Elevators", "The A-Bones"],
        answer: 0,
        image: "assets/images/blueCheer.jpg"
        },
        {
        question: "Which band recorded the Punk Rock masterpiece Los Angeles?",
        posAnswers: ["The Ramones", "The Clash", "The Germs", "X"],
        answer: 3,
        image: "assets/images/x.jpg"
        },
        {
        question: "Pretty Things drummer, John Charles Edward “Twink” Alder went on to record with which London-based Punk band?",
        posAnswers: ["Sex Pistols", "The Rings", "The Exploited", "Public Image Ltd"],
        answer: 1,
        image: "assets/images/rings.jpg"
        },
        {
        question: "Before she “Loved Rock ’N Roll”, Joan Jett played guitar in which all-girl band?",
        posAnswers: ["The Shaggs", "Shonen Knife", "The Runaways", "Hootie and the Blowfish"],
        answer: 2,
        image: "assets/images/runaways.jpeg"
        },
        {
        question: "What was the name of Phil Lynott’s band before forming Thin Lizzy?",
        posAnswers: ["Bon Jovi", "Skid Row", "Taste", "Eden’s Children"],
        answer: 1,
        image: "assets/images/skidrow.jpeg"
        },
        {
        question: "Early in his career, Neil Young played in Canadian band, The Mynah Birds, with which of these musician?",
        posAnswers: ["Rick James", "Geddy Lee", "Bryan Adams", "Alanis Morissette"],
        answer: 0,
        image: ("assets/images/rickJames.jpg")
        }];
        
    var correct = 0;
    var wrong = 0;
    var unanswer = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var quesCount = questions.length;
    var newArray = [];
    var holder = [];
    var pick;
    var index;
   
    
    
    
    $("#reset").hide();
    // Start Game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < questions.length; i++) {
        holder.push(questions[i]);
    }
        })
    // Begin Timer
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //Count
    function decrement() {
        $("#timeDiv").html("<h3>TIME IS RUNNING OUT: " + timer + "</h3>");
        timer --;
    
        //Timer stops when it hits 0
        if (timer === 0) {
            unanswer++;
            stop();
            $("#answerDiv").html("<p>Time is up! The correct answer is: " + pick.posAnswers[pick.answer] + "</p>");
            hideimage();
        }	
    }
    
    //Stop timer function
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //Question is picked at Random
    function displayQuestion() {
        //Array index is created
        index = Math.floor(Math.random()*questions.length);
        pick = questions[index];
    
            //Array and display
            $("#questionDiv").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.posAnswers.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.posAnswers[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerDiv").append(userChoice);
    }
    
    
    
    //Select Answer with click
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //Verify guess
        if (userGuess === pick.answer) {
            stop();
            correct++;
            userGuess="";
            $("#answerDiv").html("<p>Yeah Buddy!</p>");
            hideimage();
    
        } else {
            stop();
            wrong++;
            userGuess="";
            $("#answerDiv").html("<p>Wrong! It's " + pick.posAnswers[pick.answer] + "</p>");
            hideimage();
        }
      })
    }
    
    function hideimage () {
        $("#answerDiv").append("<img src=" + pick.image + ">");
        newArray.push(pick);
        questions.splice(index,1);
    
        var hidpic = setTimeout(function() {
           $("#answerDiv").empty();
            timer= 15;
    
        //Scoring once all questions have cycled
        if ((wrong + correct + unanswer) === quesCount) {
            $("#questionDiv").empty();
            $("#questionDiv").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerDiv").append("<h4> Nailed: " + correct + "</h4>" );
            $("#answerDiv").append("<h4> Failed: " + wrong + "</h4>" );
            $("#answerDiv").append("<h4> Bailed: " + unanswer + "</h4>" );
            $("#reset").show();
            correct = 0;
            wrong = 0;
            unanswer = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    // Reset
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for(var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
