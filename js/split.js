function splitsetup(me1, me2) {
  bakelit.classList.add("can-split");
  bakelit.onclick = () => startSplit(me1, me2);
}

function startSplit(me1, me2) {
  if (isSplit) return; // safety: don't split twice in same hand

  bakelit.classList.remove("can-split");
  isSplit = true;
  activeHand = 0;
  flexy.classList.add("split-mode");

  // reset split hand state
  splitHands.forEach(h => {
    h.score = 0;
    h.stood = false;
    h.aces = 0;
  });

  // LEFT HAND: keep first card on card_one_me
  addCardToSplitHand(splitHands[0], me1);
  // LEFT HAND slots: [1,2,3,4,5] (set in declaration.js)

  // RIGHT HAND: move the second card to card_six_me (start of right hand 6–10)
  clearCard(card_two_me);
  setCard(card_six_me, me2);
  addCardToSplitHand(splitHands[1], me2);
  // RIGHT HAND slots: [6,7,8,9,10] (set in declaration.js)

  // draw one extra card for each hand
  const extra1 = draw();
  setCard(card_two_me, extra1);   // left extra on slot 2
  addCardToSplitHand(splitHands[0], extra1);

  const extra2 = draw();
  setCard(card_seven_me, extra2);   // right extra on slot 7
  addCardToSplitHand(splitHands[1], extra2);

  showsplittedstate();

  // visuals for "hand 1 is active"
  faszmano.classList.add("split-first");
  polaroid.classList.add("split-first");
  faszmano.classList.remove("split-second");
  polaroid.classList.remove("split-second");

  // don't allow pressing split again in this round
  bakelit.onclick = null;
}

function showsplittedstate() {
  const leftDisplay  = formatSplitHand(splitHands[0]);
  const rightDisplay = formatSplitHand(splitHands[1]);
  my_pointer.innerHTML = leftDisplay + " | " + rightDisplay;
}

/* hitme() split branch */
function hitsplit() {
  const hand = splitHands[activeHand]; // looks at active hand (0 or 1)
  if (hand.stood || hand.score >= 21) return;

  const nextSlot = hand.slots.find(c => !hasCard(c));
  if (!nextSlot) return; // no more space on this hand

  const newCard = draw();
  setCard(nextSlot, newCard);
  addCardToSplitHand(hand, newCard);

  showsplittedstate();
  splitstatusforhand();
}

function addCardToSplitHand(hand, cardsrc) {
  if (!cardsrc) {
    throw new Error("addCardToSplitHand(): no card src");
  }

  if (cardsrc.includes("ace")) {
    hand.aces = (hand.aces || 0) + 1;
  }

  hand.score += valuate(cardsrc);

  // downgrade aces if this hand would bust
  while (hand.score > 21 && hand.aces > 0) {
    hand.score -= 10;
    hand.aces--;
  }
}

function formatSplitHand(hand) {
  return formatHand(hand.score, hand.aces || 0);
}

function splitstatusforhand() {
  const hand = splitHands[activeHand];

  if (hand.score > 21 || hand.score === 21) {
    // bust or 21: this hand automatically stands, move on
    hand.stood = true;
    switchsplittedhands();
  }
}

function switchsplittedhands() {
  // If there is another hand not stood yet, switch to it
  if (activeHand === 0 && !splitHands[1].stood) {
    activeHand = 1;
    faszmano.classList.remove("split-first");
    polaroid.classList.remove("split-first");
    faszmano.classList.add("split-second");
    polaroid.classList.add("split-second");
    return;
  }

  // Otherwise both hands done → dealer's turn once
  stood = true;
  faszmano.classList.remove("split-first", "split-second");
  polaroid.classList.remove("split-first", "split-second");

  setCard(card_one_opp, hidden);
  setTimeout(() => {
    drawopponent(true);
    splittedoutcomes();
  }, 2000);
}

function handresult(score) {
  // result of ONE hand vs dealer
  if (score > 21) return "bust";
  if (opp_points > 21) return "win";
  if (score > opp_points) return "win";
  if (score < opp_points) return "lose";
  return "push";
}

function splittedoutcomes() {
  const leftScore = splitHands[0].score;
  const rightScore = splitHands[1].score;

  const left = handresult(leftScore);
  const right = handresult(rightScore);

  let msg = "";

  if (left === "win" && right === "win") {
    msg = "sima liba";
  } else if (left === "lose" && right === "lose") {
    msg = "teljesen kampó";
  } else if (left === "win" && right === "lose") {
    msg = "bal ott volt, jobb gatya";
  } else if (left === "lose" && right === "win") {
    msg = "bal gatya, jobb ott volt";
  } else if (left === "bust" && right === "bust") {
    msg = "mindkét kéz túlment";
  } else if (left === "bust" || right === "bust") {
    msg = "az egyik kéz túlment";
  } else {
    msg = "valami mizéria";
  }

  mizu.innerHTML = msg;

  setTimeout(() => {
    clear();
    firstdeal();
  }, 2000);
}