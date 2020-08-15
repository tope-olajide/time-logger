import React from "react";
enum Status {
  Pending="Pending",
  Paused="Paused",
  Stopped="Stopped",
  Running="Running",
  Finished="Finished"
}
const TaskCard: React.FC<{
  minutes: number;
  hours: number;
  seconds: number;
  id: number;
  taskTitle: string;
  taskSummary: string;
  status: Status;
  startTask: (id: number) => void;
  pauseTask: (id: number) => void;
  toggleEditTaskComponent: (id: number) => void;
  removeTask: (id: number) => void;
  saveTask: (id: number) => void;
  restartTask: (id: number) => void;
  
}> = ({
  minutes,
  hours,
  seconds,
  startTask,
  id,
  taskTitle,
  taskSummary,
  status,
  pauseTask,
  toggleEditTaskComponent,
  removeTask,
  saveTask,
  restartTask
}) => {
  return (
    <>
      <section className="timer-card">
        <div className="timer-card-header">
          <div className={"task-title-section"}>
            <h1>{taskTitle}</h1>
          </div>{" "}
          <h2 onClick={() => removeTask(id)} className="delete-task-icon">
            x
          </h2>
        </div>

        <section className="pomodoro-task">
          <p>{taskSummary}</p>
        </section>
        <div className="digital-time-section">
          <h3>{hours}</h3>
          <h3>:</h3>
          <h3>{minutes}</h3>
          <h3>:</h3>
          <h3>{seconds}</h3>
        </div>
        <section className="card-button-container">
          {status === Status.Running ? (
            <button onClick={() => pauseTask(id)}>Pause</button>
          ) : status === Status.Finished ? (
            <button onClick={() => restartTask(id)}>Restart</button>
          )
          
          : (
            <button onClick={() => startTask(id)}>
              {status === Status.Paused ? "Continue" : "Start"}
            </button>
          )}
          {status === Status.Finished || status === Status.Paused ? (
            <button onClick={() => saveTask(id)}>Done</button>
          ) : (
            <button onClick={() => toggleEditTaskComponent(id)}>Edit</button>
          )}
        </section>
      </section>
    </>
  );
};
export default TaskCard;
