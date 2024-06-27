import React, { useState, useEffect } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { deleteUser, saveUserData } from '../../routes/userRoute';

const UserDetails = ({ user }) => {
  const userData = user.user;

  const [formValue, setFormValue] = useState({
    firstname: userData.firstname || '',
    lastname: userData.lastname || '',
    username: userData.username || '',
    role: userData.role || '',
    department: userData.department || '',
    email: userData.email || ''
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setFormValue({
      firstname: userData.firstname || '',
      lastname: userData.lastname || '',
      username: userData.username || '',
      role: userData.role || '',
      department: userData.department || '',
      email: userData.email || ''
    });
  }, [userData]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleDeleteClick = (user) => {
    console.log('deleting: ', user.user.id)
    deleteUser(user.user.id);
  };


  const handleSaveClick = async () => {
    try {
      saveUserData(formValue, userData.id);
      console.log(formValue)
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };

  return (
    <MDBValidation className='row g-3'>
        <div className='d-flex col-12 justify-content-end gap-3'>
        <MDBBtn type='button' className='shadow-0 p-2' color='danger' onClick={() => handleDeleteClick(user)}>Delete User</MDBBtn>
        {!isEditMode ? (
          <MDBBtn type='button' color='tertiary' onClick={handleEditClick}>Edit form</MDBBtn>
        ) : (
          <MDBBtn type='button' color='tertiary' onClick={handleSaveClick}>Save</MDBBtn>
        )}
      </div>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.firstname}
          name='firstname'
          onChange={onChange}
          id='validationCustom01'
          required
          label='First name'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.lastname}
          name='lastname'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Last name'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input a username.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.username}
          name='username'
          onChange={onChange}
          id='validationCustom03'
          required
          label='Username'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem feedback='Please input an email.' invalid className='col-md-4'>
        <MDBInput
          value={formValue.email}
          name='email'
          onChange={onChange}
          id='validationCustom04'
          required
          label='Email'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='Please provide a valid city.' invalid>
        <MDBInput
          value={formValue.role}
          name='role'
          onChange={onChange}
          id='validationCustom05'
          required
          label='Role'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='Please provide a valid zip.' invalid>
        <MDBInput
          value={formValue.department}
          name='department'
          onChange={onChange}
          id='validationCustom06'
          required
          label='Department'
          disabled={!isEditMode}
        />
      </MDBValidationItem>
    </MDBValidation>
  );
}

export default UserDetails;
