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
}

// used pile: newest card on top (used_one)
function pushToUsed(src) {
  if (!src) return;
  usedPile.unshift(src);
  if (usedPile.length > 4) {
    usedPile.length = 4;
  }
  syncUsedImages();
}
