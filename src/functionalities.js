/* eslint-disable import/no-mutable-exports */

let activities = [
  { description: 'Un-clog the toilet', completed: false, index: 1 },
  { description: 'Complain to the neighbor about his brats', completed: false, index: 3 },
  { description: 'De-flea the dog', completed: true, index: 3 },
];

const emptyList = () => {
  activities = [];
};

const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index });
};

const archiveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities));
};

const activityReload = (activity, check) => {
  const specificActivity = activities.find((act) => act.description === activity.description);

  specificActivity.completed = check;
  archiveActivities();
};

export {
  activities, emptyList, inputActivity, activityReload
};

/* eslint-enable import/no-mutable-exports */