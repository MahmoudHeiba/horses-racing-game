window.addEventListener('load', function() {
    var playerAmount = 100;
    var scrollInterval;
    var horse1, horse2, horse3, horse4;
    var betHorse, betAmount;
    var viewHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log(viewHeigth);
    var finishPos = Math.round(viewHeigth * 3.80 + 32);
    var bushesArray = new Array();
    bushesArray.push(Math.round(viewHeigth * .50 - 65));
    bushesArray.push(Math.round(viewHeigth * .80 - 65));
    bushesArray.push(Math.round(viewHeigth * 1.20 - 65));
    bushesArray.push(Math.round(viewHeigth * 1.80 - 65));
    bushesArray.push(Math.round(viewHeigth * 2.00 - 65));
    bushesArray.push(Math.round(viewHeigth * 2.50 - 65));
    var winnerArray = new Array();
    var firstPlace = document.getElementById("firstHorse");
    var secondPlace = document.getElementById("secondHorse");
    var thirdPlace = document.getElementById("thirdHorse");
    var fourthPlace = document.getElementById("fourthHorse");
    var inputBetAmount = document.getElementById("amount");
    var inputBetHorse = document.getElementById("bethorse");
    var funds = document.getElementById("funds");

    function Horse(horseID, power) {
        this.name = horseID;
        this.pos = Math.round(viewHeigth * .05);
        this.power = power;
        this.horseElem = document.getElementById(horseID);
        this.nextBushesIndex = 0;
        this.speedModeStartFrom = Math.random() * (finishPos - this.power);
    }

    Horse.prototype.startRice = function() {
        this.horseElem.classList.add("runDown");
        this.move();
    }
    Horse.prototype.move = function() {
        var self = this;
        this.myInterval = setInterval(function() {
            if (self.pos + 30 >= bushesArray[self.nextBushesIndex]) {
                if (self.pos == bushesArray[self.nextBushesIndex]) {
                    self.nextBushesIndex++;

                    self.horseElem.classList.add("jump");
                    setTimeout(function() {
                        self.horseElem.classList.remove("jump");
                    }, 500)

                }
            } else {
                if (self.nextBushesIndex != 0 && self.pos < bushesArray[self.nextBushesIndex - 1] + 63) {

                } else if (self.pos >= self.speedModeStartFrom && self.power > 0) {
                    self.pos++;
                    self.power--;
                }
            }
            self.pos++;
            self.horseElem.style.top = self.pos + 'px';

            if (finishPos <= self.pos) {
                self.stopmove()
            }
        }, 8);
    }
    Horse.prototype.stopmove = function() {
        horseFinishRice(this.name);
        clearInterval(this.myInterval);
        this.horseElem.classList.remove("runDown");
    }
    Horse.prototype.reset = function() {
        this.pos = Math.round(viewHeigth * .05);
        this.horseElem.style.top = this.pos + 'px';
    }

    function scrollTrack() {
        scrollInterval = setInterval(function() {
            var scroller = document.getElementById('scroll');
            scroller.scrollTop = scroller.scrollTop + 1;
        }, 8);
    }

    function horseFinishRice(name) {
        winnerArray.push(name);
        if (winnerArray.length == 4) {
            btnReset.style.display = "block";
            firstPlace.className = winnerArray[0];
            secondPlace.className = winnerArray[1];
            thirdPlace.className = winnerArray[2];
            fourthPlace.className = winnerArray[3];
            if (betHorse == winnerArray[0]) {
                playerAmount = playerAmount + betAmount * 2;
                funds.innerText = playerAmount;
            }
        }
    }




    var btnStart = document.getElementById("start");
    var btnReset = document.getElementById("reset");



    btnStart.addEventListener('click', function() {
        btnStart.style.display = "none";
        betAmount = inputBetAmount.value;
        betHorse = inputBetHorse.value;
        playerAmount = playerAmount - betAmount;
        funds.innerText = playerAmount;
        console.log(betAmount);
        console.log(betHorse);
        console.log(playerAmount)

        var power1 = Math.round(Math.random() * (viewHeigth - 100));
        var power2 = Math.round(Math.random() * (viewHeigth - 100));
        var power3 = Math.round(Math.random() * (viewHeigth - 100));
        var power4 = Math.round(Math.random() * (viewHeigth - 100));
        console.log('power1 :' + power1);
        console.log('power2 :' + power2);
        console.log('power3 :' + power3);
        console.log('power4 :' + power4);

        horse1 = new Horse("horse1", power1);
        horse2 = new Horse("horse2", power2);
        horse3 = new Horse("horse3", power3);
        horse4 = new Horse("horse4", power4);
        scrollTrack()
        horse1.startRice();
        horse2.startRice();
        horse3.startRice();
        horse4.startRice();
    });

    btnReset.addEventListener('click', function() {
        clearInterval(scrollInterval)
        var scroller = document.getElementById('scroll');
        scroller.scrollTop = 0;
        horse1.reset();
        horse2.reset();
        horse3.reset();
        horse4.reset();
        winnerArray = new Array();
        btnReset.style.display = "none";
        btnStart.style.display = "block";
    })

})


function resetRace() {


}