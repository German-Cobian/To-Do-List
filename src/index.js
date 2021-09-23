import './style.css';
import { activities, loadArchivedActivities, updateCheckboxStatus } from './functionalities';

const activitiesList = () => {
  loadArchivedActivities();

  // Section with heading and refresh
  const heading = () => {
    const li = document.createElement('li');
    li.id = 'list-heading';
    const h3 = document.createElement('h3');
    h3.textContent = 'Today\'s To Do';
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-sync-alt');
    i.id = 'refresh-icon';

    li.appendChild(h3);
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

    li.appendChild(input);

    return li;
  };

  // Section that displays activities
  const renderList = (activity) => {
    const li = document.createElement('li');

    const div = document.createElement('div');

    const input = document.createElement('input');
    input.classList.add('completed');
    input.type = 'checkbox';
    input.name = 'completed';
    input.checked = activity.completed;
    input.addEventListener('click', () => updateCheckboxStatus(activity, input.checked));

    const p = document.createElement('p');
    p.classList.add('description');
    p.textContent = activity.description;

    div.appendChild(input);
    div.appendChild(p);
    li.appendChild(div);

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-ellipsis-v');

    li.appendChild(i);

    return li;
  };

  // Section to clear all completed activies
  const clearCompleted = () => {
    const li = document.createElement('li');

    li.textContent = 'Clear all completed';
    li.id = 'clear';

    return li;
  };

  const ul = document.querySelector('ul');

  ul.appendChild(heading());
  ul.appendChild(addActivity());

  activities.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  activities.forEach((activity) => ul.appendChild(renderList(activity)));

  ul.appendChild(clearCompleted());
};

activitiesList();