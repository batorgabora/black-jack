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

  //Hearts
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

let deck = [...cardImages];



const card_one_me   = document.getElementById("card_one_me");
const card_two_me   = document.getElementById("card_two_me");
const card_three_me = document.getElementById("card_three_me");
const card_four_me  = document.getElementById("card_four_me");

const card_one_opp   = document.getElementById("card_one_opp");
const card_two_opp   = document.getElementById("card_two_opp");
const card_three_opp = document.getElementById("card_three_opp");
const card_four_opp  = document.getElementById("card_four_opp");

const used_one   = document.getElementById("used_one");
const used_two   = document.getElementById("used_two");
const used_three = document.getElementById("used_three");
const used_four  = document.getElementById("used_four");

const new_one   = document.getElementById("new_one");
const new_two   = document.getElementById("new_two");
const new_three = document.getElementById("new_three");
const new_four  = document.getElementById("new_four");

// clear everything at start
[
  card_one_me, card_two_me, card_three_me, card_four_me,
  card_one_opp, card_two_opp, card_three_opp, card_four_opp,
  used_one, used_two, used_three, used_four,
  new_one, new_two, new_three, new_four
].forEach(el => el.src = "");


function draw() {
  if (deck.length === 0) {
    // no cards left – optional: reshuffle
    // deck = [...cardImages];
    // or just return null
    return null;
  }
  const index = Math.floor(Math.random() * deck.length);
  const card = deck[index];
  deck.splice(index, 1); // remove this card from deck
  return card;
}

function firstdeal() {
  card_one_me.src   = draw();
  card_two_me.src   = draw();
  card_one_opp.src  = draw();
  card_two_opp.src  = draw();

  // if you want, you can also immediately fill used/new piles later with drawCard()
  // used_one.src = drawCard();
  // new_one.src  = drawCard();
}

// run immediately (since script is loaded with defer)
firstdeal();