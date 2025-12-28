import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <h2 className="card-title">{props.title}</h2>
      <hr />
      <div className="card-content">
        {/* Render dynamic content passed as children */}
        {props.children}
      </div>
    </div>
  );
};

export default Card;
