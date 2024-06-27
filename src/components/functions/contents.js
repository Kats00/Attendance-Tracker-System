const addUserContent = [
    { name: 'firstname', label: 'Given Name', type: 'text' },
    { name: 'lastname', label: 'Surname', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'role', label: 'Role', type: 'text' },
];

const addAttendanceContent = [
    { name: 'clockin', label: 'Clock in Time', type: 'datetime-local' },
    { name: 'clockout', label: 'Clock out Time', type: 'datetime-local' },
    { name: 'breakStart', label: 'Break Start', type: 'datetime-local' },
    { name: 'breakEnd', label: 'Break End', type: 'datetime-local' },
]

const addLeaveContent = [
    { name: 'leaveType', label: 'Leave Type', type: 'text' },
    { name: 'reason', label: 'Reason', type: 'text' },
    { name: 'startDate', label: 'Start Date', type: 'datetime-local' },
    { name: 'endDate', label: 'End Date', type: 'datetime-local' },
]

export {addUserContent, addAttendanceContent,addLeaveContent};