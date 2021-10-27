import React from "react";
import "./style.css";

const CardFront = ({
  //image,
  rate,
  title,
  genre,
  trailerLink,
  spectacleLength,
}) => {
  return (
    <div className="front">
      <img src="./theatre.png" alt="Spectacle icon" width="400" height="400"/>
      <div className="card-footer">
        <h4> {title} </h4>
        <p>
          {spectacleLength} / {genre}
        </p>

        <a
          href={trailerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="trailer-btn"
        >
          Read the summary
        </a>
      </div>
      <span className="like"> {rate}</span>
    </div>
  );
};
export default CardFront;

