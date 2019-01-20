window.onload = function() {
    var intervalId;
    var triviaGame = {
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
            myClock.stop();
            myChoicesButtonsContainer.empty();
            currentQuestionIndex++;
            $("#time-remaining").show();
            $("#time-remaining-display").show();
            var initialTimeRemaining = myClock.timeConverter(20);
            $("#time-remaining-display").text(initialTimeRemaining);    
            myClock.start();
            $(this).hide();
            currentQuestion.show();
            currentQuestion.text(triviaGame.questions[currentQuestionIndex]);
            for (var i=0;i<triviaGame.questionChoices[currentQuestionIndex].length;i++) {
                myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">' + triviaGame.questionChoices[currentQuestionIndex][i] + '</button><br>');
            }  
        }
  
    }
    var currentQuestionIndex = 0;
    var gamesWon = 0;
    var gamesLost = 0;
    $("#time-remaining").hide();
    $("#time-remaining-display").hide();
    $('#start-button').show();
    var quizContainer = $('.quiz-container');
    var currentQuestion = $('#quiz-question');
    var questionChoices = $('#question-choices');
    var myChoicesButtonsContainer = $('#my-choices-buttons-container');
    currentQuestion.hide();

    $('.start-button').on('click', function(event){

        $("#time-remaining").show();
        $("#time-remaining-display").show();
        var initialTimeRemaining = myClock.timeConverter(20);
        $("#time-remaining-display").text(initialTimeRemaining);    
        myClock.start();
        $(this).hide();
        currentQuestion.show();
        currentQuestion.text(triviaGame.questions[currentQuestionIndex]);
        for (var i=0;i<triviaGame.questionChoices[currentQuestionIndex].length;i++) {
            myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">' + triviaGame.questionChoices[currentQuestionIndex][i] + '</button><br>');
        }
    });
     $(document).on('click', '.my-choices-buttons', function(event) {
        myChoicesButtonsContainer.empty();
        $("#time-remaining").hide();
        $("#time-remaining-display").hide();
        if ($(this).text() == triviaGame.answers.values[currentQuestionIndex]) {
            gamesWon++;
            myChoicesButtonsContainer.append('<pre>Yep!</pre>');
        } else {
            gamesLost++;
            myChoicesButtonsContainer.append('<pre>Nope!</pre>');
        }

        myChoicesButtonsContainer.append('<pre>The correct answer is ' + triviaGame.answers.values[currentQuestionIndex] + '</pre>');
        var answerGIF = $('<img id="my-answer-GIF" src="' + triviaGame.answers.GIFs[currentQuestionIndex] + '">');
        myChoicesButtonsContainer.append(answerGIF);

        setTimeout(triviaGame.nextQuestion, 5000);
      });

    var clockRunning = false;
    var myClock = {
        time: 0,
        remainingTime:  20,
        start: function() {
    
            //  TODO: Use setInterval to start the count here and set the clock to running.
            if (!clockRunning) {
                intervalId = setInterval(myClock.count, 1000);
                clockRunning = true;
            }
            else {
            }
        },
        stop: function() {
            clearInterval(intervalId);
            clockRunning = false;
            myClock.remainingTime = 20;
        },
        //_______________________________________
        //
        count: function() {
            myClock.time++;
            myClock.remainingTime--;
            var timeDisplay = myClock.timeConverter(myClock.remainingTime);
            $("#time-remaining-display").text(timeDisplay);
            if (myClock.remainingTime === 0) {
                clearInterval(intervalId);
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
    };
}