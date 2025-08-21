import React, { useState } from 'react';
import { createHealthEntry } from '../api';

function HealthEntryForm({ token, onEntryAdded }) {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [sugar, setSugar] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!date || !weight || !bloodPressure || !sugar) {
      setError('Please fill all fields');
      return;
    }

    const entry = {
      date,
      weight: parseFloat(weight),
      bloodPressure: parseFloat(bloodPressure),
      sugar: parseFloat(sugar)
    };

    try {
      const data = await createHealthEntry(token, entry);
      setSuccess('Entry added successfully!');
      setDate('');
      setWeight('');
      setBloodPressure('');
      setSugar('');

      if (onEntryAdded) onEntryAdded(data); // refresh parent list
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to add entry');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h3>Add New Entry</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Blood Pressure" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Sugar" value={sugar} onChange={(e) => setSugar(e.target.value)} required />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default HealthEntryForm;
