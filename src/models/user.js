export class User {
    
    constructor() {
      this.username = '';
      this.email = '';
      this.password = '';
      this.firstname = '';
      this.lastname = '';
      this.role = 'Employee'; // Assuming default role is 'Employee'
      this.position = '';
      this.department = '';
      this.attendanceRecord = null; // Optional, handled separately if needed
      this.leaveRecord = null; // Optional, handled separately if needed
      this.perfRecord = null; // Optional, handled separately if needed
      this.notification = null; // Optional, handled separately if needed
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    getUsername(){
      return this.username;
    }

    getEmail(){
      return this.email;
    }
    
    getPassword(){
      return this.password;
    }

    getFirstname(){
      return this.firstname;
    }

    getLastname(){
      return this.lastname;
    }

    getPosition(){
      return this.position;
    }

    getDepartment(){
      return this.department;
    }

    getRole(){
      return this.role;
    }

    //

    setUsername(username){
      this.username = username;
    }

    setEmail(email){
      this.email = email;
    }
    
    setPassword(password){
      this.password = password;
    }

    setFirstname(firstname){
      this.firstname = firstname;
    }

    setLastname(lastname){
      this.lastname = lastname;
    }

    setPosition(position){
      this.position = position;
    }

    setDepartment(department){
      this.department = department;
    }

    setRole(role){
      this.role = role;
    }

  }
  
  export default User;
  