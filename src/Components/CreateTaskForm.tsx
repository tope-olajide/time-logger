import React from "react";
const CreateTaskForm: React.FC<{
  addNewTask: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}> = ({ addNewTask, handleChange }) => {
  return (
    <>
      <section className="add-task-section">
        <h1>Add New Task</h1>
        <form id="form">
          <input
            type="text"
            placeholder="Task Title"
            name="taskTitle"
            onChange={handleChange}
          />
          <textarea
            placeholder="Task Summary"
            name="taskSummary"
            onChange={handleChange}
            required
          ></textarea>
          <section className="timer-input-field">
            <label>
              <b>Hours</b>
              <input
                type="text"
                defaultValue="0"
                name="hours"
                onChange={handleChange}
              />
            </label>
            <h1>:</h1>
            <label>
              <b>Minutes</b>
              <input
                type="text"
                defaultValue="25"
                name="minutes"
                onChange={handleChange}
              />
            </label>
            <h1>:</h1>
            <label>
              <b>Seconds</b>
              <input
                type="text"
                defaultValue="0"
                name="seconds"
                onChange={handleChange}
              />
            </label>
          </section>
          <button onClick={addNewTask} className="add-task-button">
            Save Task
          </button>
        </form>
      </section>
    </>
  );
};
export default CreateTaskForm;
