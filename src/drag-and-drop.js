import {
  repopulateList,
} from './functionalities';

// Section relating to drag and drop functionality
const dragstart = (element) => {
  element.classList.add('skateover');
};

const dragover = (element, e) => {
  e.preventDefault();
  element.classList.add('dragover');
};

const dragleave = (element) => {
  element.classList.remove('dragover');
};

const drop = (element) => {
  const skateover = document.querySelector('.skateover');
  element.before(skateover);

  repopulateList();
  element.classList.remove('dragover');
};

const dragend = (element) => {
  element.classList.remove('skateover');
};

export {
  dragstart, dragover, dragleave, drop, dragend,
};
