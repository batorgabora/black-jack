Script
const cardImages = [
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

const questions=[
    "Will the card be Red or Black?",
    "Will the card's value be Higher or Lower",
    "Will the card fall between or outside the values of your first two cards",
    "Guess the suit  of your fourth card",
];


const counter = document.getElementById("counter");
counter.innerHTML = "get out you fucker";
