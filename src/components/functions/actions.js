import { approveAttendance, approveLeave, deleteItem, editItem, rejectAttendance, rejectLeave } from "./tableFunctions";

const actionIcons = {
    edit: 'fas fa-edit',
    delete: 'fas fa-trash',
    approve: 'check',
    reject: 'times',
    lapprove: 'check',
    lreject: 'times'
};

const buttonActions = {
    edit: editItem,
    delete: deleteItem,
};

const LARbuttonActions = {
    lapprove: approveLeave,
    lreject: rejectLeave,
};

const ARbuttonActions = {
    approve: approveAttendance,
    reject: rejectAttendance,
};

export {buttonActions, actionIcons, ARbuttonActions, LARbuttonActions};