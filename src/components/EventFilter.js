import React from "react";

const EventFilters = ({ setFilter }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("past")}>Past</button>
      <button onClick={() => setFilter("upcoming")}>Upcoming</button>
    </div>
  );
};

export default EventFilters;
