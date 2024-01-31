//import React, { Component } from 'react';
import React, { useState } from 'react';
import './App.css';
import Button from './components/ui/Button/Button';
import TextFieldComponent from './components/ui/Field/Field';

function App() {

  // Declare the states
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");

  const [inputs, setInputs] = useState({});

  // Handle state change properly on bnutton click
  const buttonClickHandler = () => {
    if (value.length != 0) {
      alert(`Welcome ${value}`);
      setIsClicked(!isClicked);
    } else {
      alert(`You need to type your name`);
    }
  };

  const textChange = (e) => {
    console.log("APP VALUE: ", e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (event) => {
    const name = event.target.name; // Gets the name of the field
    const value = event.target.value; // Gets the value of the field

    setInputs(values => {
      return {
        ...values, // Flushes the old name = value pairs existing in the input state
        [name]: value // Dynamically sets the value to the field name
      }
    });
  }

  // Fix the compilation error in the return block
  return (
    <>
      <div className="App">
        <Button
          clicked={isClicked}
          onClickHandler={buttonClickHandler} />

        <TextFieldComponent
          name="name"
          value={inputs.name || ""}
          style={{ borderColor: 'red', padding: '5px' }}
          onChangeHandler={handleChange} />

        <TextFieldComponent
          name="age"
          value={inputs.age || ""}
          style={{ borderColor: 'red', padding: '5px' }}
          onChangeHandler={handleChange} />
      </div>

      <div></div>
    </>
  );
}

export default App;
