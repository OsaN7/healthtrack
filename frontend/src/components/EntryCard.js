import React from 'react';
import '../styles/App.css';

function EntryCard({ entry, onDelete }) {
  const waterPercent = Math.min((entry.water_l / 10) * 100, 100);
  const sleepPercent = Math.min((entry.sleep_hr / 12) * 100, 100);
  const stepsPercent = Math.min((entry.steps / 20000) * 100, 100);

  return (
    <div className="card entry-card">
      <h4>{new Date(entry.date).toLocaleDateString()}</h4>

      <div className="progress-item">
        <label>Water (L): {entry.water_l}</label>
        <div className="progress-bar">
          <div className="fill" style={{ '--progress-width': `${waterPercent}%`, width: `${waterPercent}%` }}></div>
        </div>
      </div>

      <div className="progress-item">
        <label>Sleep (hrs): {entry.sleep_hr}</label>
        <div className="progress-bar">
          <div className="fill" style={{ '--progress-width': `${sleepPercent}%`, width: `${sleepPercent}%` }}></div>
        </div>
      </div>

      <div className="progress-item">
        <label>Steps: {entry.steps}</label>
        <div className="progress-bar">
          <div className="fill" style={{ '--progress-width': `${stepsPercent}%`, width: `${stepsPercent}%` }}></div>
        </div>
      </div>

      <button className="delete-btn" onClick={() => onDelete(entry.id)}>Delete</button>
    </div>
  );
}

export default EntryCard;
