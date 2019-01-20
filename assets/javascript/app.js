window.onload = function() {
    var intervalId;
    var triviaGame = {
        maxTimePerQuestion : 10,
        currentQuestionIndex : -1,
        notAnswered : 0,
        AnsweredCorrectly : 0,
        AnsweredIncorrectly : 0,
        clockRunning : false,
        questions : ["Which of the following people is not a member of the K-Pop band BTS?",
                    "What US city has the most microbreweries?",
                    "What city did the baseball Dodgers move from before coming to Los Angeles?",
                    "Which movie has grossed the most money of all time?"],
        questionChoices : [["Jimin", "RM", "Suga", "Sung Choi", "J-Hope", "Jungkook"],
                        ["Portland", "Boston", "Denver", "St. Louis", "Atlanta", "Sacramento"],
                        ["Boston", "Chicago", "Baltimore", "Pittsburgh", "Cincinatti", "Brooklyn"],
                        ["Titanic", "Star Wars: The Force Awakens", "Frozen", "Avatar", "Beauty and the Beast", "Forrest Gump"]],
        answers : {values: ["Sung Choi", "Portland", "Brooklyn", "Avatar"],
                   GIFs: ["https://media.giphy.com/media/8PduhjwiOxtNjieurJ/giphy.gif",
                          "https://media.giphy.com/media/jldMwH1mvaRTo5jIBw/giphy.gif",
                          "https://media.giphy.com/media/gZ7UAPE4SnjJC/giphy.gif",
                          "https://media.giphy.com/media/AxhxIcTMEMqR2/giphy.gif"
                        ]}, 
        nextQuestion : function() {
            triviaGame.myClock.stop();
            myChoicesButtonsContainer.empty();
            triviaGame.currentQuestionIndex++;
            if (triviaGame.currentQuestionIndex >= triviaGame.questions.length) {
                // Game has been completed. Summarize results and restart the game
                triviaGame.displayGameResult();
            } else {
                $("#time-remaining").show();
                $("#time-remaining-display").show();
                var initialTimeRemaining = triviaGame.myClock.timeConverter(triviaGame.maxTimePerQuestion);
                $("#time-remaining-display").text(initialTimeRemaining);    
                triviaGame.myClock.start();
                $(this).hide();
                currentQuestion.show();
                currentQuestion.text(triviaGame.questions[triviaGame.currentQuestionIndex]);
                for (var i=0;i<triviaGame.questionChoices[triviaGame.currentQuestionIndex].length;i++) {
                    myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">' + triviaGame.questionChoices[triviaGame.currentQuestionIndex][i] + '</button><br>');
                }  
            }
        },
        displayQuestionResult : function(messageToDisplay) {
            myChoicesButtonsContainer.empty();
            $("#time-remaining").hide();
            $("#time-remaining-display").hide();
            myChoicesButtonsContainer.append('<pre>' + messageToDisplay + '</pre>');   
            myChoicesButtonsContainer.append('<pre>The correct answer is ' + triviaGame.answers.values[triviaGame.currentQuestionIndex] + '</pre>');
            var answerGIF = $('<img id="my-answer-GIF" src="' + triviaGame.answers.GIFs[triviaGame.currentQuestionIndex] + '">');
            myChoicesButtonsContainer.append(answerGIF);
            setTimeout(triviaGame.nextQuestion, 5000);
        },
        displayGameResult : function(messageToDisplay) {
            currentQuestion.hide();
            myChoicesButtonsContainer.empty();
            $("#time-remaining").hide();
            $("#time-remaining-display").hide();
            myChoicesButtonsContainer.append('<pre>Correctly answered: ' + triviaGame.AnsweredCorrectly  + '</pre>');   
            myChoicesButtonsContainer.append('<pre>Incorrectly answered: ' + triviaGame.AnsweredIncorrectly  + '</pre>');   
            myChoicesButtonsContainer.append('<pre>Not answered: ' + triviaGame.notAnswered  + '</pre>');   
            var startOverButton = $('<button class="btn btn-primary start-button">Restart the game?</button>');
            myChoicesButtonsContainer.append(startOverButton);
            setTimeout(triviaGame.nextQuestion, 5000);
        },
        myClock : {
            time: 0,
            remainingTime : 0,
            start: function() {
                triviaGame.myClock.remainingTime =  triviaGame.maxTimePerQuestion;
                //  TODO: Use setInterval to start the count here and set the clock to running.
                if (!triviaGame.clockRunning) {
                    intervalId = setInterval(triviaGame.myClock.count, 1000);
                    triviaGame.clockRunning = true;
                }
                else {
                }
            },
            stop: function() {
                clearInterval(intervalId);
                triviaGame.clockRunning = false;
                triviaGame.myClock.remainingTime = triviaGame.maxTimePerQuestion;
            },
            //_______________________________________
            //
            count: function() {
                triviaGame.myClock.time++;
                triviaGame.myClock.remainingTime--;
                var timeDisplay = triviaGame.myClock.timeConverter(triviaGame.myClock.remainingTime);
                $("#time-remaining-display").text(timeDisplay);
                if (triviaGame.myClock.remainingTime === 0) {
                    triviaGame.displayQuestionResult("Sorry. Time has expired");
                    triviaGame.notAnswered++;
                }
            },
            //________________________________________
            //
            timeConverter: function(t) {      
                //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
                var minutes = Math.floor(t / 60);
                var seconds = t - (minutes * 60);
        
                if (seconds < 10) {
                seconds = "0" + seconds;
                }
        
                if (minutes === 0) {
                minutes = "00";
                }
        
                else if (minutes < 10) {
                minutes = "0" + minutes;
                }
                return minutes + ":" + seconds;
            }
        }
    }
    $("#time-remaining").hide();
    $("#time-remaining-display").hide();
    $('#start-button').show();
    var quizContainer = $('.quiz-container');
    var currentQuestion = $('#quiz-question');
    var questionChoices = $('#question-choices');
    var myChoicesButtonsContainer = $('#my-choices-buttons-container');
    currentQuestion.hide();
   
    $('.start-button').on('click', triviaGame.nextQuestion);
 
    // $('.start-button').on('click', function(event){
    //     $("#time-remaining").show();
    //     $("#time-remaining-display").show();
    //     var initialTimeRemaining = triviaGame.myClock.timeConverter(triviaGame.maxTimePerQuestion);
    //     $("#time-remaining-display").text(initialTimeRemaining);    
    //     triviaGame.myClock.start();
    //     $(this).hide();
    //     currentQuestion.show();
    //     currentQuestion.text(triviaGame.questions[triviaGame.currentQuestionIndex]);
    //     for (var i=0;i<triviaGame.questionChoices[triviaGame.currentQuestionIndex].length;i++) {
    //         myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">' + triviaGame.questionChoices[triviaGame.currentQuestionIndex][i] + '</button><br>');
    //     }
    // });
     $(document).on('click', '.my-choices-buttons', function(event) {
        var message;
        // Here's where we determine if the player has input the right answer
        if ($(this).text() == triviaGame.answers.values[triviaGame.currentQuestionIndex]) {
            triviaGame.AnsweredCorrectly++;
            message = 'Yep!';
        } else {
            triviaGame.AnsweredIncorrectly++;
            message = 'Nope!';
        }
        triviaGame.displayQuestionResult(message);
      });
}