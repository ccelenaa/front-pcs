import React from 'react';
import { NavLink } from 'react-router-dom';

// Helper function to format Date objects into strings
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Helper function to parse date strings into Date objects
function parseDate(dateStr) {
  return new Date(dateStr);
}

// Generate all days of the year
function generateDaysOfYear(year) {
  const days = [];
  // const startOfYear = new Date(`${year}-01-01`);
  // const endOfYear = new Date(`${year}-12-31`);
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  for (let d = new Date(startOfYear); d <= endOfYear; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d.setHours(12, 0, 0, 0)));
  }

  return days;
}

const Calendar = ({ availabilities, year }) => {
  const daysOfYear = generateDaysOfYear(year);
  const availabilityMap = {};

  // Mark availability in a map
  availabilities.forEach(({ voyageur, date_debut, date_fin }) => {
    let start = parseDate(date_debut);
    let end = parseDate(date_fin);

    console.log({v:1, start})
    // Adjust for full-day dates
    // start.setHours(0, 0, 0, 0);
    // end.setHours(23, 59, 59, 999);
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      availabilityMap[formatDate(d)] = voyageur;
    }
  });

  // Group days by month
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push([]);
  }
  
  daysOfYear.forEach(day => {
    const month = day.getMonth();
    months[month].push(day);
  });

  const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="calendar">
      {months.map((monthDays, index) => {
        const firstDayOfMonth = (monthDays[0].getDay() || 7) - 1; // Adjust to make Monday the first day of the week
        const emptyDays = Array.from({ length: firstDayOfMonth });

        return (
          <div key={index} className="month">
            <h5>{new Date(year, index).toLocaleString('default', { month: 'long' })}</h5>
            <div className="weekdays">
              {weekdays.map(day => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="days">
              {emptyDays.map((_, idx) => (
                <div key={idx} className="day empty"></div>
              ))}
              {monthDays.map(day => {
                const formattedDate = formatDate(day);
                const isAvailable = availabilityMap[formattedDate] || false;
                const past = formattedDate < today ? 'past' : '';
                return (
                  isAvailable
                  ? <><NavLink to={`/voyageurs/${isAvailable.id}`}><div key={formattedDate} className={`day available ${past}`} title={isAvailable.nom}>{day.getDate()}</div></NavLink></>
                  : <><div key={formattedDate} className={`day unavailable ${past}`} title={formattedDate}>{day.getDate()}</div></>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
