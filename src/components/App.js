import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popup from "react-popup";

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("all");

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    location: "",
    date: "",
  });

  // Open Popup to Create Event
  const handleSelectSlot = ({ start }) => {
    setFormData({ id: Date.now(), title: "", location: "", date: start });
    setShowPopup(true);
    setSelectedEvent(null);
  };

  // Open Popup to Edit Event
  const handleSelectEvent = (event) => {
    setFormData(event);
    setSelectedEvent(event);
    setShowPopup(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save Event
  const handleSave = () => {
    if (!formData.title.trim()) return alert("Title is required!");

    const updatedEvents = selectedEvent
      ? events.map((ev) => (ev.id === selectedEvent.id ? formData : ev))
      : [...events, formData];

    setEvents(updatedEvents);
    setShowPopup(false);
  };

  // Delete Event
  const handleDelete = () => {
    setEvents(events.filter((ev) => ev.id !== selectedEvent.id));
    setShowPopup(false);
  };

  // Filter Events
  const now = moment();
  const filteredEvents = events.filter((event) => {
    if (filter === "past") return moment(event.date).isBefore(now, "day");
    if (filter === "upcoming") return moment(event.date).isAfter(now, "day");
    return true;
  });

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>Event Tracker Calendar</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All Events</button>
        <button onClick={() => setFilter("past")}>Past Events</button>
        <button onClick={() => setFilter("upcoming")}>Upcoming Events</button>
      </div>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={filteredEvents.map((event) => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
          className: moment(event.date).isBefore(now, "day")
            ? "past-event"
            : "upcoming-event",
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      {/* Popup for Adding/Editing Events */}
      {showPopup && (
        <Popup open={showPopup} closeOnDocumentClick onClose={() => setShowPopup(false)}>
          <div>
            <h3>{selectedEvent ? "Edit Event" : "Create Event"}</h3>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
            />
            <button onClick={handleSave} className="mm-popup__btn">Save</button>
            {selectedEvent && (
              <button onClick={handleDelete} className="mm-popup__btn--danger">
                Delete
              </button>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
}

export default App;
