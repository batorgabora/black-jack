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
const myCards = [
  card_one_me,
  card_two_me,
  card_three_me,
  card_four_me,
  card_five_me,
  card_six_me,
  card_seven_me,
  card_eight_me
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

let splitted = false;
let activeHand = 0;  // 0 = left hand, 1 = right hand

const splitHands = [
  { slots: [card_one_me, card_two_me, card_three_me, card_four_me], score: 0, stood: false },
  { slots: [card_five_me, card_six_me, card_seven_me, card_eight_me], score: 0, stood: false }
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
