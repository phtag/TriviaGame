window.onload = function() {
    var intervalId;
    
    $("#time-remaining").hide();
    $("#time-remaining-display").hide();
    $('#start-button').show();
    var quizContainer = $('.quiz-container');
    var currentQuestion = $('#quiz-question');
    var questionChoices = $('#question-choices');
    var myChoicesButtonsContainer = $('#my-choices-buttons-container');
    currentQuestion.hide();

    $('.my-button').on('click', function(event){
        $("#time-remaining").show();
        $("#time-remaining-display").show();
        var initialTimeRemaining = myClock.timeConverter(60);
        $("#time-remaining-display").text(initialTimeRemaining);    
        myClock.start();
        $(this).hide();
        currentQuestion.show();
        currentQuestion.text("Which of the following people is not a member of the K-Pop band BTS?")
        // questionChoices.append('<li>Jimin</li>');
        // questionChoices.append('<li>RM</li>');
        // questionChoices.append('<li>Jungkook</li>');
        // questionChoices.append('<li>Suga</li>');
        // questionChoices.append('<li>Sung Choi</li>');
        // questionChoices.append('<li>V</li>');
        // questionChoices.append('<li>Jin</li>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">Jimin</button><br>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">RM</button><br>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">Jungkook</button><br>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">Suga</button><br>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">Sung Choi</button><br>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">V</button><br>');
        myChoicesButtonsContainer.append('<button class="btn btn-primary my-choices-buttons">Jin</button><br>');
    

        
    });
    $(document).on('mouseover', 'li', function(event){
        // alert($(this).text());
        $(this).css("background-color", "yellow");
    });
    var clockRunning = false;
    var myClock = {
        time: 0,
        remainingTime:  60,
        start: function() {
    
            //  TODO: Use setInterval to start the count here and set the clock to running.
            if (!clockRunning) {
            intervalId = setInterval(myClock.count, 1000);
            clockRunning = true;
            }
            else {
            }
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