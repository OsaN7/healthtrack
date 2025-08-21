import React, { useState, useEffect } from 'react';
import { getHealthEntries, createHealthEntry, deleteHealthEntry } from '../api';
import '../styles/App.css';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState("");
  const [water_l, setWater] = useState("");
  const [sleep_hr, setSleep] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");

  const token = localStorage.getItem("token"); // ✅ always read token here

  useEffect(() => {
    if (token) {
      loadEntries();
    }
  }, [token]);

  const loadEntries = async () => {
    try {
      const data = await getHealthEntries(token);
      setEntries(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        date,
        water_l: parseFloat(water_l),
        sleep_hr: parseFloat(sleep_hr),
        calories: parseInt(calories),
        steps: parseInt(steps),
      };
      await createHealthEntry(token, newEntry);
      loadEntries();
      setDate("");
      setWater("");
      setSleep("");
      setCalories("");
      setSteps("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHealthEntry(token, id);
      loadEntries();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Health Tracker</h1>
      <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
        Logout
      </button>

      <h2>Add New Entry</h2>
      <form onSubmit={handleAdd}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="number" placeholder="Water (L)" value={water_l} onChange={(e) => setWater(e.target.value)} required />
        <input type="number" placeholder="Sleep (hrs)" value={sleep_hr} onChange={(e) => setSleep(e.target.value)} required />
        <input type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        <input type="number" placeholder="Steps" value={steps} onChange={(e) => setSteps(e.target.value)} required />
        <button type="submit">Add Entry</button>
      </form>

      <h2>Your Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {new Date(entry.date).toLocaleDateString()} - {entry.steps} steps, {entry.calories} cal, {entry.water_l}L water, {entry.sleep_hr}h sleep
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
