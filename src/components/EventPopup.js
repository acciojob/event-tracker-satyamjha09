import React, { useState } from "react";
import Popup from "react-popup";

const EventPopup = ({ event, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [location, setLocation] = useState(event?.location || "");

  const handleSave = () => {
    onSave({ ...event, title, location });
  };

  return (
    <Popup open={true} closeOnDocumentClick onClose={onClose}>
      <div className="popup-content">
        <h2>{event?.id ? "Edit Event" : "Create Event"}</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        {event?.id && <button onClick={onDelete}>Delete</button>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </Popup>
  );
};

export default EventPopup;
