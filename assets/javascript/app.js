window.onload = function() {
    $("#time-remaining").hide();
    $("#time-remaining-display").hide();
    
    $('.my-button').on('click', function(event){
        $("#time-remaining").show();
        $("#time-remaining-display").show();
        var initialTimeRemaining = myClock.timeConverter(60);
        $("#time-remaining-display").text(initialTimeRemaining);    
        myClock.start();
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