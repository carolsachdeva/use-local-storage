import React, { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const Usage: React.FC = () => {
  const {
    value: name,
    setValue: setName,
    removeItem,
  } = useLocalStorage<string>("name", "Carol");

  const [inputValue, setInputValue] = useState<string>(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSet = () => {
    setName(inputValue);
  };

  const handleRemove = () => {
    removeItem();
  };

  return (
    <div>
      <p>Your name is: {name}</p>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSet}>Set Name</button>
      <button onClick={handleRemove}>Remove Name</button>
    </div>
  );
};

export default Usage;
