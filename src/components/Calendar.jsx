import React from 'react';

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
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  for (let d = new Date(startOfYear); d <= endOfYear; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return days;
}

const Calendar = ({ availabilities }) => {
  const year = new Date().getFullYear();
  const daysOfYear = generateDaysOfYear(year);
  const availabilityMap = {};

  // Mark availability in a map
  availabilities.forEach(({ date_debut, date_fin }) => {
    let start = parseDate(date_debut);
    let end = parseDate(date_fin);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      availabilityMap[formatDate(d)] = true;
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

  return (
    <div className="calendar">
      {months.map((monthDays, index) => {
        const firstDayOfMonth = monthDays[0].getDay() || 7; // Adjust to make Monday the first day of the week
        const emptyDays = Array.from({ length: firstDayOfMonth - 1 });

        return (
          <div key={index} className="month">
            <h4>{new Date(year, index).toLocaleString('default', { month: 'long' })}</h4>
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
                return (
                  <div
                    key={formattedDate}
                    className={`day ${isAvailable ? 'available' : 'unavailable'}`}
                    title={formattedDate}
                  >
                    {day.getDate()}
                  </div>
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
