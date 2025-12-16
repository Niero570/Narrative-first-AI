import React from 'react';

const SessionHistory = ({ entries }) => {
  return (
    <div className="session-history">
      <div className="history-header">Past Entries</div>
      <ul className="history-list">
        {entries.map((entry, index) => (
          <li key={entry.id} className="history-item">
            <span className="history-date">{entry.timestamp}</span>
            <span className="history-summary">{entry.narrative.substring(0, 50)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionHistory;