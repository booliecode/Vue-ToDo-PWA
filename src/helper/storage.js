const STORAGE_PREFIX = "todoApp_";

export const saveStorage = tasks => localStorage.setItem(STORAGE_PREFIX + 'tasks', JSON.stringify(tasks));
export const loadStorage = () => {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'tasks'));
  if(tasks) {
    return tasks.map(task => {
      task.date = new Date(task.date);
      return task;
    });
  } else {
    return [];
  }
}
