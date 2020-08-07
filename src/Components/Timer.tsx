import React, { useState, useRef } from "react";
import useForm from "../useForm";
import EditTaskForm from './EditTaskForm'
import TaskCard from './TaskCard'
import CreateTaskForm from './CreateTaskForm'
import Alarm from './Alarm'
import ShortBreak from './ShortBreak'
enum Status {
    Pending="Pending",
    Paused="Paused",
    Stopped="Stopped",
    Running="Running",
    Finished="Finished"
}
interface Itask {
  taskTitle: string;
  taskSummary: string;
  status: Status;
  hours: number;
  minutes: number;
  seconds: number;
  isEdit: boolean;
  id: number;
}

const Timer = () => {
  const [tasks, setTasks] = useState<Array<Itask>>([]);
  const [displayAlarm, setDisplayAlarm] = useState(false);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);

  const { inputs, handleChange, resetInputs } = useForm();
  const addNewTask = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const newTask: Itask = {
      taskTitle: inputs.taskTitle || "No Task Title",
      taskSummary: inputs.taskSummary || "No Task Description",
      status: Status.Pending,
      hours: inputs.hours || 0,
      minutes: inputs.minutes || 0,
      seconds: inputs.seconds || 4,
      isEdit: false,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    resetInputs();
    const formInputs = document.getElementById("form");
    if (formInputs) {
      (formInputs as HTMLFormElement).reset();
    }
  };
  const updateTask = (taskId: number) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          taskTitle: inputs.taskTitle || task.taskTitle,
          taskSummary: inputs.taskSummary || task.taskSummary,
          status: Status.Pending,
          hours: inputs.hours || task.hours,
          minutes: inputs.minutes || task.minutes,
          seconds: inputs.seconds || task.seconds,
          isEdit: false,
        };
      }
      return task;
    });
    setTasks(updatedTask);
  };
  const toggleAlarm = () => {
    setDisplayAlarm(!displayAlarm);
  };
  const closeAlarm = () => {
    setDisplayAlarm(false);
    setIsShortBreak(true);
  };
  const toggleShortBreak = () => {
    setIsShortBreak(!isShortBreak);
  };

  const timeRef: React.MutableRefObject<number> = useRef(0);
  React.useEffect(() => {
    for (const timer of tasks) {
      if (timer.id === currentTaskId && timer.status === Status.Running) {
        const filteredTask = tasks.filter((note) => {
          return note.id !== currentTaskId;
        });
        if (timer.hours === 0 && timer.minutes <= 0 && timer.seconds <= 0) {
          toggleAlarm();
          clearTimeout(timeRef.current);
          setTasks([
            {
              ...timer,
              hours: 0,
              minutes: 0,
              seconds: 0,
              status: Status.Finished,
            },
            ...filteredTask,
          ]);
        } else if (timer.minutes === 0 && timer.seconds === 0) {
          timeRef.current = window.setTimeout(() => {
            setTasks([
              {
                ...timer,
                hours: timer.hours - 1,
                minutes: 59,
                seconds: 59,
              },
              ...filteredTask,
            ]);
          }, 1000);
        } else if (timer.seconds === 0) {
          timeRef.current = window.setTimeout(() => {
            setTasks([
              { ...timer, minutes: timer.minutes - 1, seconds: 59 },
              ...filteredTask,
            ]);
          }, 1000);
        } else {
          timeRef.current = window.setTimeout(() => {
            setTasks([
              { ...timer, seconds: timer.seconds - 1 },
              ...filteredTask,
            ]);
          }, 1000);
        }
      }
    }
    return () => {
      clearTimeout(timeRef.current);
    };
  }, [tasks, currentTaskId]);

  const startTask = (taskId: number) => {
     setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: Status.Running,
        };
      } else if (task.status === Status.Paused) {
        return {
          ...task,
          status: Status.Paused,
        };
      } else {
        return { ...task, status: Status.Pending };
      }
    }));
    setCurrentTaskId(taskId);
  };

  const pauseTask = (taskId: number) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: Status.Paused,
        };
      } else {
        return { ...task, status: Status.Pending };
      }
    })
    );
    clearTimeout(timeRef.current);
  };
  const removeTask = (taskId: number) => {
     setTasks(tasks.filter((task) => {
      return task.id !== taskId;
    })
    )
  };
  const saveTask = (taskId: number) => {
    removeTask(taskId);
  };
  const toggleEditTaskComponent = (taskId: number) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isEdit: !task.isEdit,
        };
      }
      return {
        ...task,
        isEdit: false,
      };
    });
    setTasks(updatedTask);
  };

  const timersView = tasks.map((eachTimer) => {
    if (eachTimer.isEdit) {
      return (
        <section className="timer-card">
          <h6>Edit Task</h6>
          <EditTaskForm
            seconds={eachTimer.seconds}
            minutes={eachTimer.minutes}
            hours={eachTimer.hours}
            id={eachTimer.id}
            taskTitle={eachTimer.taskTitle}
            taskSummary={eachTimer.taskSummary}
            updateTask={updateTask}
            handleChange={handleChange}
          />
        </section>
      );
    }
    return (
      <TaskCard
        seconds={eachTimer.seconds}
        minutes={eachTimer.minutes}
        hours={eachTimer.hours}
        id={eachTimer.id}
        key={eachTimer.id}
        startTask={startTask}
        taskTitle={eachTimer.taskTitle}
        taskSummary={eachTimer.taskSummary}
        status={eachTimer.status}
        pauseTask={pauseTask}
        toggleEditTaskComponent={toggleEditTaskComponent}
        removeTask={removeTask}
        saveTask={saveTask}
      />
    );
  });
  return (
    <>
      {isShortBreak ? <ShortBreak toggleShortBreak={toggleShortBreak} /> : ""}
      {displayAlarm ? (
        <Alarm toggleAlarm={toggleAlarm} closeAlarm={closeAlarm} />
      ) : (
        ""
      )}
      <CreateTaskForm handleChange={handleChange} addNewTask={addNewTask} />
      <section className="timer-container">{timersView}</section>
    </>
  );
};
export default Timer;
