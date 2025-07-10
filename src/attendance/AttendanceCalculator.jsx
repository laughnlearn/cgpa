import React, { useState } from 'react';
import './attendance.css';
import Simple from './Simple';
import FutureAbsent from './FutureAbsent';

const getStars = (value) => {
  if (value >= 95) return 5;
  if (value >= 90) return 4;
  if (value >= 85) return 3;
  if (value >= 80) return 2;
  if (value >= 75) return 1;
  return 0;
};

const tabList = [
  { key: 'lpts', label: 'L-P-T-S Calculate' },
  { key: 'simple', label: 'Simple Attendance' },
  { key: 'future', label: 'Future Absent' },
];

const AttendanceCalculator = () => {
  const [result, setResult] = useState(null);
  const [componentStars, setComponentStars] = useState({});
  const [caution, setCaution] = useState([]);
  const [activeTab, setActiveTab] = useState('lpts');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const L = form.lecture.value !== '' ? parseFloat(form.lecture.value) : null;
    const P = form.practical.value !== '' ? parseFloat(form.practical.value) : null;
    const T = form.tutorial.value !== '' ? parseFloat(form.tutorial.value) : null;
    const S = form.skilling.value !== '' ? parseFloat(form.skilling.value) : null;

    let numerator = 0;
    let denominator = 0;
    if (L !== null) {
      numerator += L * 1;
      denominator += 1;
    }
    if (P !== null) {
      numerator += P * 0.5;
      denominator += 0.5;
    }
    if (T !== null) {
      numerator += T * 0.25;
      denominator += 0.25;
    }
    if (S !== null) {
      numerator += S * 0.25;
      denominator += 0.25;
    }

    let weighted = 0;
    if (denominator > 0) {
      weighted = numerator / denominator;
      setResult(weighted.toFixed(2));
    } else {
      setResult('0.00');
    }

    setComponentStars({
      lecture: L !== null ? getStars(L) : null,
      practical: P !== null ? getStars(P) : null,
      tutorial: T !== null ? getStars(T) : null,
      skilling: S !== null ? getStars(S) : null,
    });

    // Caution logic
    const cautionArr = [];
    if (L !== null && L < 85) cautionArr.push('L');
    if (P !== null && P < 85) cautionArr.push('P');
    if (T !== null && T < 85) cautionArr.push('T');
    if (S !== null && S < 85) cautionArr.push('S');
    setCaution(cautionArr);
  };

  const handleReset = () => {
    setResult(null);
    setComponentStars({});
    setCaution([]);
  };

  const renderStars = (count) => {
    if (!count) return null;
    return (
      <span style={{ color: '#FFD700', marginLeft: 8 }}>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </span>
    );
  };

  return (
    <div className="attendance-container">
      {/* Secondary nav tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, gap: 8 }}>
        {tabList.map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 22px',
              border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #4f6ef7' : '3px solid transparent',
              background: activeTab === tab.key ? '#f0f4ff' : '#f8fafc',
              color: activeTab === tab.key ? '#4f6ef7' : '#333',
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: '1.08em',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.18s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Show the correct tab content */}
      {activeTab === 'lpts' && (
        <form id="attendanceForm" onSubmit={handleSubmit} onReset={handleReset}>
          <div className="attendance-row">
            <div className="attendance-box">
              <label>Lecture Component (%) <span className="badge">100%</span></label>
              <input type="number" name="lecture" placeholder="Enter percentage" min="0" max="100" />
              {componentStars.lecture !== undefined && componentStars.lecture !== null && (
                <div style={{ marginTop: 8, fontSize: '1.1em' }}>
                  {renderStars(componentStars.lecture)}
                </div>
              )}
            </div>
            <div className="attendance-box">
              <label>Practical Component (%) <span className="badge">50%</span></label>
              <input type="number" name="practical" placeholder="Enter percentage" min="0" max="100" />
              {componentStars.practical !== undefined && componentStars.practical !== null && (
                <div style={{ marginTop: 8, fontSize: '1.1em' }}>
                  {renderStars(componentStars.practical)}
                </div>
              )}
            </div>
          </div>
          <div className="attendance-row">
            <div className="attendance-box">
              <label>Tutorial Component (%) <span className="badge">25%</span></label>
              <input type="number" name="tutorial" placeholder="Enter percentage" min="0" max="100" />
              {componentStars.tutorial !== undefined && componentStars.tutorial !== null && (
                <div style={{ marginTop: 8, fontSize: '1.1em' }}>
                  {renderStars(componentStars.tutorial)}
                </div>
              )}
            </div>
            <div className="attendance-box">
              <label>Skilling Component (%) <span className="badge">25%</span></label>
              <input type="number" name="skilling" placeholder="Enter percentage" min="0" max="100" />
              {componentStars.skilling !== undefined && componentStars.skilling !== null && (
                <div style={{ marginTop: 8, fontSize: '1.1em' }}>
                  {renderStars(componentStars.skilling)}
                </div>
              )}
            </div>
          </div>
          <div className="attendance-actions">
            <button type="submit" className="calculate-btn">Calculate Attendance</button>
            <button type="reset" className="reset-btn">&#8635; Reset</button>
          </div>
          {result !== null && (
            <div style={{ marginTop: 24, fontSize: '1.2em', fontWeight: 600, color: '#4f6ef7' }}>
              Weighted Attendance: {result}%
            </div>
          )}
          {caution.length > 0 && (
            <div style={{ marginTop: 16, color: '#d97706', fontWeight: 500, fontSize: '1.1em' }}>
              Be careful ({caution.join(', ')})  component to avoid condonation
            </div>
          )}
        </form>
      )}
      {activeTab === 'simple' && <Simple />}
      {activeTab === 'future' && <FutureAbsent />}
    </div>
  );
};

export default AttendanceCalculator; 