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


});