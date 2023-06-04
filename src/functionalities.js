/* eslint-disable import/no-mutable-exports */

let activities = [];

const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index });
  return activities[activities.length - 1];
};

const emptyList = () => {
  activities = [];
};

const archiveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities));
};

const loadActivitiesList = () => {
  let loadActivities = JSON.parse(localStorage.getItem('activities'));
  if (loadActivities == null) {
    loadActivities = [];
  }
  activities = loadActivities;
  return activities;
};

const assignIndexToActivity = (description) => {
  let index = 0;

  if (activities.length > 0) {
    index = activities[activities.length - 1].index + 1;
  }

  inputActivity(description, false, index);
  archiveActivities();
};

const updateCheckboxStatus = (index, check) => {
  const doneActivities = activities.find((a) => a.index === index);

  doneActivities.completed = check;
  archiveActivities();
};

const editActivityDescription = (index, description) => {
  const descriptionToEdit = activities.find((a) => a.index === index);
  descriptionToEdit.description = description;
  archiveActivities();
};

const repopulateList = () => {
  emptyList();
  const listItems = document.querySelectorAll('.listItems');

  let i = 0;
  listItems.forEach((listItem) => {
    listItem.setAttribute('activity', i);
    i += 1;

    const index = listItem.getAttribute('activity');
    const description = listItem.getElementsByClassName('description')[0].textContent;
    const completed = listItem.getElementsByClassName('completed')[0].checked;
    console.log(description, completed, index)

    inputActivity(description, completed, index);
    archiveActivities();
  });
};

export {
  activities,
  inputActivity,
  archiveActivities,
  loadActivitiesList,
  assignIndexToActivity,
  updateCheckboxStatus,
  editActivityDescription,
  repopulateList,
};

/* eslint-enable import/no-mutable-exports */