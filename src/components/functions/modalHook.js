import { useState } from 'react';

const useCentredModalState = () => {
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => {
    console.log("toggling centred modal");
    setCentredModal(prevState => !prevState);
  };

  return { centredModal, setCentredModal, toggleOpen };
};

const useLeaveModalState = () => {
  const [leaveModal, setLeaveModal] = useState(false);

  const toggleLeaveModal = () => {
    console.log("toggling leave modal");
    setLeaveModal(prevState => !prevState);
  };

  return { leaveModal, setLeaveModal, toggleLeaveModal };
};

export { useCentredModalState, useLeaveModalState };
