import React, { Component } from 'react';
import './App.css';
import Button from './components/ui/Button/Button';

function App() {

  // Declare the states


  // Handle state change properly on bnutton click
  buttonClickHandler = () => {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }

  // Fix the compilation error in the return block
  return (
    <div className="App">
      <Button
        clicked={this.state.clicked}
        onClickHandler={this.buttonClickHandler} />
    </div>
  );
}

export default App;
