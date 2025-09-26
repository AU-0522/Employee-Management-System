import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attendance.css"; // Import your CSS file

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    employeeName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    bloodGroup: "",
    gender: "",
    employmentStatus: "",
    file: null,
  });
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch attendance records when the component mounts
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("http://localhost:8088/attendance");
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewEmployee({ ...newEmployee, file: e.target.files[0] });
  };

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = getCurrentTime();
    const formData = new FormData();
    formData.append("employeeName", newEmployee.employeeName);
    formData.append("email", newEmployee.email);
    formData.append("phone", newEmployee.phone);
    formData.append("address", newEmployee.address);
    formData.append("dob", newEmployee.dob);
    formData.append("bloodGroup", newEmployee.bloodGroup);
    formData.append("gender", newEmployee.gender);
    formData.append("employmentStatus", newEmployee.employmentStatus);
    formData.append("file", newEmployee.file);
    formData.append("timeIn", currentTime);
    formData.append("timeOut", currentTime);
    formData.append("status", "Pending");

    try {
      const response = await axios.post(
        "http://localhost:8088/add_attendance",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAttendanceData([...attendanceData, response.data]);
      setShowForm(false);
      setNewEmployee({
        employeeName: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        bloodGroup: "",
        gender: "",
        employmentStatus: "",
        file: null,
      });
    } catch (error) {
      console.error("Error adding new attendance record:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusChange = async (index, newStatus) => {
    const updatedData = [...attendanceData];
    updatedData[index].status = newStatus;
    try {
      await axios.put(`http://localhost:8088/update_attendance/${updatedData[index].employeeId}`, {
        status: newStatus,
      });
      setAttendanceData(updatedData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="headerContent">
          <div className="datePickerContainer">
            <label className="label">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="search-input"
            />
          </div>
        </div>
        <h1>Attendance</h1>
      </div>

      {showForm && (
        <div className="formContainer">
          <h2>Add Employee</h2>
          <form onSubmit={handleSubmit} className="form">
            {/* Form fields */}
            <input
              type="text"
              name="employeeName"
              placeholder="Employee Name"
              value={newEmployee.employeeName}
              onChange={handleInputChange}
              className="search-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={handleInputChange}
              className="search-input"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              value={newEmployee.phone}
              onChange={handleInputChange}
              className="search-input"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newEmployee.address}
              onChange={handleInputChange}
              className="search-input"
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={newEmployee.dob}
              onChange={handleInputChange}
              className="search-input"
              required
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              value={newEmployee.bloodGroup}
              onChange={handleInputChange}
              className="search-input"
              required
            />
            <select
              name="gender"
              value={newEmployee.gender}
              onChange={handleInputChange}
              className="search-input"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="employmentStatus"
              value={newEmployee.employmentStatus}
              onChange={handleInputChange}
              className="search-input"
              required
            >
              <option value="" disabled>Select Employment Status</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="search-input"
            />
            <button type="submit" className="button">Submit</button>
          </form>
        </div>
      )}

      <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Employee ID</th>
              <th className="table-header">Employee Name</th>
              <th className="table-header">Time In</th>
              <th className="table-header">Time Out</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td className="table-data">{record.employeeId}</td>
                <td className="table-data">{record.employeeName}</td>
                <td className="table-data">{record.timeIn}</td>
                <td className="table-data">{record.timeOut}</td>
                <td className="table-data">
                  <select
                    value={record.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="search-input"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
