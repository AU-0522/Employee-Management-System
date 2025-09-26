import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeDetails.css'; // Import the CSS file

const EmployeeDetails = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch employee data from the server on component mount
    axios.get('/api/employees')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleEdit = (empCode) => {
    alert(`Edit record with Emp Code: ${empCode}`);
    // Add logic here to update employee details
  };

  const handleDelete = (empCode) => {
    // Delete employee data using axios
    axios.delete(`/api/employees/${empCode}`)
      .then(() => {
        setData(data.filter(item => item.empCode !== empCode));
      })
      .catch(error => {
        console.error('There was an error deleting the employee!', error);
      });
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.empCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="header">Employee Details</h1>
      <input
        type="text"
        placeholder="Search by Name or Employee Code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="table">
        <thead>
          <tr>
            {['Sr No', 'Emp Code', 'Name', 'Email', 'Phone No', 'Address', 'DOB', 'Joining Date', 'Blood Group', 'Gender', 'Employee Status', 'Salary', 'Photo', 'Edit', 'Delete'].map((header) => (
              <th key={header} className="table-header">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.empCode}>
              {Object.values(item).map((value, index) => (
                <td key={index} className="table-data">
                  {index === 12 && value ? (
                    <img src={value} alt={`${item.name}'s photo`} className="employee-photo" />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td className="table-data">
                <button
                  onClick={() => handleEdit(item.empCode)}
                  className="button"
                >
                  Edit
                </button>
              </td>
              <td className="table-data">
                <button
                  onClick={() => handleDelete(item.empCode)}
                  className="button delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
