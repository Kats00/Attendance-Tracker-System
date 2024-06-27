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
import UserPills from './userPills';

const UserModal = ({ uCentredModal, uSetCentredModal, utitle, userData }) => {

  return (
    <MDBModal tabIndex='-1' open={uCentredModal} onClose={() => uSetCentredModal(false)}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{utitle}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={() => uSetCentredModal(false)}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            
            <UserPills user={userData} />
           
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={() => uSetCentredModal(false)}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default UserModal;
