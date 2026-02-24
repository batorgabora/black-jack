// ---------------- helpers for <img> slots ----------------
function hasCard(img) {
  return !!img.getAttribute("src");     //if there is something true, otherwise false
}
function clearCard(img) {
  setCard(img, "");
}
function setCard(img, src) {
  img.setAttribute("src", src);
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

  me_points = 0;
  opp_points = 0;
  my_pointer.innerHTML = me_points;
  opp_pointer.innerHTML = opp_points;
  stood = false;
  mizu.innerHTML = "";

  // kill leftover split state
  isSplit = false;
  activeHand = 0;

  // (optional) also reset splitHands if you want them clean:
  if (typeof splitHands !== "undefined") {
    splitHands.forEach(h => {
      h.score = 0;
      h.stood = false;
    });
  }
}

// update one used slot
function syncUsedSlot(img, src) {           //visualizes used pile
  if (!src) {
    clearCard(img);
    img.style.opacity   = "0";
    img.style.boxShadow = "none";
  } else {
    setCard(img, src);
    img.style.opacity   = "1";
    img.style.boxShadow = ""; // let .cards apply its own shadow
  }
}
// sync usedPile -> used_* images
function syncUsedImages() {                 //does it for each visible element in the slot (just 4)
  syncUsedSlot(used_one,   usedPile[0]);
  syncUsedSlot(used_two,   usedPile[1]);
  syncUsedSlot(used_three, usedPile[2]);
  syncUsedSlot(used_four,  usedPile[3]);
  syncUsedSlot(used_five,  usedPile[4]);
}

// used pile: newest card on top (used_one)
function pushToUsed(src) {
  if (!src) return;
  usedPile.unshift(src);
  if (usedPile.length > 5) {
    usedPile.length = 5;
  }
  syncUsedImages();
}
