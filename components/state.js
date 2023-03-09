import { closeAllCards, setupImages } from './cards/cards.js';
import { setLevelTimer } from './level-time/level-time.js';
import { hideMenuBtnGallery } from './menu/menu.js';

const state = {
    allowGame: true,
    level: 1,

    imagesSources: {
        original: [],
        compressed: []
    },

    cards: {
        totalNumber: 8,
        openedNumber: 0,
        openedCard: null,
        openedSrc: null,
    },

    time: {
        timer: null,
        levelTime: 8,
    },

    gallery: {
        activeIndicator: 1,
        currentImgNumber: 1,
    }
}

function resetState() {
    state.allowGame = true;
    state.cards.openedNumber = 0;
    state.cards.openedCard = null
    state.cards.openedSrc = null;
}

function startGame() {
    hideMenuBtnGallery()
    closeAllCards();
    resetState();
    setupImages();
    setLevelTimer();
}

function setLevelState(levelNumber) {
    state.level = levelNumber;

    switch(levelNumber) {
        case 2:
            state.cards.totalNumber = 10;
            state.time.levelTime = 10;
            break;
        case 3:
            state.cards.totalNumber = 12;
            state.time.levelTime = 14;
            break;
        case 4:
            state.cards.totalNumber = 16;
            state.time.levelTime = 24;
            break;
        case 5:
            state.cards.totalNumber = 20;
            state.time.levelTime = 30;
            break;
        default:
            state.cards.totalNumber = 8;
            state.time.levelTime = 8;
    }
}

export default state;
export { setLevelState };

export { startGame };