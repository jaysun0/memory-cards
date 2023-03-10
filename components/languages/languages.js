import state from '../state.js';
import nodesToTranslate from './nodes.js';


function changeLanguage(language) {
    if(language) state.language = language;
    else state.language = state.language === 'en' ? 'ru' : 'en';

    localStorage.setItem('language', state.language);
    nodesToTranslate.forEach(node => {
        const element = document.querySelector(`.${node.nodeClassName}`);
        element.textContent = node[state.language];
    });
}


export default changeLanguage;
