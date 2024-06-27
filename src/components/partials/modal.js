import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const Modal = ({ centredModal, toggleOpen, setCentredModal, title, content, onSave }) => {
  const [formData, setFormData] = useState({});

  const isFieldEditable = (field) => field.status !== 'pending'; // Check if field status is not "pending"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    toggleOpen();
  };

  return (
    <div>
      <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={handleSubmit}>
                {content.map((field, index) => (
                  <div key={index} className='mb-3'>
                    <label htmlFor={field.name} className='form-label'>{field.label}</label>
                    <input
                      type={field.type}
                      className='form-control'
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      readOnly={!isFieldEditable(field)} // Set readOnly based on status
                    />
                  </div>
                ))}
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Modal;
