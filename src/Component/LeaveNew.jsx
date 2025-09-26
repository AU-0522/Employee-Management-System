import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './LeaveNew.css';  // Import your CSS

const LeaveNew = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    empid: '',
    designation: '',
    contactnum: '',
    leaveReason: '',
    leaveType: 'Full Day',
    leaveFrom: '',
    leaveTo: '',
    leaveTimeFrom: '',
    leaveTimeTo: '',
    signature: '',
    date: '',
    approval: '',
    comments: '',
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalTime: '', // New state to store formatted time
    isPrintingOrDownloading: false
  });

  useEffect(() => {
    // Update totalTime whenever totalHours or totalMinutes changes
    const { totalHours, totalMinutes } = formData;
    const formattedTime = `${totalHours} Hours ${totalMinutes} Minutes`;
    setFormData(prevFormData => ({ ...prevFormData, totalTime: formattedTime }));
  }, [formData.totalHours, formData.totalMinutes]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [name]: value,
      };

      if (name === 'leaveFrom' || name === 'leaveTo') {
        const { leaveFrom, leaveTo } = newFormData;
        if (leaveFrom && leaveTo) {
          const totalDays = calculateDays(leaveFrom, leaveTo);
          newFormData.totalDays = totalDays;
        } else {
          newFormData.totalDays = 0;
        }
      }

      if (name === 'leaveTimeFrom' || name === 'leaveTimeTo') {
        const { leaveTimeFrom, leaveTimeTo } = newFormData;
        if (leaveTimeFrom && leaveTimeTo) {
          const { hours, minutes } = calculateTime(leaveTimeFrom, leaveTimeTo);
          newFormData.totalHours = hours;
          newFormData.totalMinutes = minutes;
        } else {
          newFormData.totalHours = 0;
          newFormData.totalMinutes = 0;
        }
      }

      return newFormData;
    });
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start + 86400000; // Adding one day
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const calculateTime = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    const timeDiff = endDate - startDate;

    const totalMinutes = Math.ceil(timeDiff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adjust the URL to match your backend endpoint
      const response = await axios.post('http://your-backend-url/api/leave', formData);

      if (response.status === 200) {
        alert('Form submitted successfully');
      } else {
        alert('There was an issue submitting the form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  const handlePrint = () => {
    setFormData(prevFormData => ({ ...prevFormData, isPrintingOrDownloading: true }));
    document.getElementById("form-container").classList.add('hide-buttons');
    window.print();
    setTimeout(() => {
      setFormData(prevFormData => ({ ...prevFormData, isPrintingOrDownloading: false }));
      document.getElementById("form-container").classList.remove('hide-buttons');
    }, 1000);
  };

  const handleDownload = () => {
    setFormData(prevFormData => ({ ...prevFormData, isPrintingOrDownloading: true }));
    document.getElementById("form-container").classList.add('hide-buttons');
    html2canvas(document.querySelector("#form-container")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'leave-application-form.png';
      link.click();
      setFormData(prevFormData => ({ ...prevFormData, isPrintingOrDownloading: false }));
      document.getElementById("form-container").classList.remove('hide-buttons');
    });
  };

  return (
    <div className="leave-application-form">
      <h1>Leave Application Form</h1>
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row-group">
            <div className="form-row">
              <input
                type="text"
                name="employeeName"
                placeholder="Employee Name"
                value={formData.employeeName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                name="empid"
                placeholder="Employee ID"
                value={formData.empid}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row-group">
            <div className="form-row">
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="contactnum"
                placeholder="Contact Number"
                value={formData.contactnum}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-group form-row-group-horizontal">
            <div className="form-check-group">
              <label>Reason for Leave:</label>
              <div className="form-check-group">
                <label>
                  <input
                    type="radio"
                    name="leaveReason"
                    value="Sick"
                    onChange={handleChange}
                  /> Sick
                </label>
                <label>
                  <input
                    type="radio"
                    name="leaveReason"
                    value="Bereavement"
                    onChange={handleChange}
                  /> Bereavement
                </label>
                <label>
                  <input
                    type="radio"
                    name="leaveReason"
                    value="Unpaid Leave"
                    onChange={handleChange}
                  /> Unpaid Leave
                </label>
                <label>
                  <input
                    type="radio"
                    name="leaveReason"
                    value="Personal Leave"
                    onChange={handleChange}
                  /> Personal Leave
                </label>
                <label>
                  <input
                    type="radio"
                    name="leaveReason"
                    value="Other"
                    onChange={handleChange}
                  /> Other
                </label>
              </div>
            </div>

            <div className="form-check-group">
              <label>Leave Type:</label>
              <div className="form-check-group">
                <label>
                  <input
                    type="radio"
                    name="leaveType"
                    value="Full Day"
                    checked={formData.leaveType === 'Full Day'}
                    onChange={handleChange}
                  /> Full Day
                </label>
                <label>
                  <input
                    type="radio"
                    name="leaveType"
                    value="Half Day"
                    checked={formData.leaveType === 'Half Day'}
                    onChange={handleChange}
                  /> Half Day
                </label>
              </div>
            </div>
          </div>

          {formData.leaveType === 'Full Day' && (
            <div className="form-row-group">
              <div className="form-row">
                <input
                  type="date"
                  name="leaveFrom"
                  placeholder="Leave From"
                  value={formData.leaveFrom}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  type="date"
                  name="leaveTo"
                  placeholder="Leave To"
                  value={formData.leaveTo}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {formData.leaveType === 'Half Day' && (
            <div className="form-row-group">
              <div className="form-row">
                <input
                  type="time"
                  name="leaveTimeFrom"
                  placeholder="Leave Time From"
                  value={formData.leaveTimeFrom}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  type="time"
                  name="leaveTimeTo"
                  placeholder="Leave Time To"
                  value={formData.leaveTimeTo}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="form-row">
            <input
              type="text"
              name="reason"
              placeholder="leave reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-group">
            <div className="form-row">
              <label>Total Days: {formData.totalDays}</label>
            </div>
            <div className="form-row">
              <label>Total Time: {formData.totalTime}</label>
            </div>
          </div>
          {/* <div className="form-row">
            <button type="submit" className="green-button">Submit</button>
          </div> */}
          {!formData.isPrintingOrDownloading && (
            <div className="form-row-group form-row-group-horizontal">
              <div className="form-row">
                <button type="button" onClick={handlePrint} className="green-button">Submit</button>
              </div>
              <div className="form-row">
                <button type="button" onClick={handleDownload} className="green-button">Download</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LeaveNew;
