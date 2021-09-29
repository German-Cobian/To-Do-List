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