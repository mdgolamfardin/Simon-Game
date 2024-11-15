

function playGame() {

    var greenAud = new Audio("sounds/green.mp3");
    var redAud = new Audio("sounds/red.mp3");
    var blueAud = new Audio("sounds/blue.mp3");
    var yellowAud = new Audio("sounds/yellow.mp3");

    var level = 1;
    var sequence = [];
    var userPattern = [];
    var colors = ["green", "red", "blue", "yellow"];


    function playSound(color) {

        if (color === "green") {
            greenAud.play();
        } else if (color === "red") {
            redAud.play();
        } else if (color === "blue") {
            blueAud.play();
        } else {
            yellowAud.play();
        }
    }
    function flash(button) {
        button.fadeOut(100).fadeIn(100);
    }

    function nextSequence() {

        var randNum = Math.floor(Math.random() * 4); // generates a random number between 0 and 3

        flash($("#" + colors[randNum]));
        sequence.push(colors[randNum]);
        playSound(colors[randNum]);

    }

    function same(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
    }

    $(document).off("keypress");
    setTimeout(() => {
        nextSequence();
    }, 1000);
    $("h1").text("Level " + level.toString() )
    
    $(".btn").click(function () {
        chosenColor = $(this).attr("id");
        playSound(chosenColor);
        userPattern.push(chosenColor);
        flash($(this));
        
        if (same(sequence, userPattern)) {
            level++;
            userPattern.length = 0;
            $("h1").text("Level " + level.toString() )
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

        for (let i = 0; i < userPattern.length; i++) {
            if (sequence[i] !== userPattern[i]) {

                $(".btn").off("click");
                let wrongAud = new Audio("sounds/wrong.mp3");
                wrongAud.play();
                $("body").addClass("game-over");
                $("h1").text("Game Over, Press Any Key to Restart");
                userPattern.length = 0;
                sequence.length = 0;

                setTimeout(() => {
                    $("body").removeClass("game-over");
                }, 500);
                $(document).on("keypress", function () {
                    playGame();
                });
            }
        }
    });
}

$(document).on("keypress", function () {
    playGame();
});


