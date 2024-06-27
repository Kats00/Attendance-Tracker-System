export default class Attendance {
  constructor() {
    this.userId = '';
    this.clockin = null;
    this.clockout = null;
    this.breakStart = null;
    this.breakEnd = null;
    this.overtime = 0;
    this.attendanceStatus = 'Pending';
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getClockin() {
    return this.clockin;
  }

  setClockin(clockin) {
    this.clockin = clockin;
  }

  getClockout() {
    return this.clockout;
  }

  setClockout(clockout) {
    this.clockout = clockout;
  }

  getBreakStart() {
    return this.breakStart;
  }

  setBreakStart(breakStart) {
    this.breakStart = breakStart;
  }

  getBreakEnd() {
    return this.breakEnd;
  }

  setBreakEnd(breakEnd) {
    this.breakEnd = breakEnd;
  }

  getOvertime() {
    return this.overtime;
  }

  setOvertime(overtime) {
    this.overtime = overtime;
  }

  getAttendanceStatus() {
    return this.attendanceStatus;
  }

  setAttendanceStatus(attendanceStatus) {
    this.attendanceStatus = attendanceStatus;
  }
}
