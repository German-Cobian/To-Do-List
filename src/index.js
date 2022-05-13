import './style.css';
import {
  activities,
  loadActivitiesList,
  assignIndexToActivity,
  updateCheckboxStatus,
  editActivityDescription,
  repopulateList,
} from './functionalities';
import {
  dragstart, dragover, dragleave, drop, dragend,
} from './drag-and-drop';

const activitiesList = () => {
  loadActivitiesList();
  const ul = document.querySelector('ul'); // ft-3

  // Section with heading and refresh
  const heading = () => {
    const li = document.createElement('li');
    li.id = 'list-heading';
    const h3 = document.createElement('h3');
    h3.textContent = 'Today\'s To Do';
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-sync-alt');
    i.id = 'refresh-icon';
    i.addEventListener('click', () => { // ft-3
      window.location.reload();
    });

    li.appendChild(h3);
    li.appendChild(i);

    return li;
  };

  // Section that displays activities
  const renderList = (activity) => {
    const li = document.createElement('li');
    li.classList.add('draggable'); // ft-4
    li.classList.add('listItems'); // ft-3
    li.setAttribute('activity', activity.index); // ft-3
    li.draggable = true; // ft-4

    const div = document.createElement('div');

    const input = document.createElement('input');
    input.classList.add('completed');
    input.type = 'checkbox';
    input.name = 'completed';
    input.checked = activity.completed;
    input.addEventListener('click', () => updateCheckboxStatus(parseInt(li.getAttribute('activity'), 10), input.checked)); // ft-2 modify on ft-3

    const p = document.createElement('p');
    p.classList.add('description');
    p.contentEditable = 'true'; // ft 3
    p.textContent = activity.description;
    p.addEventListener('input', () => editActivityDescription(parseInt(li.getAttribute('activity'), 10), p.textContent)); // ft 3

    div.appendChild(input);
    div.appendChild(p);
    li.appendChild(div);

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-ellipsis-v');
    // This functionality added in ft-3
    i.addEventListener('click', () => {
      ul.removeChild(li);
      localStorage.clear();

      repopulateList();
    });

    // Event listeners for drag and drop functionality
    li.addEventListener('dragstart', () => dragstart(li));
    li.addEventListener('dragover', (e) => dragover(li, e));
    li.addEventListener('dragleave', () => dragleave(li));
    li.addEventListener('drop', () => {
      drop(li);
    });
    li.addEventListener('dragend', () => {
      dragend(li);
    });

    li.appendChild(i);

    return li;
  };

  // Section where activities are inputed
  const addActivity = () => {
    const li = document.createElement('li');
    li.id = 'new-activities';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add to your list...';
    input.id = 'list-item';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        assignIndexToActivity(input.value);
        ul.appendChild(renderList(activities[activities.length - 1]));

        // Fixes Clear all completed section to the bottom of the pages
        const clear = document.getElementById('clear');
        ul.appendChild(clear);

        input.value = '';
      }
    });

    li.appendChild(input);

    return li;
  };

  // Section to clear all completed activies
  const clearCompleted = () => {
    const li = document.createElement('li');

    li.textContent = 'Clear all completed';
    li.id = 'clear';

    li.addEventListener('click', () => {
      const draggables = [...document.querySelectorAll('.draggable')];

      const incompleteActivities = draggables.filter((draggable) => draggable.getElementsByClassName('completed')[0].checked === false);

      draggables.forEach((draggable) => ul.removeChild(draggable)); 

      incompleteActivities.forEach((item) => ul.appendChild(item));

      localStorage.clear();

      repopulateList();

      // Fixes Clear all completed section to the bottom of the pages
      const clear = document.getElementById('clear');
      ul.appendChild(clear);
    });

    return li;
  };

  ul.appendChild(heading());
  ul.appendChild(addActivity());

  activities.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  activities.forEach((activity) => ul.appendChild(renderList(activity)));

  ul.appendChild(clearCompleted());
};

activitiesList();
