import { useState } from 'react';

const useUserModalState = () => {
  const [uCentredModal, uSetCentredModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // State to hold selected user data

  const utoggleOpen = (item) => {
    setSelectedData(item); 
    console.log(item)
    uSetCentredModal(!uCentredModal); 
  };

  const uhandleAction = (data) => {
    setSelectedData(data);
    uSetCentredModal(false); 
  };

  return { uCentredModal, uSetCentredModal, utoggleOpen, uhandleAction, selectedData };
};

const useULeaveModalState = () => {
  const [uLeaveModal, uSetLeaveModal] = useState(false);
  const [leaveData, setLeaveData] = useState(null); 

  const uToggleLeaveModal = (item) => {
    setLeaveData(item); 
    console.log(item)
    uSetLeaveModal(!uLeaveModal); 
  };

  const uhandleAction = (data) => {
    setLeaveData(data);
    uSetLeaveModal(false); 
  };

  return { uLeaveModal, uSetLeaveModal, uToggleLeaveModal, uhandleAction, leaveData };
};

export {useUserModalState, useULeaveModalState};
