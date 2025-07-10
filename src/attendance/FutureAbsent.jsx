import React, { useState } from 'react';
import './attendance.css';

const components = [
  { key: 'lecture', label: 'Lecture', weight: 1 },
  { key: 'practical', label: 'Practical', weight: 0.5 },
  { key: 'tutorial', label: 'Tutorial', weight: 0.25 },
  { key: 'skill', label: 'Skill', weight: 0.25 },
];

const FutureAbsent = () => {
  const [conducted, setConducted] = useState({});
  const [present, setPresent] = useState({});
  const [futureAbsent, setFutureAbsent] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (type, key, value) => {
    if (type === 'conducted') {
      setConducted({ ...conducted, [key]: value });
    } else if (type === 'present') {
      setPresent({ ...present, [key]: value });
    } else {
      setFutureAbsent({ ...futureAbsent, [key]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalNumerator = 0, totalDenominator = 0;
    let totalNumeratorFuture = 0, totalDenominatorFuture = 0;
    const perComponent = {};
    components.forEach(({ key, weight }) => {
      const c = parseInt(conducted[key] || 0, 10);
      const p = parseInt(present[key] || 0, 10);
      const f = parseInt(futureAbsent[key] || 0, 10);
      const percentNoFuture = c > 0 ? (p / c) * 100 : 0;
      const percentWithFuture = (c + f) > 0 ? (p / (c + f)) * 100 : 0;
      perComponent[key] = {
        percentNoFuture,
        percentWithFuture,
        present: p,
        conducted: c,
        future: f,
      };
      // For total attendance
      totalNumerator += p * weight;
      totalDenominator += weight * c;
      totalNumeratorFuture += p * weight;
      totalDenominatorFuture += weight * (c + f);
    });
    const totalAttendance = totalDenominator > 0 ? (totalNumerator / totalDenominator) * 100 : 0;
    const totalAttendanceWithFuture = totalDenominatorFuture > 0 ? (totalNumeratorFuture / totalDenominatorFuture) * 100 : 0;
    setResult({ perComponent, totalAttendance, totalAttendanceWithFuture });
  };

  const handleReset = () => {
    setConducted({});
    setPresent({});
    setFutureAbsent({});
    setResult(null);
  };

  return (
    <div className="attendance-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginBottom: 24 }}>
          {components.map(({ key, label }) => (
            <React.Fragment key={key}>
              <div className="attendance-box">
                <label>{label} conducted classes</label>
                <input
                  type="number"
                  min="0"
                  value={conducted[key] || ''}
                  onChange={e => handleChange('conducted', key, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()} conducted classes`}
                />
              </div>
              <div className="attendance-box">
                <label>{label} present classes</label>
                <input
                  type="number"
                  min="0"
                  value={present[key] || ''}
                  onChange={e => handleChange('present', key, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()} present classes`}
                />
              </div>
              <div className="attendance-box">
                <label>{label} attendance in percentage (without future absent)</label>
                <div style={{ marginTop: 12, fontWeight: 600, color: '#4f6ef7' }}>
                  {result ? `${result.perComponent[key].percentNoFuture.toFixed(2)}%` : '--'}
                </div>
              </div>
              <div className="attendance-box">
                <label>Enter future absent classes of {label}</label>
                <input
                  type="number"
                  min="0"
                  value={futureAbsent[key] || ''}
                  onChange={e => handleChange('future', key, e.target.value)}
                  placeholder={`Enter future absent classes`}
                />
              </div>
              <div className="attendance-box">
                <label>Attendance with future absent</label>
                <div style={{ marginTop: 12, fontWeight: 600, color: '#4f6ef7' }}>
                  {result ? `${result.perComponent[key].percentWithFuture.toFixed(2)}%` : '--'}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 24 }}>
          <div className="attendance-box" style={{ flex: 1, minWidth: 220, border: '1px solid #b6e2b6', color: '#222' }}>
            <div style={{ fontWeight: 600 }}>Total attendance without future absent</div>
            <div style={{ marginTop: 10, fontWeight: 700, color: '#4f6ef7', fontSize: '1.1em' }}>
              {result ? `${result.totalAttendance.toFixed(2)}%` : '--'}
            </div>
          </div>
          <div className="attendance-box" style={{ flex: 1, minWidth: 220, border: '1px solid #b6e2b6', color: '#222' }}>
            <div style={{ fontWeight: 600 }}>Total attendance with future absent</div>
            <div style={{ marginTop: 10, fontWeight: 700, color: '#4f6ef7', fontSize: '1.1em' }}>
              {result ? `${result.totalAttendanceWithFuture.toFixed(2)}%` : '--'}
            </div>
          </div>
        </div>
        <div className="attendance-actions">
          <button type="submit" className="calculate-btn">Calculate</button>
          <button type="reset" className="reset-btn">&#8635; Reset</button>
        </div>
      </form>
    </div>
  );
};

export default FutureAbsent; 