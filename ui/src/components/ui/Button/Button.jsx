import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

const Button = ({ clicked, onClickHandler, ...props }) => {

  // States
  const [color, setColor] = useState("");
  const [content, setContent] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // Equivalent of componentDidMount
  useEffect(() => {
    setColor("tomato");
    setContent("Red");
  }, []);

  // Equivalent of shouldComponentUpdate and
  // getDerivedStateFromProps
  useEffect(()=> {
    setColor(`${clicked ? "green" : "tomato"}`);
    setContent(`${clicked? "Green" : "Red"}`);
    setIsClicked(clicked);
  }, [clicked]);

  // Equivalent of render
  return (
    <button
      onClick={onClickHandler}
      style={{
        backgroundColor: color
      }}>{content}</button>
  );
}

// Button.propTypes = {
//   onClickHandler: PropTypes.func,
//   color: PropTypes.string,
//   content: PropTypes.string,
//   clicked: PropTypes.bool
// }

export default Button;