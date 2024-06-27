import { arAttendance } from "../../routes/attendnceRoute";
import { arLeave } from "../../routes/leaveRoute";

const populateTable = (data) => {
    const columns = Object.keys(data[0]);
    return columns.map((column) => ({ label: column, key: column }));
};
  
const viewItem = (id, utoggleOpen) => {
    utoggleOpen();
    console.log(`Viewing item with ID: ${id}`); 
};
  
const editItem = (id) => {
    console.log(`Editing item with ID: ${id}`); 
};
  
const deleteItem = (id) => {
    console.log(`Deleting item with ID: ${id}`);
};

const rejectAttendance = (item) => {
    arAttendance(item.id, 'Rejected', item.userId);
}

const approveAttendance = (item) => {
    arAttendance(item.id, 'Approved', item.userId);
}

const approveLeave = (item) => {
    arLeave(item.id, 'Approved');
}

const rejectLeave = (item) => {
    arLeave(item.id, 'Rejected');
}


export { populateTable, viewItem, editItem, deleteItem, rejectAttendance, approveAttendance, approveLeave, rejectLeave };