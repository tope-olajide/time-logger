import { useState } from "react";
const useForm = (initial = {taskTitle:"",taskSummary:"",hours:0,minutes:0,seconds:0}) => {
  const [inputs, setInputs] = useState(initial);
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };
  const resetInputs = () => {
    return setInputs(initial)
  }
  return {
    inputs,
    handleChange,
    resetInputs
  };
};
export default useForm;