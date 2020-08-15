import React, { useState, useRef } from "react";
const alarmSound = require("../assets/alarm_sound.mp3");
enum BreakType {
  Short = "Short",
  Long = "Long",
  None = "None",
}
const ShortBreak: React.FC<{
  toggleBreak: () => void;
  breakType: BreakType;
}> = ({ toggleBreak, breakType }) => {
  const breakTime = breakType === BreakType.Short ? 5 : 10;
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(breakTime);
  const [pauseBreak, setPauseBreak] = useState(false);
  const [isBreakOver, setIsBreakOver] = useState(false);
  const timeRef: React.MutableRefObject<number> = useRef(0);

  let audio: HTMLAudioElement = new Audio(alarmSound);

  React.useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      clearTimeout(timeRef.current);
      setIsBreakOver(true);
      audio.play();
      audio.loop = true;
    } else if (seconds === 0) {
      timeRef.current = window.setTimeout(() => {
        setSeconds(59);
        setMinutes(minutes - 1);
      }, 1000);
    } else {
      timeRef.current = window.setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => {
      audio.pause();
      clearTimeout(timeRef.current);
    };
  }, [audio, minutes, seconds, toggleBreak]);

  return (
    <>
      <section className="modal">
        <section className="break-section">
          {breakType === BreakType.Short ? (
            <h1>
              {isBreakOver ? "Short Break Is Over" : "Taking Short Break"}{" "}
            </h1>
          ) : (
            <h1>{isBreakOver ? "Long Break Is Over" : "Taking Long Break"} </h1>
          )}

          <div className="digital-time-section">
            <h3>{minutes}</h3>
            <h3>:</h3>
            <h3>{seconds}</h3>
          </div>
          <section className="break-button-container">
            {isBreakOver ? (
              <button onClick={toggleBreak}>Ok</button>
            ) : (
              <button onClick={() => setPauseBreak(!pauseBreak)}>
                {pauseBreak ? "continue" : "Pause"}
              </button>
            )}
            <button onClick={toggleBreak}>Cancel</button>
          </section>
        </section>
      </section>
    </>
  );
};
export default ShortBreak;
