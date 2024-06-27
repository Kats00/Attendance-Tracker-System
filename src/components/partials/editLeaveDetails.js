import React, { useState, useEffect } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { saveAttendanceData } from '../../routes/attendnceRoute';

const LeaveDetails = ({ data, userId}) => {
  const rawdata = data;

  const [formValue, setFormValue] = useState({
    id: rawdata.id,
    leaveType: rawdata.leaveType || '',
    reason: rawdata.reason || '',
    startDate: rawdata.startDate || '',
    endDate: rawdata.endDate || '',
    status: rawdata.status,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setFormValue({
        id: rawdata.id,
        leaveType: rawdata.leaveType || '',
        reason: rawdata.reason || '',
        startDate: rawdata.startDate || '',
        endDate: rawdata.endDate || '',
        status: rawdata.status,
    });

    console.log(rawdata.id)
  }, [rawdata]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    if (formValue.status === 'Pending'){
        setIsEditMode(true);
    }
  };

  const handleSaveClick = async () => {
    try {
      console.log(formValue)
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };

  return (
    <MDBValidation className='row g-3'>
        <div className='d-flex col-12 justify-content-end'>
        {!isEditMode ? (
          <MDBBtn type='button' color='tertiary' onClick={handleEditClick}>Edit form</MDBBtn>
        ) : (
          <MDBBtn type='button' color='tertiary' onClick={handleSaveClick}>Save</MDBBtn>
        )}
      </div>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.id}
          name='id'
          onChange={onChange}
          id='validationCustom01'
          required
          label='ID'
          disabled={true}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.leaveType}
          name='leaveType'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Leave Type'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.reason}
          name='reason'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Reason'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input a date.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.startDate}
          name='startDate'
          onChange={onChange}
          id='validationCustom03'
          required
          label='Start Date'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input a date.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.endDate}
          name='endDate'
          onChange={onChange}
          id='validationCustom04'
          required
          label='End Date'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input a status.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.status}
          name='status'
          onChange={onChange}
          id='validationCustom04'
          required
          label='Status'
          disabled={true}
        />
      </MDBValidationItem>
    </MDBValidation>
  );
}

export default LeaveDetails;
