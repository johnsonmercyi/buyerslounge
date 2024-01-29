// state component and stateless

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "",
      content: "",
      clicked: false
    }
  }

  componentDidMount() {
    // For when the component mpounts so we can cause side effects
    this.setState({
      color: "tomato",
      content: "Red",
      clicked: false
    });
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("Component Updated From: ", "Old Props: ", prevProps, "And Old State: ", prevState);
  //   console.log("\nTo: ", "New Props: ", this.props, "And New State: ", this.state);
  // }

  shouldComponentUpdate(props, state) {
    return true;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clicked !== prevState.clicked) {
      return {
        clicked: nextProps.clicked,
        color: nextProps.clicked ? "green" : "tomato",
        content: nextProps.clicked ? "Green" : "Red"
      };
    }
    return null;
  }

  render() {
    return <button
      onClick={this.props.onClickHandler}
      style={{
        backgroundColor: this.state.color
      }}>{this.state.content}</button>
  }
}

Button.propTypes = {
  onClickHandler: PropTypes.func,
  color: PropTypes.string,
  content: PropTypes.string,
  clicked: PropTypes.bool
}

export default Button;