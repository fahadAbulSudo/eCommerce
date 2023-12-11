import React, { useState } from 'react';

const SortButton = ({ onClick, isSorted }) => {
  const [hover, setHover] = useState(false);

  const buttonStyle = {
    position: 'absolute',
    top: '55px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '1.2em',
    borderRadius: '8px',
    backgroundColor: hover ? 'darkgoldenrod' : '#D9D979',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <button
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
      {isSorted ? 'Unsort' : 'Sort'}
    </button>
  );
};

export default SortButton;