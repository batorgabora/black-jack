// ---------------- deck draw ----------------

function draw() {
  if (deck.length === 0) {
    deck = [...cardimages]; // if there is nothing to draw, reshuffle
    usedPile = [];
  }
  const index = Math.floor(Math.random() * deck.length);
  const card = deck[index];
  deck.splice(index, 1); // removes drawn card from deck
  return card;
}

// ---------------- game start ----------------
firstdeal();
// ---------------- game end ----------------



faszmano.addEventListener("click", function () {
  if (stood) return;            // can't hit after standing
  if (!isSplit) {
    // ---- non-split logic ----
    if (stood || me_points >= 21) return;
    const nextMySlot = myCards.find(c => !hasCard(c));
    if (!nextMySlot) return;
    const newCard = draw();
    setCard(nextMySlot, newCard);
    me_points += valuate(newCard);
    my_pointer.innerHTML = me_points;
    checkStatus();
  } 
  else {
    hitsplit();
  }
});

// STAND: opponent finishes their whole turn
polaroid.addEventListener("click", function () {
  if (stood) return;
  if (!isSplit) {
    // ---- normal stand logic ----
    stood = true;
    setCard(card_one_opp, hidden);
    setTimeout(() => {
      drawopponent(true);
      checkStatus();
    }, 2000);
  } else {
    // split mode: only stand current hand
    const hand = splitHands[activeHand];
    hand.stood = true;
    switchsplittedhands();
  }
});

// ---------------- main logic ----------------

function firstdeal() {
  // remove split visuals
  flexy.classList.remove("split-mode");
  faszmano.classList.remove("split-first");
  polaroid.classList.remove("split-first");
  faszmano.classList.remove("split-second");
  polaroid.classList.remove("split-second");

  stood = false;
  mizu.innerHTML = "";

  clear(); // also resets split flags & points

  // just to be extra explicit:
  isSplit = false;
  activeHand = 0;
  bakelit.onclick = null;
  bakelit.classList.remove("can-split");   // vinyl shown as broken by default

  me_points = 0;
  opp_points = 0;

  // you: first card
  let me1 = draw();
  setCard(card_one_me, me1);
  me_points += valuate(me1);

  // opp: first card
  opp1 = draw();
  hidden = opp1;
  setCard(card_one_opp, "assets/cards/card-back.svg");
  opp_points += valuate(opp1);

  // you: second card
  me2 = draw(); // TESTING: always a pair so you can spam split
  // real game later: me2 = draw();
  setCard(card_two_me, me2);
  me_points += valuate(me2);

  // opp: second card
  opp2 = draw();
  setCard(card_two_opp, opp2);
  opp_points += valuate(opp2);

  my_pointer.innerHTML = me_points;
  opp_pointer.innerHTML = opp_points;

  checkStatus();

  // after you dealt me1 and me2 in firstdeal()
  if (type(me1) === type(me2)) {
    splitsetup(me1, me2);
  } else {
    bakelit.onclick = null;
  }
}

function checkStatus() {
  // in split mode, normal status is handled elsewhere
  if (opp_points === 21) {
    mizu.innerHTML = "kapásból gatya";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  } else if (me_points === 21) {
    mizu.innerHTML = "fekete jakab";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 1500);
  } else if (me_points > 21) {
    mizu.innerHTML = "a manóba";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 1500);
  } else if (opp_points > 21) {
    mizu.innerHTML = "addig járt a korsó...";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 1500);
  }
  // from here on, only care once you've stood and opp is done drawing
  else if (stood && opp_points === me_points) {
    mizu.innerHTML = "hát ez ilyen döntetlen";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 1500);
  } else if (stood && opp_points >= 16 && opp_points < me_points) {
    mizu.innerHTML = "bölcs";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 1500);
  } else if (stood && opp_points >= 16 && opp_points > me_points) {
    mizu.innerHTML = "nem adta ki banyek";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 1500);
  }
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
  if (!cardsrc) {
    throw new Error("valuate(): no card value for src = " + cardsrc);
  }
  if (
    cardsrc.includes("queen") ||
    cardsrc.includes("jack") ||
    cardsrc.includes("king")
  ) {
    return 10;
  }
  if (cardsrc.includes("ace")) {
    return 11;
  }
  for (let i = 2; i <= 10; i++) {
    if (cardsrc.includes(`-${i}.`)) {
      return i;
    }
  }
  throw new Error("valuate(): unknown card value for src = " + cardsrc);
}

function type(cardsrc) {
  if (!cardsrc) {
    throw new Error("type(): no card value for src = " + cardsrc);
  }
  if (cardsrc.includes("queen")) return "queen";
  else if (cardsrc.includes("jack")) return "jack";
  else if (cardsrc.includes("king")) return "king";
  else if (cardsrc.includes("ace")) return "ace";
  for (let i = 2; i <= 10; i++) {
    if (cardsrc.includes(`-${i}.`)) {
      return String(i);
    }
  }
  throw new Error("type(): unknown card value for src = " + cardsrc);
}