export default class Leave {
    constructor() {
      this.userId = '';
      this.leaveType = null;
      this.reason = null;
      this.status = 'Pending';
      this.startDate = null;
      this.endDate = 0;
    }
  
    // Getters
    getUserId() {
      return this.userId;
    }
  
    getLeaveType() {
      return this.leaveType;
    }
  
    getReason() {
      return this.reason;
    }
  
    getStatus() {
      return this.status;
    }
  
    getStartDate() {
      return this.startDate;
    }
  
    getEndDate() {
      return this.endDate;
    }
  
    // Setters
    setUserId(value) {
      this.userId = value;
    }
  
    setLeaveType(value) {
      this.leaveType = value;
    }
  
    setReason(value) {
      this.reason = value;
    }
  
    setStatus(value) {
      this.status = value;
    }
  
    setStartDate(value) {
      this.startDate = value;
    }
  
    setEndDate(value) {
      this.endDate = value;
    }
}
  