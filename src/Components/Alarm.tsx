import React, { useEffect } from "react";
import alarmClock from "../assets/Alarm_Clock.gif";
const alarmSound = require("../assets/alarm_sound.mp3");

const Alarm: React.FC<{ toggleAlarm: () => void; closeAlarm: () => void }> = ({
  toggleAlarm,
  closeAlarm,
}) => {
  useEffect(() => {
    const audio: HTMLAudioElement = new Audio(alarmSound);
    audio.play();
    audio.loop = true;
    return () => {
      audio.pause();
    };
  });
  return (
    <>
      <section className="modal">
        <section className="alarm-section">
          <h1>Time to take your short break</h1>
          <img src={alarmClock} alt="alarm-clock" />
          <button onClick={closeAlarm} className="">
            Take Break
          </button>
        </section>
      </section>
    </>
  );
};
export default Alarm;
