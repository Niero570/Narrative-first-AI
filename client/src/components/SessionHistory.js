import React from 'react';

const SessionHistory = ({ entries }) => {
  return (
    <div className="session-history">
      <div className="history-header">Past Entries</div>
      <ul className="history-list">
        {entries.map((entry, index) => (
          <li key={index} className="history-item">
            <span className="history-date">{entry.date}</span>
            <span className="history-summary">{entry.summary}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionHistory;