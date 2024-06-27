import React from 'react';
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
import AttendanceDetails from './editAttendance';

const ItemModal = ({ iCentredModal, iSetCentredModal, ititle, item, userId }) => {

  return (
    <MDBModal tabIndex='-1' open={iCentredModal} onClose={() => iSetCentredModal(false)}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{ititle}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={() => iSetCentredModal(false)}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <AttendanceDetails 
                data={item}
                userId={userId}
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={() => iSetCentredModal(false)}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default ItemModal;
