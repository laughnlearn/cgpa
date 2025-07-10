import './WowStyles.css';
import Navbar from './Navbar';
import React, { useState } from 'react';
import CGPACalculator from './CGPACalculator';
import AttendanceCalculator from './attendance/AttendanceCalculator';

function App() {
  const [section, setSection] = useState('sgpa');

  return (
    <>
      <Navbar onNav={setSection} />
      <div className="wow-bg" />
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        position: 'relative',
        zIndex: 1,
        marginTop: -45,
      }}>
        {(section === 'sgpa' || section === 'cgpa') && <CGPACalculator show={section} />}
        {section === 'attendance' && (
          <AttendanceCalculator />
        )}
      </div>
    </>
  );
}

export default App;
