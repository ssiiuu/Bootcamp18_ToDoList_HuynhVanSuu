import {
  ADD_TASK,
  DELETE_TASK,
  DONE_TASK,
} from "../constants/ToDoListConstant";

export const addTaskToDoList = (newtask) => ({
  type: ADD_TASK,
  payload: newtask,
});

export const doneTaskToDoList = (taskId) => ({
  type: DONE_TASK,
  payload: taskId,
});

export const deleteTaskToDoList = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});
