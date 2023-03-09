import state, {setLevelState, startGame} from '../state.js';
import { showLevelMessage } from '../message/message.js';
import { openGallery } from '../gallery/gallery.js';
import { closeMenu, showMenuBtnGallery } from '../menu/menu.js';

function shuffleArray(array) {
    let randomIndex, currentIndex = array.length;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex--);
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}


function createCardElement(cardNumber) {
    const card = document.createElement('div');
    card.classList.add('card', 'main__card');
    card.id = `card-${cardNumber}`;
    card.innerHTML =
        '<div class="card__front"></div>' +
        '<div class="card__back">' +
        '   <img class="card__img" src="" alt="card image">' +
        '</div>';

    return card;
}


function setupImages() {
    shuffleArray(state.imagesSources.compressed);

    const imgElements = document.querySelectorAll('.card__img');
    if (imgElements.length < state.cards.totalNumber) {
        const cardsContainer = document.querySelector('.main__wrapper_cards');
        let number = imgElements.length;
        while(number < state.cards.totalNumber) cardsContainer.append(createCardElement(number++));
    }

    imgElements.forEach((img, ind) => img.setAttribute('src', state.imagesSources.compressed[ind]));
    removeCardsHoverEffect();
}


function createImageSources() {
    state.imagesSources.original = [];
    state.imagesSources.compressed = [];

    for (let i = 0; i < (state.cards.totalNumber / 2); i++) {
        state.imagesSources.original.push(`../assets/img/${i + 1}.jpg`);
        state.imagesSources.compressed.push(`../assets/img/compressed/${i + 1}.jpg`);
        state.imagesSources.compressed.push(`../assets/img/compressed/${i + 1}.jpg`);
    }
    setupImages();
}


function closeCard() {
    if (state.cards.openedCard) {
        state.cards.openedNumber--;
        state.cards.openedCard.classList.remove('visible');
    }
}

function closeAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('visible'));
}


function addCardsHoverEffect() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('card-for-winner'));
}
function removeCardsHoverEffect() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('card-for-winner'));
}


function checkOpenedCard(card) {
    const cardImg = card.querySelector('img');

    if (state.cards.openedCard) {
        if (state.cards.openedCardSrc !== cardImg.src) {
            closeCard();
            state.cards.openedCardSrc = cardImg.src;
            state.cards.openedCard = card;
        } else {
            state.cards.openedCard = null;
            state.cards.openedCardSrc = null;
        }
    } else {
        state.cards.openedCardSrc = cardImg.src;
        state.cards.openedCard = card;
    }

    if (state.cards.openedNumber >= state.cards.totalNumber) {
        state.allowGame = false;
        clearInterval(state.time.timer);
        showLevelMessage();
        showMenuBtnGallery();
        addCardsHoverEffect();
    }
}


function openCard(card) {
    card.classList.add('visible');
    state.cards.openedNumber++;
    checkOpenedCard(card);
}


function setupCards() {
    createImageSources();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            closeMenu();
            if (state.allowGame && !card.classList.contains('visible')) openCard(card);
            else if(!state.allowGame && state.cards.openedNumber >= state.cards.totalNumber) {
                const cardImgSrc = card.querySelector('img').src;
                const regEx = /\d+(?=\.(jpg|png))/g;
                const number = cardImgSrc.match(regEx)[0];
                openGallery(parseInt(number));
            }
        });
    });
}


function changeLevel(levelNumber) {
    setLevelState(levelNumber);
    setupCards();
    startGame();
}


export {
    setupCards,
    setupImages,
    closeAllCards,
    changeLevel,
};
