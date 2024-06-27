import axios from 'axios';
import Attendance from '../models/attendance';

const getUserAttendances = async (id) => {
    try {
      let userId = id; 
      if (userId && typeof userId === 'string') {
        userId = userId.replace(/^"(.*)"$/, '$1');
      }
      const res = await axios.get(`http://localhost:3000/api/user-attendances/${userId}`); 
  
      const tableData = res.data.map(data => ({
        id: data._id,
        clockin: data.clockin,
        clockout: data.clockout,
        breakStart: data.breakStart,
        breakEnd: data.breakEnd,
        attendanceStatus: data.attendanceStatus
      }));

      //console.log(tableData)
  
      return tableData;
    } catch (error) {
      console.error('Error fetching user attendances:', error.message);
      throw error;
    }
}

const addAttendance = async (data, id) => {
    try {
        let userId = id; 
        if (userId && typeof userId === 'string') {
            userId = userId.replace(/^"(.*)"$/, '$1');
        }
        const newRecord = new Attendance();
        newRecord.setClockin(data.clockin);
        newRecord.setClockout(data.clockout);
        newRecord.setBreakStart(data.breakStart);
        newRecord.setBreakEnd(data.breakEnd);
        newRecord.setUserId(userId)
  
        console.log(newRecord);
  
        const response = await axios.post('http://localhost:3000/api/add-attendance', newRecord);
  
        return response.data;
    }catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message); 
        } else {
          throw new Error('Failed to register user'); 
        }
    }
};

const saveAttendanceData = async (data, userId) => {
    try {
      let uid = userId; // Assign userId to uid
      if (uid && typeof userId === 'string') {
        uid = userId.replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes if present
      }
  
      const newData = new Attendance();
      newData.setUserId(uid); 
      newData.setClockin(data.clockin);
      newData.setClockout(data.clockout);
      newData.setBreakStart(data.breakStart);
      newData.setBreakEnd(data.breakEnd);
  
      console.log(newData);
  
      const response = await axios.put(`http://localhost:3000/api/update-attendance/${data.id}`, newData);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to update attendance');
      }
    }
  };

const getAllPendingAttendance = async () =>{
    try {
        const res = await axios.get(`http://localhost:3000/api/pending-attendances`); 

        const tableData = res.data.map(data => ({
            id: data._id,
            clockin: data.clockin,
            clockout: data.clockout,
            breakStart: data.breakStart,
            breakEnd: data.breakEnd,
            attendanceStatus: data.attendanceStatus,
            userId: data.userId._id,
            username: data.userId.username, // Access username from nested user object
            name: `${data.userId.firstname} ${data.userId.lastname}`, // Combine firstname and lastname
        }));

        //console.log(tableData)
        return (tableData);
    } catch (error) {
        console.error('Error fetching user attendances:', error.message);
        throw error;
    }
}

const arAttendance = async (id, status, userId) => {
    try {
        const sendStatus = {status};

        await axios.put(`http://localhost:3000/api/approve-attendance/${id}/${userId}`, sendStatus); 

    } catch (error) {
        console.error('Error fetching user attendances:', error.message);
        throw error;
    }
}

const getAttendances = async () =>{
    try {
       const res = await axios.get(`http://localhost:3000/api/attendances`); 

       const tableData = res.data.map(data => ({
        id: data._id,
        clockin: data.clockin,
        clockout: data.clockout,
        breakStart: data.breakStart,
        breakEnd: data.breakEnd,
        attendanceStatus: data.attendanceStatus,
        userId: data.userId._id,
        username: data.userId.username, 
        name: `${data.userId.firstname} ${data.userId.lastname}`, 
        }));

        return tableData;
    } catch (error) {
        console.error('Error fetching attendances:', error.message);
        throw error;
    }
}

export {
    addAttendance,
    getUserAttendances,
    saveAttendanceData,
    getAllPendingAttendance,
    arAttendance,
    getAttendances
}