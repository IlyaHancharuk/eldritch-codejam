import ancients from "../assets/Ancients/index.js"
import blueCardsAssets from "../assets/MythicCards/blue/index.js"
import brownCardsAssets from "../assets/MythicCards/brown/index.js"
import greenCardsAssets from "../assets/MythicCards/green/index.js"
import ancientsData from "../data/ancients.js"
import cardsBlueData from "../data/mythicCards/blue/index.js"
import cardsBrownData from "../data/mythicCards/brown/index.js"
import cardsGreenData from "../data/mythicCards/green/index.js"

const azat = document.getElementById('azathoth')
const cthu = document.getElementById('cthulthu')
const iog = document.getElementById('iogSothoth')
const shub = document.getElementById('shubNiggurath')

let blue
let brown
let green
let stage1
let stage2
let stage3
let ancientNum
let sumBlueCards
let sumBrownCards
let sumGreenCards
let mythicDeck

function getPacking() {
    blue = []
    brown = []
    green = []
    stage1 = []
    stage2 = []
    stage3 = []

    sumBlueCards = ancientsData[ancientNum].firstStage.blueCards + ancientsData[ancientNum].secondStage.blueCards + ancientsData[ancientNum].thirdStage.blueCards
    sumBrownCards = ancientsData[ancientNum].firstStage.brownCards + ancientsData[ancientNum].secondStage.brownCards + ancientsData[ancientNum].thirdStage.brownCards
    sumGreenCards = ancientsData[ancientNum].firstStage.greenCards + ancientsData[ancientNum].secondStage.greenCards + ancientsData[ancientNum].thirdStage.greenCards

    function getPackingColorsDeck(cardsColorData, sumColorCards, colorDeck) {
        let i = 0
        while (i < sumColorCards) {
            let randomNum = Math.floor(Math.random() * cardsColorData.length)
            colorDeck.push(cardsColorData.splice(randomNum, 1))
            i++
        }
    }

    getPackingColorsDeck(cardsBlueData, sumBlueCards, blue)
    getPackingColorsDeck(cardsBrownData, sumBrownCards, brown)
    getPackingColorsDeck(cardsGreenData, sumGreenCards, green)

    function getStage(stage) {
        let j = 0
        let k = 0
        let l = 0
        let stageDeck = []
        while (j < ancientsData[ancientNum][stage].blueCards) {
            stageDeck.push(blue.splice(0, 1))
            j++
        }
        while (k < ancientsData[ancientNum][stage].brownCards) {
            stageDeck.push(brown.splice(0, 1))
            k++
        }
        while (l < ancientsData[ancientNum][stage].greenCards) {
            stageDeck.push(green.splice(0, 1))
            l++
        }
        return stageDeck.flat(2)
    }

    stage1 = getStage('firstStage')
    stage2 = getStage('secondStage')
    stage3 = getStage('thirdStage')

    //  Тасование Фишера — Йетса
    function shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    shuffle(stage1)
    shuffle(stage2)
    shuffle(stage3)
    
    mythicDeck = stage1.concat(stage2, stage3)

    console.log(`sumBlueCards = ${sumBlueCards}`);
    console.log(`sumBrownCards = ${sumBrownCards}`);
    console.log(`sumGreenCards = ${sumGreenCards}`);
    console.log(`ancientNum = ${ancientNum}`);
    console.log(cardsBlueData)
    console.log(blue);
    console.log(cardsBrownData)
    console.log(brown);
    console.log(cardsGreenData);
    console.log(green);
    console.log(stage1);
    console.log(stage2);
    console.log(stage3);
    console.log(mythicDeck);
    console.log(mythicDeck[0].cardFace);
}
//-------------------------------------------------------------------------


let count = 0
function getViewCard() {
    if (count < mythicDeck.length - 1 ) {
        document.querySelector('.last-card').style.backgroundImage = `url(.${mythicDeck[count].cardFace})`
        console.log(count);
        console.log(mythicDeck.length);
        console.log(mythicDeck[count].cardFace);
        count++
    } else if (count === mythicDeck.length - 1) {
        document.querySelector('.last-card').style.backgroundImage = `url(.${mythicDeck[count].cardFace})`
        document.querySelector('.deck').style.display = 'none'
        document.querySelector('.reset-btn').classList.add('visible-reset')
    }
}

azat.addEventListener('click', function() {
    azat.classList.add('active')
    cthu.classList.remove('active')
    iog.classList.remove('active')
    shub.classList.remove('active')
    document.getElementById('btn').style.visibility = 'visible'
    ancientNum = 0
})

cthu.addEventListener('click', function() {
    cthu.classList.add('active')
    azat.classList.remove('active')
    iog.classList.remove('active')
    shub.classList.remove('active')
    document.getElementById('btn').style.visibility = 'visible'
    ancientNum = 1
})

iog.addEventListener('click', function() {
    iog.classList.add('active')
    azat.classList.remove('active')
    cthu.classList.remove('active')
    shub.classList.remove('active')
    document.getElementById('btn').style.visibility = 'visible'
    ancientNum = 2
})

shub.addEventListener('click', function() {
    shub.classList.add('active')
    azat.classList.remove('active')
    cthu.classList.remove('active')
    iog.classList.remove('active')
    document.getElementById('btn').style.visibility = 'visible'
    ancientNum = 3
})

document.getElementById('btn').addEventListener('click', function() {
    getPacking()
    document.querySelector('.deck').classList.add('visible')
    document.getElementById('btn').disabled = true
})
document.querySelector('.deck').addEventListener('click', getViewCard)
document.querySelector('.reset-btn').addEventListener('click', function() {
    location.reload()
})





