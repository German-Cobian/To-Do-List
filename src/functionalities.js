/* eslint-disable import/no-mutable-exports */

let activities = [
  { description: 'Un-clog the toilet', completed: false, index: 1 },
  { description: 'Complain to the neighbor about his brats', completed: false, index: 3 },
  { description: 'De-flea the dog', completed: false, index: 3 },
];

const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index });
};

const emptyList = () => {
  activities = [];
};

const archiveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities));
};

const loadActivitiesList = () => {
  let loadActivities;
  if (loadActivities === undefined) {
    loadActivities = JSON.parse(localStorage.getItem('activities'));
  }
  activities = JSON.parse(localStorage.getItem('activities'));
  return activities;
};

const activityReload = (activity, check) => {
  const specificActivity = activities.find((act) => act.description === activity.description);

  specificActivity.completed = check;
  archiveActivities();
};

export {
  activities, emptyList, inputActivity, loadActivitiesList, archiveActivities, activityReload,
};

/* eslint-enable import/no-mutable-exports */