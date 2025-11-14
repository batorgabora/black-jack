const cardimages = [
  // Clubs
  'assets/cards/clubs/clubs-2.svg',
  'assets/cards/clubs/clubs-3.svg',
  'assets/cards/clubs/clubs-4.svg',
  'assets/cards/clubs/clubs-5.svg',
  'assets/cards/clubs/clubs-6.svg',
  'assets/cards/clubs/clubs-7.svg',
  'assets/cards/clubs/clubs-8.svg',
  'assets/cards/clubs/clubs-9.svg',
  'assets/cards/clubs/clubs-10.svg',
  'assets/cards/clubs/clubs-ace.svg',
  'assets/cards/clubs/clubs-jack.svg',
  'assets/cards/clubs/clubs-king.svg',
  'assets/cards/clubs/clubs-queen.svg',

  // Diamonds
  'assets/cards/diamonds/diamonds-2.svg',
  'assets/cards/diamonds/diamonds-3.svg',
  'assets/cards/diamonds/diamonds-4.svg',
  'assets/cards/diamonds/diamonds-5.svg',
  'assets/cards/diamonds/diamonds-6.svg',
  'assets/cards/diamonds/diamonds-7.svg',
  'assets/cards/diamonds/diamonds-8.svg',
  'assets/cards/diamonds/diamonds-9.svg',
  'assets/cards/diamonds/diamonds-10.svg',
  'assets/cards/diamonds/diamonds-ace.svg',
  'assets/cards/diamonds/diamonds-jack.svg',
  'assets/cards/diamonds/diamonds-king.svg',
  'assets/cards/diamonds/diamonds-queen.svg',

  // Hearts
  'assets/cards/hearts/hearts-2.svg',
  'assets/cards/hearts/hearts-3.svg',
  'assets/cards/hearts/hearts-4.svg',
  'assets/cards/hearts/hearts-5.svg',
  'assets/cards/hearts/hearts-6.svg',
  'assets/cards/hearts/hearts-7.svg',
  'assets/cards/hearts/hearts-8.svg',
  'assets/cards/hearts/hearts-9.svg',
  'assets/cards/hearts/hearts-10.svg',
  'assets/cards/hearts/hearts-ace.svg',
  'assets/cards/hearts/hearts-jack.svg',
  'assets/cards/hearts/hearts-king.svg',
  'assets/cards/hearts/hearts-queen.svg',

  // Spades
  'assets/cards/spades/spades-2.svg',
  'assets/cards/spades/spades-3.svg',
  'assets/cards/spades/spades-4.svg',
  'assets/cards/spades/spades-5.svg',
  'assets/cards/spades/spades-6.svg',
  'assets/cards/spades/spades-7.svg',
  'assets/cards/spades/spades-8.svg',
  'assets/cards/spades/spades-9.svg',
  'assets/cards/spades/spades-10.svg',
  'assets/cards/spades/spades-ace.svg',
  'assets/cards/spades/spades-jack.svg',
  'assets/cards/spades/spades-king.svg',
  'assets/cards/spades/spades-queen.svg',
];

let deck = [...cardimages];

let opp_points = 0;
let me_points  = 0;

const my_pointer  = document.getElementById("my_value");
const opp_pointer = document.getElementById("opp_value");

const faszmano = document.getElementById("hitme");
const polaroid = document.getElementById("stand");

let stood = false;

const mizu = document.getElementById("mizu");

const card_one_me   = document.getElementById("card_one_me");
const card_two_me   = document.getElementById("card_two_me");
const card_three_me = document.getElementById("card_three_me");
const card_four_me  = document.getElementById("card_four_me");
const card_five_me  = document.getElementById("card_five_me");
const myCards = [
  card_one_me,
  card_two_me,
  card_three_me,
  card_four_me,
  card_five_me
];

const card_one_opp   = document.getElementById("card_one_opp");
const card_two_opp   = document.getElementById("card_two_opp");
const card_three_opp = document.getElementById("card_three_opp");
const card_four_opp  = document.getElementById("card_four_opp");
const card_five_opp  = document.getElementById("card_five_opp");
const oppCards = [
  card_one_opp,
  card_two_opp,
  card_three_opp,
  card_four_opp,
  card_five_opp
];

const used_one   = document.getElementById("used_one");
const used_two   = document.getElementById("used_two");
const used_three = document.getElementById("used_three");
const used_four  = document.getElementById("used_four");

const new_one   = document.getElementById("new_one");
const new_two   = document.getElementById("new_two");
const new_three = document.getElementById("new_three");
const new_four  = document.getElementById("new_four");

let hidden;

// ---------------- used pile state ----------------

let usedPile = [];

// ---------------- initial clear ----------------

[...myCards, ...oppCards].forEach(clearCard);

usedPile = [];
syncUsedImages();

// ---------------- deck draw ----------------

function draw() {
  if (deck.length === 0) {
    deck = [...cardimages];
  }
  const index = Math.floor(Math.random() * deck.length);
  const card  = deck[index];
  deck.splice(index, 1);
  return card;
}

// ---------------- game start ----------------

firstdeal();

// HIT: you draw one, opponent maybe draws one
faszmano.addEventListener("click", function() {
  if (stood) return;              // can't hit after standing
  hitme();
  checkStatus();
});

// STAND: opponent finishes their whole turn
polaroid.addEventListener("click", function() {
  if (stood) return;
  stood = true;
  setCard(card_one_opp, hidden)
  setTimeout(() => {
    drawopponent(true);
    checkStatus();
  }, 2500);
});

// ---------------- main logic ----------------

function firstdeal() {
  stood = false;
  mizu.innerHTML = "";

  // clear table slots
  [...myCards, ...oppCards].forEach(clearCard);

  me_points  = 0;
  opp_points = 0;

  // you: first card
  let c = draw();
  setCard(card_one_me, c);
  me_points += valuate(c);

  // opp: first card
  c = draw();
  hidden = c;
  setCard(card_one_opp, "assets/cards/card-back.svg");
  opp_points += valuate(c);

  // you: second card
  c = draw();
  setCard(card_two_me, c);
  me_points += valuate(c);

  // opp: second card
  c = draw();
  setCard(card_two_opp, c);
  opp_points += valuate(c);

  my_pointer.innerHTML  = me_points;
  opp_pointer.innerHTML = opp_points;

  checkStatus();
}

function checkStatus() {
  if (opp_points === 21) {
    mizu.innerHTML = "szomorkás";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
  else if (me_points === 21) {
    mizu.innerHTML = "fekete jakab";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
  else if (me_points > 21) {
    mizu.innerHTML = "a manóba";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
  else if (opp_points > 21) {
    mizu.innerHTML = "mondhatni remek";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
  // from here on, only care once you've stood and opp is done drawing
  else if (stood && opp_points === me_points) {
    mizu.innerHTML = "nem lehet eldönteni :(";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
  else if (stood && opp_points >= 16 && opp_points < me_points) {
    mizu.innerHTML = "háh";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
  else if (stood && opp_points >= 16 && opp_points > me_points) {
    mizu.innerHTML = "hát ez most így alakult";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  }
}

function clear() {
  // move opponent cards to used pile
  oppCards.forEach(card => {
    if (hasCard(card)) {
      pushToUsed(card.getAttribute("src"));
      clearCard(card);
    }
  });
  // move my cards to used pile
  myCards.forEach(card => {
    if (hasCard(card)) {
      pushToUsed(card.getAttribute("src"));
      clearCard(card);
    }
  });
  me_points  = 0;
  opp_points = 0;
  my_pointer.innerHTML  = me_points;
  opp_pointer.innerHTML = opp_points;
  stood = false;
  mizu.innerHTML = "";
}

// you hit
function hitme() {
  if (stood || me_points >= 21) return;
  const nextMySlot = myCards.find(c => !hasCard(c));
  if (!nextMySlot) return;
  const newCard = draw();
  setCard(nextMySlot, newCard);
  me_points += valuate(newCard);
  my_pointer.innerHTML = me_points;
  checkStatus();
}

// draw once, or (if loop=true) draw until opp_points >= 16 or no slot left
function drawopponent(loop = false) {
  do {
    if (opp_points >= 16) break;
    const nextOppSlot = oppCards.find(c => !hasCard(c));
    if (!nextOppSlot) break;
    const newCard = draw();
    setCard(nextOppSlot, newCard);
    opp_points += valuate(newCard);
  } while (loop && opp_points < 16);

  opp_pointer.innerHTML = opp_points;
}

function valuate(cardsrc) {
  if (!cardsrc) { throw new Error("valuate(): no card value for src = " + cardsrc); }
  if (
    cardsrc.includes("queen") ||
    cardsrc.includes("jack")  ||
    cardsrc.includes("king")  ||
    cardsrc.includes("-10")
  ) {
    return 10;
  }
  if (cardsrc.includes("ace")) {
    return 11;
  }
  for (let i = 2; i <= 9; i++) {
    if (cardsrc.includes(`-${i}.`)) {
      return i;
    }
  }
  throw new Error("valuate(): unknown card value for src = " + cardsrc);
}

