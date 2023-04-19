import { useState } from "react";
const useInput = (checkFn) => {
  const [input, setInput] = useState("");
  const [hasError, setHasError] = useState(false);
  const handler = (e) => {
    setInput(e.target.value);
    setHasError(checkFn(e.target.value));
  };
  return {
    input,
    hasError,
    handler
  };
};
export default useInput