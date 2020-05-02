const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;
let isGameStarted = false;

function round() {
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  $("#button-start").hide();
  isGameStarted = true;

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if (hits === 1) {firstHitTime = getTimestamp();}
  if (hits === maxHits) {endGame();}
}

function endGame() {
  $(".game-field").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);

  $("#total-time-played").text(totalPlayedSeconds);
  $("#totalScores").text(hits - fails);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  let target = $(event.target)
  if (isGameStarted === true) {
   if (target.hasClass("target")) {
     hits += 1;
     target.text("");
     round();
    }
   else {
     fails += 1;
      target.addClass("miss"); 
    }
  }
}

function init() {
  $("#button-start").click(round);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
