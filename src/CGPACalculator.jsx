import React, { useState } from 'react';
import { TextField, IconButton, Typography, Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './WowStyles.css';

const gradeOptions = [
  { letter: 'O', point: 10 },
  { letter: 'A+', point: 9 },
  { letter: 'A', point: 8 },
  { letter: 'B+', point: 7 },
  { letter: 'B', point: 6 },
  { letter: 'C', point: 5 },
  { letter: 'F', point: 0 },
];

function calculateSGPA(courses) {
  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits || 0), 0);
  const totalCreditPoints = courses.reduce((sum, c) => sum + (Number(c.credits || 0) * Number(c.gradePoint || 0)), 0);
  return totalCredits > 0 ? (totalCreditPoints / totalCredits).toFixed(2) : '0.00';
}

function calculateCGPA(semesters) {
  const totalCredits = semesters.reduce((sum, s) => sum + Number(s.credits || 0), 0);
  const totalWeightedSGPA = semesters.reduce((sum, s) => sum + (Number(s.sgpa || 0) * Number(s.credits || 0)), 0);
  return totalCredits > 0 ? (totalWeightedSGPA / totalCredits).toFixed(2) : '0.00';
}

export default function CGPACalculator({ show }) {
  // SGPA State
  const [courses, setCourses] = useState([
    { gradePoint: '', credits: '' },
  ]);
  // CGPA State
  const [semesters, setSemesters] = useState([
    { sgpa: '', credits: '' },
  ]);

  // Handlers for SGPA
  const handleCourseChange = (idx, field, value) => {
    setCourses(courses => courses.map((c, i) =>
      i === idx ? {
        ...c,
        [field]: value,
      } : c
    ));
  };
  const addCourse = () => setCourses([...courses, { gradePoint: '', credits: '' }]);
  const removeCourse = idx => setCourses(courses => courses.length > 1 ? courses.filter((_, i) => i !== idx) : courses);

  // Handlers for CGPA
  const handleSemesterChange = (idx, field, value) => {
    setSemesters(semesters => semesters.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s
    ));
  };
  const addSemester = () => setSemesters([...semesters, { sgpa: '', credits: '' }]);
  const removeSemester = idx => setSemesters(semesters => semesters.length > 1 ? semesters.filter((_, i) => i !== idx) : semesters);

  // Calculations
  const sgpa = calculateSGPA(courses);
  const cgpa = calculateCGPA(semesters);
  const totalSGPACredits = courses.reduce((sum, c) => sum + Number(c.credits || 0), 0);
  const totalSGPACreditPoints = courses.reduce((sum, c) => sum + (Number(c.credits || 0) * Number(c.gradePoint || 0)), 0);
  const totalCGPACredits = semesters.reduce((sum, s) => sum + Number(s.credits || 0), 0);
  const totalCGPAWeightedSGPA = semesters.reduce((sum, s) => sum + (Number(s.sgpa || 0) * Number(s.credits || 0)), 0);

  return (
    <Paper elevation={3} className="wow-card" style={{ width: 350, minHeight: 220, borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', margin: '0 auto' }}>
      {show === 'sgpa' && (
        <>
          <Typography variant="h5" className="wow-title" gutterBottom>SGPA Calculator</Typography>
          {courses.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 12 }}>
              <TextField
                label={<span className="wow-label">Grade Points *</span>}
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.01 }}
                value={c.gradePoint}
                onChange={e => handleCourseChange(i, 'gradePoint', e.target.value)}
                required
                style={{ flex: 1, marginRight: 8 }}
              />
              <TextField
                label={<span className="wow-label">Credits *</span>}
                type="number"
                inputProps={{ min: 0, step: 1 }}
                value={c.credits}
                onChange={e => handleCourseChange(i, 'credits', e.target.value)}
                required
                style={{ flex: 1, marginRight: 8 }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => removeCourse(i)}
                className="wow-delete"
                disabled={courses.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="contained" className="wow-btn" style={{ marginTop: 8, marginBottom: 16 }} onClick={addCourse}>Add Course</Button>
          <Typography variant="body1"><b>Total Credits:</b> {totalSGPACredits} &nbsp; <b>Total Credit Points:</b> {totalSGPACreditPoints}</Typography>
          <Typography variant="body1" style={{ marginTop: 8 }}>
            <b>SGPA = Total Credit Points / Total Credits = {totalSGPACreditPoints} / {totalSGPACredits} = <span style={{ color: 'green' }}>{sgpa}</span></b>
          </Typography>
        </>
      )}
      {show === 'cgpa' && (
        <>
          <Typography variant="h5" className="wow-title" gutterBottom>CGPA Calculator</Typography>
          {semesters.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 12 }}>
              <TextField
                label={<span className="wow-label">SGPA *</span>}
                type="number"
                inputProps={{ min: 0, max: 10, step: 0.01 }}
                value={s.sgpa}
                onChange={e => handleSemesterChange(i, 'sgpa', e.target.value)}
                required
                style={{ flex: 1, marginRight: 8 }}
              />
              <TextField
                label={<span className="wow-label">Credits *</span>}
                type="number"
                inputProps={{ min: 0, step: 1 }}
                value={s.credits}
                onChange={e => handleSemesterChange(i, 'credits', e.target.value)}
                required
                style={{ flex: 1, marginRight: 8 }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => removeSemester(i)}
                className="wow-delete"
                disabled={semesters.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button variant="contained" className="wow-btn" style={{ marginTop: 8, marginBottom: 16 }} onClick={addSemester}>Add Semester</Button>
          <Typography variant="body1"><b>Total Credits:</b> {totalCGPACredits} &nbsp; <b>Total Weighted SGPA:</b> {totalCGPAWeightedSGPA.toFixed(2)}</Typography>
          <Typography variant="body1" style={{ marginTop: 8 }}>
            <b>CGPA = Total Weighted SGPA / Total Credits = {totalCGPAWeightedSGPA.toFixed(2)} / {totalCGPACredits} = <span style={{ color: 'green' }}>{cgpa}</span></b>
          </Typography>
        </>
      )}
    </Paper>
  );
} 