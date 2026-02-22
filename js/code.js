// ---------------- deck draw ----------------

function draw() {
  if (deck.length === 0) {
    deck = getcardpack(cardPack); // reshuffle using current pack
    usedPile = [];
  }
  const index = Math.floor(Math.random() * deck.length);
  const card = deck[index];
  deck.splice(index, 1);      //removes drawn card from deck
  return card;
}

// how many aces are currently counted as 11 in each main hand
let me_aces = 0;
let opp_aces = 0;

// ---------------- ace-aware helpers ----------------

function addCardToMe(cardsrc) {
  if (!cardsrc) {
    throw new Error("addCardToMe(): no card src");
  }
  if (cardsrc.includes("ace")) {
    me_aces++;
  }
  me_points += valuate(cardsrc);
  // downgrade aces from 11 -> 1 if we bust
  while (me_points > 21 && me_aces > 0) {
    me_points -= 10;
    me_aces--;
  }
}

function addCardToOpp(cardsrc) {
  if (!cardsrc) {
    throw new Error("addCardToOpp(): no card src");
  }
  if (cardsrc.includes("ace")) {
    opp_aces++;
  }
  opp_points += valuate(cardsrc);
  // downgrade aces from 11 -> 1 if dealer busts
  while (opp_points > 21 && opp_aces > 0) {
    opp_points -= 10;
    opp_aces--;
  }
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
    addCardToMe(newCard);
    my_pointer.innerHTML = formatHand(me_points, me_aces);
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
    setTimeout(drawopponent, 1000);   // wait a sec before dealer starts drawing
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
  me_aces = 0;
  opp_aces = 0;

  // you: first card
  let me1 = draw();
  setCard(card_one_me, me1);
  addCardToMe(me1);

  // opp: first card
  opp1 = draw();
  hidden = opp1;
  setCard(card_one_opp, `assets/${cardPack}/card-back.${cardExt}`);
  addCardToOpp(opp1);

  // you: second card
  //me2 = me1; // TESTING: always a pair so you can spam split
  me2 = draw();
  setCard(card_two_me, me2);
  addCardToMe(me2);

  // opp: second card
  opp2 = draw();
  setCard(card_two_opp, opp2);
  addCardToOpp(opp2);

  my_pointer.innerHTML = formatHand(me_points, me_aces);
  opp_pointer.innerHTML = formatHand(opp_points, opp_aces);


  if(opp_points === 21) {
    setCard(card_one_opp, opp1); // reveal hole card immediately if opp has blackjack
    mizu.innerHTML = "fekete jakab";
  }
  else if(me_points === 21) {
    mizu.innerHTML = "fekete jakab";
  }
  
  checkStatus();

  // after you dealt me1 and me2 in firstdeal()
  if (type(me1) === type(me2)) {
    splitsetup(me1, me2);             //split.js
  } else {
    bakelit.onclick = null;
  }
}

function checkStatus() {
  if (isSplit) return; // split mode handles its own outcomes in split.js
  if (opp_points === 21) {
    mizu.innerHTML = "gatya";
    setTimeout(() => {
      clear();
      firstdeal();
    }, 2000);
  } else if (me_points === 21) {
    mizu.innerHTML = "az se rossz";
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
function drawopponent() {
  // ---- STOP CONDITIONS ----
  if (opp_points >= 16) {
    opp_pointer.innerHTML = formatHand(opp_points, opp_aces);
    checkStatus();
    return;
  }

  const nextOppSlot = oppCards.find(c => !hasCard(c));
  if (!nextOppSlot) {
    opp_pointer.innerHTML = formatHand(opp_points, opp_aces);
    checkStatus();
    return;
  }

  // ---- DRAW ONE CARD ----
  const newCard = draw();
  setCard(nextOppSlot, newCard);
  addCardToOpp(newCard);
  opp_pointer.innerHTML = formatHand(opp_points, opp_aces);

  // ---- WAIT, THEN CONTINUE ----
  setTimeout(drawopponent, 1000);   // dealer speed
}

// ---------------- display formatter for soft/hard hands ----------------

function formatHand(points, aces) {
  const hard = points - 10 * aces;  // all aces treated as 1

  // If we still have aces counted as 11, totals differ, and it's not bust,
  // show both, e.g. "7 / 17"
  if (aces > 0 && points !== hard && points <= 21) {
    return hard + " / " + points;
  } else {
    return String(points);
  }
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