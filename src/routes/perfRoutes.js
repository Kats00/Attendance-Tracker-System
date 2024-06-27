import axios from 'axios';

const getUserPerformances = async (id) => {
    try {
      let userId = id; 
      if (userId && typeof userId === 'string') {
        userId = userId.replace(/^"(.*)"$/, '$1');
      }
      const res = await axios.get(`http://localhost:3000/api/performances/${userId}`); 

      const tableData = res.data.map(data => ({
        id: data._id,
        hoursRendered: data.hoursRendered,
      }));
  
      return tableData;
    } catch (error) {
      console.error('Error fetching user attendances:', error.message);
      throw error;
    }
}


export {
    getUserPerformances
}