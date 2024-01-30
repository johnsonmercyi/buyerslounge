//import React, { Component } from 'react';
import React, {useState } from 'react';
import './App.css';
import Button from './components/ui/Button/Button';
import TextFieldComponent from './components/ui/Field/Field';

function App() {

  // Declare the states
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");

  // Handle state change properly on bnutton click
  const buttonClickHandler = () => {
    if(value.length != 0){
      alert(`Welcome ${value}`);
      setIsClicked(!isClicked);
    }else{
      alert(`You need to type your name`);
    }
  };

  const textChange = (e)=>{
    setValue(e.target.value);
  };

  // Fix the compilation error in the return block
  return (
    <div className="App">
      <Button
        clicked={isClicked}
        onClickHandler={buttonClickHandler} />

        <TextFieldComponent 
          style={{ borderColor: 'red', padding: '5px' }}
          onChangeHandler={textChange}
        />
    </div>
  );
}

export default App;
