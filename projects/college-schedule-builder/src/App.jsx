import React, { useState } from 'react';

const ScheduleBuilder = () => {
  const [semester, setSemester] = useState('Fall 2026');
  const [viewMode, setViewMode] = useState('list'); 
  const [courses, setCourses] = useState([
    { id: 1, name: 'CST 2307 - Networking Fundamentals', day: 'Tuesday', start: '2:00pm', end: '3:00pm' },
    { id: 2, name: 'CST 2301 - Multimedia and Mobile Device Programming', day: 'Monday', start: '10:00am', end: '11:30am' },
    { id: 3, name: 'ACC 1101 - Principles of Accounting', day: 'Wednesday', start: '1:00pm', end: '2:15pm' }
  ]);

  const [formData, setFormData] = useState({ name: '', day: 'Tuesday', start: '', end: '' });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.start || !formData.end) return;

    const newCourse = { id: Date.now(), ...formData };
    setCourses([...courses, newCourse]);
    setFormData({ name: '', day: 'Tuesday', start: '', end: '' });
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const colors = {
    primaryBlue: '#1a73e8',
    buttonHover: '#155cb4',
    bgContainer: '#f1f3f4',
    borderLight: '#dadce0',
    textMain: '#202124',
    textMuted: '#70757a',
    textPlaceholder: '#9aa0a6',
    white: '#ffffff',
    dangerRed: '#d93025',
    dangerHover: '#b31412',
    calendarHeaderBg: '#f8f9fa'
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const inputStyle = {
    backgroundColor: colors.white,
    color: colors.textMain,
    border: `1px solid ${colors.borderLight}`,
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', border: `1px solid ${colors.borderLight}`, borderRadius: '16px', padding: '40px', backgroundColor: colors.white, boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: colors.textMain, margin: 0 }}>College Schedule Builder</h1>
        <div>
          <span style={{ fontSize: '14px', color: colors.textMuted, marginRight: '8px' }}>Semester:</span>
          <select 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)}
            style={{ ...inputStyle, width: 'auto', display: 'inline-block' }}
          >
            <option value="Fall 2026">Fall 2026</option>
            <option value="Winter 2026">Winter 2026</option>
            <option value="Spring 2027">Spring 2027</option>

          </select>
        </div>
      </div>

      <form onSubmit={handleAddCourse} style={{ backgroundColor: colors.bgContainer, padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
        <h2 style={{ textAlign: 'center', color: colors.primaryBlue, fontSize: '18px', marginTop: 0, marginBottom: '20px', fontWeight: '600' }}>Add your courses</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', marginBottom: '20px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px', textAlign: 'center' }}>Course name</label>
            <input 
              type="text" 
              placeholder="e.g. CST 2309 or Intro to CS"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px', textAlign: 'center' }}>Day</label>
            <select 
              value={formData.day}
              onChange={(e) => setFormData({...formData, day: e.target.value})}
              style={inputStyle}
            >
              {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px', textAlign: 'center' }}>Start</label>
            <input 
              type="text" 
              placeholder="2:00pm"
              value={formData.start}
              onChange={(e) => setFormData({...formData, start: e.target.value})}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: colors.textMuted, marginBottom: '6px', textAlign: 'center' }}>End</label>
            <input 
              type="text" 
              placeholder="3:00pm"
              value={formData.end}
              onChange={(e) => setFormData({...formData, end: e.target.value})}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ backgroundColor: colors.primaryBlue, color: colors.white, border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>+ Add</button>
        </div>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.textMain, margin: 0 }}>Your Courses ({semester})</h2>
        <div style={{ border: `1px solid ${colors.borderLight}`, borderRadius: '8px', overflow: 'hidden', display: 'flex' }}>
          <button onClick={() => setViewMode('list')} style={{ border: 'none', padding: '8px 16px', fontSize: '14px', backgroundColor: viewMode === 'list' ? colors.primaryBlue : colors.white, color: viewMode === 'list' ? colors.white : colors.textMain, cursor: 'pointer' }}>List</button>
          <button onClick={() => setViewMode('calendar')} style={{ border: 'none', padding: '8px 16px', fontSize: '14px', backgroundColor: viewMode === 'calendar' ? colors.primaryBlue : colors.white, color: viewMode === 'calendar' ? colors.white : colors.textMain, cursor: 'pointer' }}>Calendar</button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div style={{ border: `1px solid ${colors.borderLight}`, borderRadius: '12px', overflow: 'hidden' }}>
          {courses.map(course => (
            <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${colors.borderLight}`, backgroundColor: colors.white }}>
              <div>
                <div style={{ fontWeight: '600', color: colors.textMain, marginBottom: '4px' }}>{course.name}</div>
                <div style={{ fontSize: '14px', color: colors.textMuted }}>{course.day} | {course.start} - {course.end}</div>
              </div>
              <button onClick={() => handleRemoveCourse(course.id)} style={{ backgroundColor: 'transparent', color: colors.dangerRed, border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', border: `1px solid ${colors.borderLight}`, borderRadius: '12px', padding: '16px', backgroundColor: colors.white }}>
          {daysOfWeek.map(day => (
            <div key={day} style={{ minHeight: '200px', borderRight: day !== 'Friday' ? `1px solid ${colors.borderLight}` : 'none', paddingRight: '8px' }}>
              <div style={{ fontWeight: '600', fontSize: '14px', color: colors.textMain, borderBottom: `1px solid ${colors.borderLight}`, paddingBottom: '8px', marginBottom: '8px', textAlign: 'center' }}>{day}</div>
              {courses.filter(c => c.day === day).map(course => (
                <div key={course.id} style={{ backgroundColor: '#e8f0fe', borderLeft: `4px solid ${colors.primaryBlue}`, padding: '8px', borderRadius: '4px', marginBottom: '8px', fontSize: '12px' }}>
                  <div style={{ fontWeight: '600', color: '#185abc', marginBottom: '2px' }}>{course.name.split(' - ')[0]}</div>
                  <div style={{ color: '#185abc' }}>{course.start}-{course.end}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleBuilder;


