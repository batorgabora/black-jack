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
  });

  // LEFT HAND: keep first card on card_one_me
  splitHands[0].score = valuate(me1);
  // LEFT HAND slots: [1,2,3,4] (set in declaration.js)

  // RIGHT HAND: move the second card to card_five_me (start of right hand 5–8)
  clearCard(card_two_me);
  setCard(card_five_me, me2);
  splitHands[1].score = valuate(me2);
  // RIGHT HAND slots: [5,6,7,8] (set in declaration.js)

  // draw one extra card for each hand
  const extra1 = draw();
  setCard(card_two_me, extra1);   // left extra on slot 2
  splitHands[0].score += valuate(extra1);

  const extra2 = draw();
  setCard(card_six_me, extra2);   // right extra on slot 6
  splitHands[1].score += valuate(extra2);

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
  my_pointer.innerHTML =
    splitHands[0].score + " | " + splitHands[1].score;
}

/* hitme() split branch */
function hitsplit() {
  const hand = splitHands[activeHand]; // looks at active hand (0 or 1)
  if (hand.stood || hand.score >= 21) return;

  const nextSlot = hand.slots.find(c => !hasCard(c));
  if (!nextSlot) return; // no more space on this hand

  const newCard = draw();
  setCard(nextSlot, newCard);
  hand.score += valuate(newCard);

  showsplittedstate();
  splitstatusforhand();
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
  }, 1500);
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
    msg = "mindkét kéz nyert";
  } else if (left === "lose" && right === "lose") {
    msg = "mindkét kéz bukta";
  } else if (left === "win" && right === "lose") {
    msg = "bal kéz nyert, jobb veszített";
  } else if (left === "lose" && right === "win") {
    msg = "bal kéz veszített, jobb nyert";
  } else if (left === "bust" && right === "bust") {
    msg = "mindkét kéz besokallt";
  } else if (left === "bust" || right === "bust") {
    msg = "az egyik kéz besokallt";
  } else {
    msg = "valami döntetlen mizéria";
  }

  mizu.innerHTML = msg;

  setTimeout(() => {
    clear();
    firstdeal();
  }, 2000);
}