import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventPopup from "./EventPopup";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  const saveEvents = (updatedEvents) => {
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedEvent({ start, title: "", location: "" });
    setPopupOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setPopupOpen(true);
  };

  const handleSave = (eventData) => {
    let updatedEvents;
    if (selectedEvent.id) {
      updatedEvents = events.map((e) =>
        e.id === selectedEvent.id ? { ...e, ...eventData } : e
      );
    } else {
      updatedEvents = [...events, { ...eventData, id: Date.now() }];
    }
    saveEvents(updatedEvents);
    setPopupOpen(false);
  };

  const handleDelete = () => {
    const updatedEvents = events.filter((e) => e.id !== selectedEvent.id);
    saveEvents(updatedEvents);
    setPopupOpen(false);
  };

  const filterEvents = () => {
    const now = new Date();
    switch (filter) {
      case "past":
        return events.filter((e) => new Date(e.start) < now);
      case "upcoming":
        return events.filter((e) => new Date(e.start) >= now);
      default:
        return events;
    }
  };

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("past")}>Past</button>
        <button onClick={() => setFilter("upcoming")}>Upcoming</button>
      </div>

      <Calendar
        localizer={localizer}
        events={filterEvents()}
        startAccessor="start"
        endAccessor="start"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 500 }}
      />

      {popupOpen && (
        <EventPopup
          event={selectedEvent}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default EventCalendar;
