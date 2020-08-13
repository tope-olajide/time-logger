import React from "react";

const EditTaskForm: React.FC<{
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  seconds: number;
  minutes: number;
  hours: number;
  id: number;
  taskTitle: string;
  taskSummary: string;
  updateTask: (id: number) => void;
}> = ({
  handleChange,
  seconds,
  minutes,
  hours,
  id,
  taskTitle,
  taskSummary,
  updateTask,
}) => {
  return (
    <>
      <section className="edit-task-section">
        <form>
          <input
            type="text"
            placeholder="Task Title"
            name="taskTitle"
            defaultValue={taskTitle}
            onChange={handleChange}
          />
          <textarea
            placeholder="Task Summary"
            name="taskSummary"
            onChange={handleChange}
            defaultValue={taskSummary}
          ></textarea>
          <section className="timer-input-field">
            <label>
              <b>Hours</b>
              <input
                type="text"
                name="hours"
                defaultValue={hours}
                onChange={handleChange}
              />
            </label>
            <h1>:</h1>
            <label>
              <b>Minutes</b>
              <input
                type="text"
                name="minutes"
                defaultValue={minutes}
                onChange={handleChange}
              />
            </label>
            <h1>:</h1>
            <label>
              <b>Seconds</b>
              <input
                type="text"
                name="seconds"
                onChange={handleChange}
                defaultValue={seconds}
              />
            </label>
          </section>
          <button onClick={() => updateTask(id)} className="add-task-button">
            Update Task
          </button>
        </form>
      </section>
    </>
  );
};

export default EditTaskForm;
