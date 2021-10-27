import React from "react";

import SpectacleCard from "./SpectacleCard";
import "./style.css";

export default function SpectaclesTable({ spectacles, currentPage, pageSize }) {
  const currentSpectacles = spectacles.slice(
    (currentPage - 1) * pageSize,
    pageSize * currentPage
  );

  return (
    <div className="spectacles-grid">
      {!!spectacles &&
        currentSpectacles.map((spectacle) => (
          <SpectacleCard spectacle={spectacle} key={spectacle._id} />
        ))}
       
    </div>
  );
}

