// current card pack
let cardPack = "cards";        // "cards" or "cards-steadman"
let cardExt  = "svg";                   // changes with pack

function getcardpack(pack, extension) {
  const base = `assets/${pack}`;
  cardExt = extension || cardExt;  // use provided extension or default to current cardExt

  return [
    // Clubs
    `${base}/clubs/clubs-2.${cardExt}`,
    `${base}/clubs/clubs-3.${cardExt}`,
    `${base}/clubs/clubs-4.${cardExt}`,
    `${base}/clubs/clubs-5.${cardExt}`,
    `${base}/clubs/clubs-6.${cardExt}`,
    `${base}/clubs/clubs-7.${cardExt}`,
    `${base}/clubs/clubs-8.${cardExt}`,
    `${base}/clubs/clubs-9.${cardExt}`,
    `${base}/clubs/clubs-10.${cardExt}`,
    `${base}/clubs/clubs-ace.${cardExt}`,
    `${base}/clubs/clubs-jack.${cardExt}`,
    `${base}/clubs/clubs-queen.${cardExt}`,
    `${base}/clubs/clubs-king.${cardExt}`,

    // Diamonds
    `${base}/diamonds/diamonds-2.${cardExt}`,
    `${base}/diamonds/diamonds-3.${cardExt}`,
    `${base}/diamonds/diamonds-4.${cardExt}`,
    `${base}/diamonds/diamonds-5.${cardExt}`,
    `${base}/diamonds/diamonds-6.${cardExt}`,
    `${base}/diamonds/diamonds-7.${cardExt}`,
    `${base}/diamonds/diamonds-8.${cardExt}`,
    `${base}/diamonds/diamonds-9.${cardExt}`,
    `${base}/diamonds/diamonds-10.${cardExt}`,
    `${base}/diamonds/diamonds-ace.${cardExt}`,
    `${base}/diamonds/diamonds-jack.${cardExt}`,
    `${base}/diamonds/diamonds-queen.${cardExt}`,
    `${base}/diamonds/diamonds-king.${cardExt}`,

    // Hearts
    `${base}/hearts/hearts-2.${cardExt}`,
    `${base}/hearts/hearts-3.${cardExt}`,
    `${base}/hearts/hearts-4.${cardExt}`,
    `${base}/hearts/hearts-5.${cardExt}`,
    `${base}/hearts/hearts-6.${cardExt}`,
    `${base}/hearts/hearts-7.${cardExt}`,
    `${base}/hearts/hearts-8.${cardExt}`,
    `${base}/hearts/hearts-9.${cardExt}`,
    `${base}/hearts/hearts-10.${cardExt}`,
    `${base}/hearts/hearts-ace.${cardExt}`,
    `${base}/hearts/hearts-jack.${cardExt}`,
    `${base}/hearts/hearts-queen.${cardExt}`,
    `${base}/hearts/hearts-king.${cardExt}`,

    // Spades
    `${base}/spades/spades-2.${cardExt}`,
    `${base}/spades/spades-3.${cardExt}`,
    `${base}/spades/spades-4.${cardExt}`,
    `${base}/spades/spades-5.${cardExt}`,
    `${base}/spades/spades-6.${cardExt}`,
    `${base}/spades/spades-7.${cardExt}`,
    `${base}/spades/spades-8.${cardExt}`,
    `${base}/spades/spades-9.${cardExt}`,
    `${base}/spades/spades-10.${cardExt}`,
    `${base}/spades/spades-ace.${cardExt}`,
    `${base}/spades/spades-jack.${cardExt}`,
    `${base}/spades/spades-queen.${cardExt}`,
    `${base}/spades/spades-king.${cardExt}`,
  ];
}

let deck = getcardpack(cardPack);

let opp_points = 0;
let me_points  = 0;

const my_pointer  = document.getElementById("my_value");
const opp_pointer = document.getElementById("opp_value");

const faszmano = document.getElementById("hitme");
const polaroid = document.getElementById("stand");
const bakelit = document.getElementById("split");
bakelit.style.backgroundImage = "";

const flexy = document.querySelector(".flexy");


let stood = false;

let splittedcounterone = 0;
let splittedcountertwo = 0;

const mizu = document.getElementById("mizu");

const card_one_me   = document.getElementById("card_one_me");
const card_two_me   = document.getElementById("card_two_me");
const card_three_me = document.getElementById("card_three_me");
const card_four_me  = document.getElementById("card_four_me");
const card_five_me  = document.getElementById("card_five_me");
const card_six_me  = document.getElementById("card_six_me");
const card_seven_me  = document.getElementById("card_seven_me");
const card_eight_me  = document.getElementById("card_eight_me");
const card_nine_me  = document.getElementById("card_nine_me");
const card_ten_me  = document.getElementById("card_ten_me");

const myCards = [
  card_one_me,
  card_two_me,
  card_three_me,
  card_four_me,
  card_five_me,
  card_six_me,
  card_seven_me,
  card_eight_me,
  card_nine_me,
  card_ten_me
];

const card_one_opp   = document.getElementById("card_one_opp");
const card_two_opp   = document.getElementById("card_two_opp");
const card_three_opp = document.getElementById("card_three_opp");
const card_four_opp  = document.getElementById("card_four_opp");
const card_five_opp  = document.getElementById("card_five_opp");
const card_six_opp  = document.getElementById("card_six_opp");
const card_seven_opp  = document.getElementById("card_seven_opp");
const card_eight_opp  = document.getElementById("card_eight_opp");
const card_nine_opp  = document.getElementById("card_nine_opp");
const card_ten_opp  = document.getElementById("card_ten_opp");
const oppCards = [
  card_one_opp,
  card_two_opp,
  card_three_opp,
  card_four_opp,
  card_five_opp,
  card_six_opp,
  card_seven_opp,
  card_eight_opp,
  card_nine_opp,
  card_ten_opp
];

const used_one   = document.getElementById("used_one");
const used_two   = document.getElementById("used_two");
const used_three = document.getElementById("used_three");
const used_four  = document.getElementById("used_four");
const used_five  = document.getElementById("used_five");

const new_one   = document.getElementById("new_one");
const new_two   = document.getElementById("new_two");
const new_three = document.getElementById("new_three");
const new_four  = document.getElementById("new_four");

new_one.setAttribute("src", `assets/${cardPack}/card-back.${cardExt}`);
new_two.setAttribute("src", `assets/${cardPack}/card-back.${cardExt}`);
new_three.setAttribute("src", `assets/${cardPack}/card-back.${cardExt}`);
new_four.setAttribute("src", `assets/${cardPack}/card-back.${cardExt}`);

let hidden;

let isSplit = false
let activeHand = 0;  // 0 = left hand, 1 = right hand

splitHands = [
  { score: 0, stood: false, aces: 0, slots: [card_one_me, card_two_me, card_three_me, card_four_me, card_five_me] },
  { score: 0, stood: false, aces: 0, slots: [card_six_me, card_seven_me, card_eight_me, card_nine_me, card_ten_me] }
];

// ---------------- used pile state ----------------

let usedPile = [];

// ---------------- initial clear ----------------

[...myCards, ...oppCards].forEach(clearCard);   //clears everything in the beginning

usedPile = []; 
syncUsedImages();


// the thinker functionality
const jokerCard = document.getElementById('info');
const rulesDiv = document.getElementById('rules');

jokerCard.addEventListener('click', () => {
    rulesDiv.style.display = 'flex';       // when joker clicked set the display to block, which means the rules show up//
});

rulesDiv.addEventListener('click', function() {
  rulesDiv.style.display = 'none';   // close the rules overlay when clicking anywhere on it
});


//deck change functionality
function togglecardpack() {
  clear();


  if (cardPack === "cards") {
    cardPack = "cards_steadman";
    cardExt = "png";
  } else {
    cardPack = "cards";
    cardExt = "svg";
  }

  const back = `assets/${cardPack}/card-back.${cardExt}`;
  // new pile
  new_one.src = back;
  new_two.src = back;
  new_three.src = back;
  new_four.src = back;
  // used pile
  used_one.src = "";
  used_two.src = "";
  used_three.src = "";
  used_four.src = "";
  used_five.src = "";

  deck = getcardpack(cardPack);
  firstdeal();
}