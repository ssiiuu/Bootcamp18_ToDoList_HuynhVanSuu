import {
  ADD_TASK,
  DELETE_TASK,
  DONE_TASK,
} from "../constants/ToDoListConstant";

let initialState = {
  taskList: [
    // { id: "task-1", taskName: "task-1", done: false },
    // { id: "task-2", taskName: "task-2", done: true },
    // { id: "task-3", taskName: "task-3", done: true },
    // { id: "task-4", taskName: "task-4", done: false },
  ],
};

export const ToDoListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TASK: {
      //   console.log("todo", payload);
      //kiểm tra rỗng
      if (payload.taskName.trim() === "") {
        alert("Task name is required!");
        return { ...state };
      }

      //kiểm tra tồn tại
      let taskListClone = [...state.taskList];
      let index = taskListClone.findIndex(
        (task) => task.taskName === payload.taskName
      );

      if (index !== -1) {
        alert("Task Name already exists!");
        return { ...state };
      }
      taskListClone.push(payload);

      //xử lý xong thì gán tasklist mới vào TaskList
      state.taskList = taskListClone;
      return { ...state };
    }
    case DONE_TASK: {
      let taskListClone = [...state.taskList];
      let index = taskListClone.findIndex((task) => task.id === payload);
      if (index !== 1) {
        taskListClone[index].done = true;
      }

      state.taskList = taskListClone;
      return { ...state };
    }
    case DELETE_TASK: {
      let taskListClone = [...state.taskList];
      let index = taskListClone.findIndex((task) => task.id === payload);
      if (index !== 1) {
        taskListClone.splice(index, 1);
      }

      //   state.taskList = taskListClone;
      return { ...state, taskList: taskListClone };
    }

    default:
      return { ...state };
  }
};
