import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './AddEmp.css'; // Import the CSS file

const AddEmp = () => {
  const [formData, setFormData] = useState({
    employeeCode: '',
    employeeName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    bloodGroup: '',
    joiningDate: '',
    gender: '',
    salary: '',
    designation: '',
    photo: null,
    employmentStatus: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFormData({
      employeeCode: '',
      employeeName: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      bloodGroup: '',
      joiningDate: '',
      gender: '',
      salary: '',
      designation: '',
      photo: null,
      employmentStatus: '',
    });
    setPhotoPreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('employeeCode', formData.employeeCode);
    formDataToSend.append('empName', formData.employeeName);
    formDataToSend.append('emailId', formData.email);
    formDataToSend.append('phnNo', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('bloodGrp', formData.bloodGroup);
    formDataToSend.append('joinDate', formData.joiningDate);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('salary', parseFloat(formData.salary));
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('photo', formData.photo);  // This is correct
    formDataToSend.append('employmentStatus', formData.employmentStatus);

    try {
      await axios.post('http://localhost:8088/add_employee', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee Data Submitted Successfully!');
      resetForm();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting employee data:', error);
      alert('Error submitting employee data.');
    }
  };

  return (
    <div className="employee-form">
      <h1>Add Employee</h1>
      {submitted ? (
        <div className="success-message">
          <p>Employee Data Submitted Successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-left">
              <div className="form-row-group">
                <div className="form-row">
                  <input
                    type="text"
                    name="employeeCode"
                    placeholder="Employee Code"
                    value={formData.employeeCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="employeeName"
                    placeholder="Employee Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="date"
                    name="joiningDate"
                    id="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    placeholder="Joining Date"
                    required
                  />
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <input
                    type="text"
                    name="bloodGroup"
                    id="bloodGroup"
                    placeholder="Blood Group"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    required
                  />
                  {photoPreview && (
                    <div className="photo-preview">
                      <img src={photoPreview} alt="Employee Photo" />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-row">
                <select
                  name="employmentStatus"
                  id="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employment Status</option>
                  <option value="Confirm">Confirm</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Probation">Probation</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddEmp;
