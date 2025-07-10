import React, { useState } from 'react';
import './attendance.css';

const Simple = () => {
  const [present, setPresent] = useState('');
  const [absent, setAbsent] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const p = parseInt(present, 10) || 0;
    const a = parseInt(absent, 10) || 0;
    const total = p + a;
    if (total > 0) {
      const percentage = (p / total) * 100;
      setResult(percentage.toFixed(2));
    } else {
      setResult('0.00');
    }
  };

  const handleReset = () => {
    setPresent('');
    setAbsent('');
    setResult(null);
  };

  return (
    <div className="attendance-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="attendance-row">
          <div className="attendance-box">
            <label>Total Present Classes</label>
            <input
              type="number"
              min="0"
              value={present}
              onChange={e => setPresent(e.target.value)}
              placeholder="Enter present classes"
              required
            />
          </div>
          <div className="attendance-box">
            <label>Total Absent Classes</label>
            <input
              type="number"
              min="0"
              value={absent}
              onChange={e => setAbsent(e.target.value)}
              placeholder="Enter absent classes"
              required
            />
          </div>
        </div>
        <div className="attendance-actions">
          <button type="submit" className="calculate-btn">Calculate Attendance</button>
          <button type="reset" className="reset-btn">&#8635; Reset</button>
        </div>
        {result !== null && (
          <div style={{ marginTop: 24, fontSize: '1.2em', fontWeight: 600, color: '#4f6ef7' }}>
            Attendance Percentage: {result}%
          </div>
        )}
      </form>
    </div>
  );
};

export default Simple; 