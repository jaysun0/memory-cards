import state, { startGame } from '../state.js';
import { openGallery } from '../gallery/gallery.js';
import { closeMenu } from '../menu/menu.js';
import { changeLevel } from '../cards/cards.js';
import changeLanguage from '../languages/languages.js';
import { levelMessagesRU, levelMessagesEN } from './level-messages.js';

const messageContainer = document.querySelector('.message__container');
const messageControlsStart = document.querySelector('.message__controls_start');
const messageControlsLanguages = document.querySelector('.message__controls_languages');
const messageControlsLevelNext = document.querySelector('.message__controls_level-next');
const messageControlsLevelStop = document.querySelector('.message__controls_level-stop');
const messageControlsClose = document.querySelector('.message__controls_close');


function showMessage(text, title = 'System message', type) {
    const messageText = document.querySelector('.message__text');
    const messageTitle = document.querySelector('.message__title');

    closeMenu();
    messageContainer.classList.remove('hidden');
    messageText.innerHTML = text;
    messageTitle.textContent = title;

    switch(type) {
        case 'languages':
            messageControlsLanguages.classList.remove('hidden');
            break;
        case 'level-next':
            if (state.level !== 5) messageControlsLevelNext.classList.remove('hidden');
            messageControlsClose.classList.remove('hidden');
            break;
        case 'level-stop':
            messageControlsLevelStop.classList.remove('hidden');
            messageControlsClose.classList.remove('hidden');
            break;
        case 'start':
            messageControlsStart.classList.remove('hidden');
            break;
        default:
            messageControlsClose.classList.remove('hidden');
    }
}

function closeMessage() {
    messageContainer.classList.add('hidden');
    messageControlsLevelNext.classList.add('hidden');
    messageControlsLevelStop.classList.add('hidden');
    messageControlsClose.classList.add('hidden');
}

function showLevelMessage() {
    let text, title;
    const messages = state.language === 'en' ? levelMessagesEN : levelMessagesRU;
    const message = messages[state.level];
    showMessage(message.text, message.title, 'level-next');
}


function closeAndStart() {
    closeMessage();
    startGame();
}


const messageBtnEN = document.querySelector('.message__btn_en');
messageBtnEN.addEventListener('click', () => {
    messageControlsLanguages.classList.add('hidden');
    showMessage(`Click "start" when you'll be ready to find similar card-pairs! <br><br> Be careful - you got only 8 seconds????`, 'Welcome!', 'start');
});


const messageBtnRU = document.querySelector('.message__btn_ru');
messageBtnRU.addEventListener('click', () => {
    messageControlsLanguages.classList.add('hidden');
    changeLanguage();
    showMessage(`?????????????? ?????????? ?????????? ???????????? ?????????? ?????????? ???????? ???????????????????? ????????????????! <br><br> ???????? ??????????????????, ?? ???????? ???????? ???? ?????? ?????????? ???????? 8 ????????????????`, '????????????!', 'start');
});


const messageBtnStart = document.querySelector('.message__btn_start');
messageBtnStart.addEventListener('click', () => {
    messageControlsStart.classList.add('hidden');
    closeAndStart();
});


const messageBtnClose = document.querySelector('.message__btn_close');
messageBtnClose.addEventListener('click', closeMessage);

const messageBtnOpenGallery = document.querySelector('.message__btn_open-gallery');
messageBtnOpenGallery.addEventListener('click', () => {
    closeMessage();
    openGallery();
});


const messageBtnRetry = document.querySelector('.message__btn_retry');
messageBtnRetry.addEventListener('click', closeAndStart);


const messageBtnNextLevel = document.querySelector('.message__btn_level-next');
messageBtnNextLevel.addEventListener('click', () => {
    changeLevel();
    closeAndStart();
});



export {
    showLevelMessage,
    showMessage,
};