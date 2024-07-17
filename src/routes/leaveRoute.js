import axios from 'axios';
import Leave from '../models/leave';

const getUserLeaves = async (id) => {
    try {
      let userId = id; 
      if (userId && typeof userId === 'string') {
        userId = userId.replace(/^"(.*)"$/, '$1');
      }
      const res = await axios.get(`https://attendance-tracker-system-api.onrender.com/api/leaves/${userId}`); 

      const tableData = res.data.map(data => ({
        id: data._id,
        leaveType: data.leaveType,
        reason: data.reason,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate
      }));
      console.log(tableData);
  
      return tableData;
    } catch (error) {
      console.error('Error fetching user leaves:', error.message);
      throw error;
    }
}

const addLeave = async (data, id) => {
    try {
        let userId = id; 
        if (userId && typeof userId === 'string') {
            userId = userId.replace(/^"(.*)"$/, '$1');
        }
        const newData = new Leave();
        newData.setLeaveType(data.leaveType);
        newData.setReason(data.reason);
        newData.setStartDate(data.startDate);
        newData.setEndDate(data.endDate);
        newData.setUserId(userId)
  
        console.log(newData);
  
        const response = await axios.post('https://attendance-tracker-system-api.onrender.com/api/add-leave', newData);
  
        return response.data;
    }catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message); 
        } else {
          throw new Error('Failed to file leave'); 
        }
    }
};

const getAllPendingLeaves = async () =>{
    try {
        const res = await axios.get(`https://attendance-tracker-system-api.onrender.com/api/pending-leaves`); 

        const tableData = res.data.map(data => ({
            id: data._id,
            leaveType: data.leaveType,
            reason: data.reason,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate,
            userId: data.userId._id,
            username: data.userId.username, 
            name: `${data.userId.firstname} ${data.userId.lastname}`, 
        }));

        return (tableData);
    } catch (error) {
        console.error('Error fetching user attendances:', error.message);
        throw error;
    }
}

const arLeave = async (id, status) => {
    try {
        const sendStatus = {status};

        await axios.put(`https://attendance-tracker-system-api.onrender.com/api/approve-leave/${id}`, sendStatus); 

    } catch (error) {
        console.error('Error fetching user attendances:', error.message);
        throw error;
    }
}

const getLeaves = async () =>{
    try {
       const res = await axios.get(`https://attendance-tracker-system-api.onrender.com/api/leaves`); 

       console.log(res);
       
       const tableData = res.data.map(data => ({
            id: data._id,
            leaveType: data.leaveType,
            reason: data.reason,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate, 
        }));

        return tableData;
    } catch (error) {
        console.error('Error fetching Leaves:', error.message);
        throw error;
    }
}

export {
    getUserLeaves,
    addLeave,
    getAllPendingLeaves,
    getLeaves,
    arLeave
}