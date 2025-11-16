// ---------------- deck draw ----------------

function draw() {
  if (deck.length === 0) {
    deck = [...cardimages];                           //if there is to draw, draws, if not reshuffles
    usedPile = [];
  }
  const index = Math.floor(Math.random() * deck.length);
  const card  = deck[index];
  deck.splice(index, 1);                              //removes drawn card from deck
  return card;
}

// ---------------- game start ----------------
firstdeal();

// HIT: you draw one, opponent maybe draws one
faszmano.addEventListener("click", function() {
  if (stood) return;                  // can't hit after standing
  hitme();
  checkStatus();                      //is there a winner?
});

// STAND: opponent finishes their whole turn
polaroid.addEventListener("click", function() {
  if (stood) return;
  stood = true;
  setCard(card_one_opp, hidden)             //reveals opponent's first card
  setTimeout(() => {
    drawopponent(true);                     //opponent draws (if he can, check function to see)
    checkStatus();                          //who is the winner
  }, 2500);
});

// ---------------- main logic ----------------

function firstdeal() {
  stood = false;
  mizu.innerHTML = "";

  clear();

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
  if (!nextMySlot) return;                              //checks if there is a next slot (5 available now)
  const newCard = draw();
  setCard(nextMySlot, newCard);
  me_points += valuate(newCard);
  my_pointer.innerHTML = me_points;
  checkStatus();
}

// draw once, or (if loop=true) draw until opp_points >= 16 or no slot left but only second option is what ewe need actually (check polaroid button)
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

