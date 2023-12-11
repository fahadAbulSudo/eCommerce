import React, { useState } from 'react';

const AddButton = ({ onClick, isFormOpen }) => {
  const [hover, setHover] = useState(false);
  const buttonStyle = {
    position: 'absolute',
    top: '55px',
    left: '20px',
    padding: '10px 20px',
    fontSize: '1.2em',
    borderRadius: '8px',
    backgroundColor: isFormOpen ? (hover ? 'maroon' : 'red') : ( hover ? 'darkgreen' : 'green' ),
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isFormOpen ? 'Close' : 'Add'}
    </button>
  );
};

export default AddButton;
