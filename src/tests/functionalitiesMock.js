/* eslint-disable import/no-mutable-exports */

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  loadActivitiesList(activities) {
    return this.store[activities] || null;
  }

  archiveActivities(activities, activity) {
    this.store[activities] = String(activity);
  }

  removeItem(activity) {
    delete this.store[activity];
  }
}
const storage = new LocalStorageMock();

let activities = [];
const inputActivity = (description, completed, index) => {
  activities.push({ description, completed, index });
  return activities[activities.length - 1];
};
const emptyList = () => {
  activities = [];
};
const assignIndexToActivity = (description) => {
  let index = 0;
  if (activities.length > 0) {
    index = activities[activities.length - 1].index + 1;
  }
  inputActivity(description, false, index);
  storage.archiveActivities();
};
const updateCheckboxStatus = (index, check) => {
  const doneActivities = activities.find((a) => a.index === index);
  doneActivities.completed = check;
  storage.archiveActivities();
};
const editActivityDescription = (index, description) => {
  const descriptionToEdit = activities.find((a) => a.index === index);
  descriptionToEdit.description = description;
  storage.archiveActivities();
};
const repopulateList = () => {
  const listItems = document.querySelectorAll('.listItems');
  let i = 0;
  listItems.forEach((listItem) => {
    listItem.setAttribute('activity', i);
    i += 1;
  });
  emptyList();
  listItems.forEach((listItem) => {
    const description = listItem.getElementsByClassName('description')[0].textContent;
    const completed = listItem.getElementsByClassName('completed')[0].checked;
    const index = listItem.getAttribute('activity');
    inputActivity(description, completed, index);
    storage.archiveActivities();
  });
};
export {
  activities,
  LocalStorageMock,
  inputActivity,
  emptyList,
  assignIndexToActivity,
  updateCheckboxStatus,
  editActivityDescription,
  repopulateList,
};