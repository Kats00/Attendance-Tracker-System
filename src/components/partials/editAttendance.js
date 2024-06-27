import React, { useState, useEffect } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { saveAttendanceData } from '../../routes/attendnceRoute';

const AttendanceDetails = ({ data, userId}) => {
  const attendanceData = data;

  const [formValue, setFormValue] = useState({
    id: attendanceData.id,
    clockin: attendanceData.clockin || '',
    clockout: attendanceData.clockout || '',
    breakStart: attendanceData.breakStart || '',
    breakEnd: attendanceData.breakEnd || '',
    attendanceStatus: attendanceData.attendanceStatus,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setFormValue({
        id: attendanceData.id,
        clockin: attendanceData.clockin || '',
        clockout: attendanceData.clockout || '',
        breakStart: attendanceData.breakStart || '',
        breakEnd: attendanceData.breakEnd || '',
        attendanceStatus: attendanceData.attendanceStatus,
    });
  }, [attendanceData]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    if (formValue.attendanceStatus === 'Pending'){
        setIsEditMode(true);
    }
  };

  const handleSaveClick = async () => {
    try {
      saveAttendanceData(formValue, userId)
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
          value={formValue.clockin}
          name='clockin'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Clock In'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.clockout}
          name='clockout'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Clock Out'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input a username.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.breakStart}
          name='breakStart'
          onChange={onChange}
          id='validationCustom03'
          required
          label='Break Start'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input an email.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.breakEnd}
          name='breakEnd'
          onChange={onChange}
          id='validationCustom04'
          required
          label='Break End'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input an email.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.attendanceStatus}
          name='attendanceStatus'
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

export default AttendanceDetails;
