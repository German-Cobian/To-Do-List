/* eslint-disable max-len */
/**
 * @jest-environment jsdom
 */

 import {
  activities, inputActivity, assignIndexToActivity, repopulateList,
} from './functionalitiesMock';
import { activitiesList } from '../indexAlt';

describe('It adds and deletes items from the list', () => {
  const activity1 = {
    description: 'De-flea the dog',
    completed: false,
    index: 0,
  };
  const activity2 = {
    description: 'Pluck nose hairs',
    completed: false,
    index: 1,
  };

  const activityDescription = 'Paint the house';

  const ul = document.createElement('ul');

  test('it creates a list of corresponding inputs', () => {
    assignIndexToActivity(activityDescription);

    expect(activities[activities.length - 1].description).toBe(activityDescription);

    ul.appendChild(activitiesList(activities[activities.length - 1]));

    expect(ul.innerHTML.includes(activityDescription)).toBe(true);
  });

  test('it adds and deletes an item from the To Do List in the DOM', () => {
    const addedActivity1 = inputActivity(activity1.description, activity1.completed, activity1.index);
    const addedActivity2 = inputActivity(activity2.description, activity2.completed, activity2.index);
    ul.innerHTML = '';
    const addActivityToDOM = (activity) => {
     const listElement = document.createElement('li');
     listElement.classList.add('listItems');
     listElement.setAttribute('activity', activity.index);
     const input = document.createElement('input');
     input.classList.add('completed');
     input.setAttribute('checked', (activity.completed ? 'true' : 'false'));
     const p = document.createElement('p');
     p.classList.add('description');
     p.textContent = activity.description;
     listElement.appendChild(input);
     listElement.appendChild(p);
     ul.appendChild(listElement);
    };
    addActivityToDOM(addedActivity1);
    addActivityToDOM(addedActivity2);
    document.body.appendChild(ul);
    ul.removeChild(ul.childNodes[0]);
    repopulateList();
    expect(activities.length).toBe(1);
    expect(activities[0].description).toBe(addedActivity2.description);
   });
  });