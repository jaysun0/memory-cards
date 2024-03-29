import { levelMessagesRU, levelMessagesEN } from './level-messages.js';
import changeLanguage from '../languages/languages.js';
import { closeMenu, playSound} from '../menu/menu.js';
import { openGallery } from '../gallery/gallery.js';
import { changeLevel } from '../cards/cards.js';
import state, { startGame } from '../state.js';


const messageContainer = document.querySelector('.message__container');
const messageControlsStart = document.querySelector('.message__controls_start');
const messageControlsLanguages = document.querySelector('.message__controls_languages');
const messageControlsLevelNext = document.querySelector('.message__controls_level-next');
const messageControlsLevelStop = document.querySelector('.message__controls_level-stop');
const messageControlsContacts = document.querySelector('.message__controls_contacts');
const messageControlsClose = document.querySelector('.message__controls_close');


function closeMessage() {
    messageContainer.classList.add('hidden');
    messageControlsLevelNext.classList.add('hidden');
    messageControlsLevelStop.classList.add('hidden');
    messageControlsContacts.classList.add('hidden');
    messageControlsClose.classList.add('hidden');
}


function showMessage(text, title, type) {
    closeMenu();
    closeMessage();

    const message = document.querySelector('.message');
    message.style.top = `calc(${scrollY}px + 50%)`;
    
    if (!title) title = state.language === 'en' ? 'System message' : 'Системное сообщение';

    const messageText = document.querySelector('.message__text');
    const messageTitle = document.querySelector('.message__title');
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
        case 'contacts':
            messageControlsContacts.classList.remove('hidden');
            messageControlsClose.classList.remove('hidden');
            break;
        default:
            messageControlsClose.classList.remove('hidden');
    }
}


function showLevelMessage() {
    const messages = state.language === 'en' ? levelMessagesEN : levelMessagesRU;
    const message = messages[state.level - 1];
    showMessage(message.text, message.title, 'level-next');

    if (state.level === 5) {
        const victorySound = document.getElementById('sound__victory');
        playSound(victorySound);
        messageControlsContacts.classList.remove('hidden');
    } else {
        const levelFinishSound = document.getElementById('sound__level-finish');
        playSound(levelFinishSound);
    }
}


function closeAndStart() {
    closeMessage();
    startGame();
}


const messageBtnEN = document.querySelector('.message__btn_en');
messageBtnEN.addEventListener('click', () => {
    messageControlsLanguages.classList.add('hidden');
    showMessage(`Click "start" when you'll be ready to find similar card-pairs! <br><br> Be careful - you got only 8 seconds🧐`, 'Welcome!', 'start');
});


const messageBtnRU = document.querySelector('.message__btn_ru');
messageBtnRU.addEventListener('click', () => {
    messageControlsLanguages.classList.add('hidden');
    changeLanguage();
    showMessage(`Нажимай старт когда будешь готов найти пары одинаковых карточек! <br><br> Будь осторожен, у тебя есть на это всего лишь 8 секунд🧐`, 'Привет!', 'start');
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