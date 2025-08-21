import React, { useState, useEffect } from 'react';
import {
  getHealthEntries,
  createHealthEntry,
  deleteHealthEntry,
} from '../api';

function Dashboard({ token, onLogout }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [error, setError] = useState('');

  const fetchEntries = async () => {
    try {
      const response = await getHealthEntries(token);
      setEntries(response.data);
    } catch (err) {
      setError('Failed to load entries');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddEntry = async () => {
    if (!newEntry) return;
    try {
      await createHealthEntry(token, { description: newEntry });
      setNewEntry('');
      fetchEntries();
    } catch (err) {
      setError('Failed to add entry');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHealthEntry(token, id);
      fetchEntries();
    } catch (err) {
      setError('Failed to delete entry');
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="entry-input-group">
        <input
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Add new health entry"
        />
        <button onClick={handleAddEntry}>Add</button>
      </div>
      <ul className="entries-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.description}
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;