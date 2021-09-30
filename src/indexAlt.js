// import './style.css';
import {
  activities, LocalStorageMock, editActivityDescription, updateCheckboxStatus, repopulateList,
} from './tests/functionalitiesMock';

const activitiesList = (activity) => {
  const ul = document.getElementsByTagName('ul');

  const li = document.createElement('li');
  li.classList.add('listItems');
  li.setAttribute('activity', activity.index);

  const div = document.createElement('div');

  const input = document.createElement('input');
  input.classList.add('completed');
  input.type = 'checkbox';
  input.name = 'completed';
  input.addEventListener('click', () => updateCheckboxStatus(parseInt(li.getAttribute('activity'), 10), input.checked));

  const p = document.createElement('p');
  p.classList.add('description');
  p.contentEditable = 'true';
  p.textContent = activity.description;
  p.addEventListener('input', () => editActivityDescription(parseInt(li.getAttribute('activity'), 10), p.textContent));

  div.appendChild(input);
  div.appendChild(p);
  li.appendChild(div);

  const i = document.createElement('i');
  i.classList.add('fas', 'fa-ellipsis-v');
  i.addEventListener('click', () => {
    ul.removeChild(li);
    localStorage.clear();

    repopulateList();
  });

  li.appendChild(i);

  return li;
};

const clearCompleted = (ul) => {
  const listItems = [...document.querySelectorAll('.listItems')];

  const incompleteActivities = listItems.filter((listItem) => listItem.getElementsByClassName('completed')[0].checked === false);

  listItems.forEach((listItem) => ul.removeChild(listItem));

  incompleteActivities.forEach((item) => ul.appendChild(item));

  localStorage.clear();

  repopulateList();
};

const toDoList = () => {
  const ul = document.querySelector('ul');

  activities.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  activities.forEach((activity) => ul.appendChild(activitiesList(activity)));

};
const ls = new LocalStorageMock();

toDoList(ls.loadActivitiesList(activities));

export { toDoList, activitiesList, clearCompleted };