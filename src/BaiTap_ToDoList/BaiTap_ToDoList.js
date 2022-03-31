import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addTaskToDoList,
  deleteTaskToDoList,
  doneTaskToDoList,
  editTaskToDoList,
} from "../redux/actions/ToDoListAction";

class BaiTap_ToDoList extends Component {
  state = {
    taskName: "",
  };

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <tr key={index} className="text-white">
            <th>{task.taskName}</th>
            <th className="text-right">
              <button
                onClick={() => this.props.dispatch(editTaskToDoList(task))}
                className="btn btn-light ml-1 "
              >
                <i className="fa fa-edit"></i>
              </button>

              <button
                onClick={() => {
                  this.props.dispatch(doneTaskToDoList(task.id));
                }}
                className="btn btn-success ml-1"
              >
                <i className="fa fa-check"></i>
              </button>

              <button
                onClick={() => {
                  this.props.dispatch(deleteTaskToDoList(task.id));
                }}
                className="btn btn-danger ml-1"
              >
                <i className="fa fa-trash"></i>
              </button>
            </th>
          </tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <tr key={index} className="text-white">
            <th>{task.taskName}</th>
            <th className="text-right">
              <button
                onClick={() => {
                  this.props.dispatch(deleteTaskToDoList(task.id));
                }}
                className="btn btn-danger ml-1"
              >
                <i className="fa fa-trash"></i>
              </button>
            </th>
          </tr>
        );
      });
  };

  // handleChange = (e) => {
  //   let { name, value } = e.target;
  //   this.setState(
  //     {
  //       [name]: value,
  //     },
  //     () => {
  //       console.log(this.state);
  //     }
  //   );
  // };

  render() {
    return (
      <div className="container w-50  ">
        <div className="border border-dark bg-info text-white p-5">
          <h1 className="text-center">TO DO LIST</h1>
          <div className="form-group ">
            <label htmlFor="inputToDo">Task name</label>
            <input
              value={this.props.taskEdit.taskName}
              onChange={(e) => {
                this.setState(
                  {
                    taskName: e.target.value,
                  }
                  // console.log(this.state)
                );
              }}
              type="text"
              className="form-control"
              name="taskName"
              id="inputToDo"
              placeholder="Thêm việc cần làm..."
            />
            <button
              onClick={() => {
                //Lấy thông tin người dùng nhập vào từ ô input
                let { taskName } = this.state;

                //Tạo ta 1 task object mới với 3 key
                let newTask = {
                  id: Date.now(), //id duy nhất là thời điểm click
                  taskName: taskName,
                  done: false,
                };
                // console.log(newTask);
                //Đưa task object mới lên redux thông qua phương thức dispatch
                this.props.dispatch(addTaskToDoList(newTask));

                // this.props.handleAddTask(newTask);
              }}
              className="btn btn-outline-warning mt-2 mr-2"
            >
              Add task
            </button>
            <button className="btn btn-outline-warning mt-2 mr-2">
              Update task
            </button>
          </div>
          <hr />
          <h1>Task To Do</h1>
          <table className="table">
            <thead>{this.renderTaskToDo()}</thead>
          </table>

          <hr />
          <h1>Task Completed</h1>
          <table className="table">
            <thead>{this.renderTaskCompleted()}</thead>
          </table>
        </div>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleAddTask: (newTask) => {
//       dispatch(addTaskToDoList(newTask));
//     },
//   };
// };
export default connect(mapStateToProps, null)(BaiTap_ToDoList);
