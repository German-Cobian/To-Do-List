/* eslint-disable max-len */
/**
 * @jest-environment jsdom
 */

import {
  activities,
  inputActivity,
  emptyList,
  LocalStorageMock,
  updateCheckboxStatus,
  editActivityDescription,
} from './functionalitiesMock';

import { activitiesList, clearCompleted } from '../indexAlt';

describe('It updates status and content', () => {
  const activity1 = {
    description: 'Task 1',
    completed: true,
    index: 0,
  };

  const activity2 = {
    description: 'Task 2',
    completed: false,
    index: 1,
  };

  const storage = new LocalStorageMock();
  const ul = document.createElement('ul');

  test('It edits the task description', () => {
    const nextIndex = activities[activities.length];
    inputActivity('initial description', false, nextIndex);
    editActivityDescription(nextIndex, 'updated description');

    expect(activities[activities.length - 1].description).toBe('updated description');
  });

  test('Updates the status of checkbox: checked or unchecked', () => {
    const nextIndex = activities[activities.length - 1];
    inputActivity('Pending task', false, nextIndex);
    updateCheckboxStatus(nextIndex, true);

    expect(activities[activities.length - 1].completed).toBe(true);
  });

  test('It clears all completed tasks', () => {
    emptyList();
    storage.clear();
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
    ul.appendChild(activitiesList(activity1));
    ul.appendChild(activitiesList(activity2));
    addActivityToDOM(addedActivity1);
    addActivityToDOM(addedActivity2);
    document.body.appendChild(ul);
    const checkboxes = document.getElementsByClassName('completed');
    checkboxes[0].checked = true;
    clearCompleted(ul);
    [...checkboxes].forEach((checkbox) => expect(checkbox.checked).toBe(false));
    expect([...checkboxes].length).toBe(1);
  });
});