import React, { useState } from 'react';
import axios from 'axios';
import './Payroll.css';

function Payroll() {
  // Initialize state for all form fields
  const [formData, setFormData] = useState({
    employeeCode: '',
    employeeName: '',
    dateOfJoining: '',
    designation: '',
    grade: '',
    department: '',
    location: '',
    payMode: '',
    bankName: '',
    bankAccountNumber: '',
    pfNumber: '',
    uanNumber: '',
    panNumber: '',
    esiNumber: '',
    daysInMonth: '',
    workdays: '',
    lopDays: '',
    lopReversalDays: '',
    leaveEncashDays: '',
    holidayDays: '',
    advanceBonus: '',
    basic: '',
    hra: '',
    otherAllowances: '',
    mealCard: '',
    specialistAllowance: '',
    pf: '',
    professionalTax: '',
    laborWelfareFund: '',
    mealCardDeduction: '',
    totalEarnings: '',
    totalDeductions: '',
    netPay: '',
    totalNetPayableAmount: '',
  });

  // Handle change in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data to the backend using axios
    axios.post('/api/payroll', formData)
      .then((response) => {
        alert('Payroll data submitted successfully!');
        // Optionally, clear the form after submission
        setFormData({
          employeeCode: '',
          employeeName: '',
          dateOfJoining: '',
          designation: '',
          grade: '',
          department: '',
          location: '',
          payMode: '',
          bankName: '',
          bankAccountNumber: '',
          pfNumber: '',
          uanNumber: '',
          panNumber: '',
          esiNumber: '',
          daysInMonth: '',
          workdays: '',
          lopDays: '',
          lopReversalDays: '',
          leaveEncashDays: '',
          holidayDays: '',
          advanceBonus: '',
          basic: '',
          hra: '',
          otherAllowances: '',
          mealCard: '',
          specialistAllowance: '',
          pf: '',
          professionalTax: '',
          laborWelfareFund: '',
          mealCardDeduction: '',
          totalEarnings: '',
          totalDeductions: '',
          netPay: '',
          totalNetPayableAmount: '',
        });
      })
      .catch((error) => {
        console.error('There was an error submitting the payroll data!', error);
      });
  };

  return (
    <div className="payroll">
      <h2>Payroll Salary Slip</h2>
      <form className="salary-slip" onSubmit={handleSubmit}>
        <div className="details-wrapper">
          <div className="section employee-details">
            <h3>Employee Details</h3>
            <div className="form-group">
              <label>Employee Code:</label>
              <input type="text" name="employeeCode" value={formData.employeeCode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Employee Name:</label>
              <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Date of Joining:</label>
              <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Designation:</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Grade:</label>
              <input type="text" name="grade" value={formData.grade} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
          </div>

          <div className="section bank-details">
            <h3>Bank Details</h3>
            <div className="form-group">
              <label>Pay Mode:</label>
              <input type="text" name="payMode" value={formData.payMode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bank Name:</label>
              <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bank Account Number:</label>
              <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>PF Number:</label>
              <input type="text" name="pfNumber" value={formData.pfNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>UAN Number:</label>
              <input type="text" name="uanNumber" value={formData.uanNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>PAN Number:</label>
              <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>ESI Number:</label>
              <input type="text" name="esiNumber" value={formData.esiNumber} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="section work-details">
          <h3>Work Details</h3>
          <table className="work-details-table">
            <thead>
              <tr>
                <th>Days in Month</th>
                <th>Workdays</th>
                <th>LOP Days</th>
                <th>LOP Reversal Days</th>
                <th>Leave Encash Days</th>
                <th>Holiday Days</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="number" name="daysInMonth" value={formData.daysInMonth} onChange={handleChange} /></td>
                <td><input type="number" name="workdays" value={formData.workdays} onChange={handleChange} /></td>
                <td><input type="number" name="lopDays" value={formData.lopDays} onChange={handleChange} /></td>
                <td><input type="number" name="lopReversalDays" value={formData.lopReversalDays} onChange={handleChange} /></td>
                <td><input type="number" name="leaveEncashDays" value={formData.leaveEncashDays} onChange={handleChange} /></td>
                <td><input type="number" name="holidayDays" value={formData.holidayDays} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="details-wrapper">
          <div className="section earnings">
            <h3>Earnings</h3>
            <div className="form-group">
              <label>Advance Bonus:</label>
              <input type="number" name="advanceBonus" value={formData.advanceBonus} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Basic:</label>
              <input type="number" name="basic" value={formData.basic} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>HRA:</label>
              <input type="number" name="hra" value={formData.hra} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Other Allowances:</label>
              <input type="number" name="otherAllowances" value={formData.otherAllowances} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Meal Card:</label>
              <input type="number" name="mealCard" value={formData.mealCard} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Specialist Allowance:</label>
              <input type="number" name="specialistAllowance" value={formData.specialistAllowance} onChange={handleChange} />
            </div>
          </div>

          <div className="section deductions">
            <h3>Deductions</h3>
            <div className="form-group">
              <label>PF:</label>
              <input type="number" name="pf" value={formData.pf} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Professional Tax:</label>
              <input type="number" name="professionalTax" value={formData.professionalTax} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Labor Welfare Fund:</label>
              <input type="number" name="laborWelfareFund" value={formData.laborWelfareFund} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Meal Card Deduction:</label>
              <input type="number" name="mealCardDeduction" value={formData.mealCardDeduction} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="details-wrapper">
          <div className="section">
            <h3>Summary</h3>
            <div className="form-group">
              <label>Total Earnings:</label>
              <input type="number" name="totalEarnings" value={formData.totalEarnings} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Total Deductions:</label>
              <input type="number" name="totalDeductions" value={formData.totalDeductions} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Net Pay:</label>
              <input type="number" name="netPay" value={formData.netPay} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Total Net Payable Amount:</label>
              <input type="number" name="totalNetPayableAmount" value={formData.totalNetPayableAmount} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Payroll;
