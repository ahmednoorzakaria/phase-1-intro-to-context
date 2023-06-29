// Function to create an individual employee record
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [], // Array to store time in events
      timeOutEvents: [], // Array to store time out events
    };
  }
  
  // Function to create employee records from an array of employee data
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  // Function to record the time an employee clocks in
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employeeRecord;
  }
  
  // Function to record the time an employee clocks out
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employeeRecord;
  }
  
  // Function to calculate the number of hours worked by an employee on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employeeRecord.timeOutEvents.find(
      (event) => event.date === date
    );
  
    if (timeInEvent && timeOutEvent) {
      return timeOutEvent.hour - timeInEvent.hour;
    }
  
    return 0;
  }
  
  // Function to calculate the wages earned by an employee on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Function to calculate the total wages earned by an employee for all dates
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map((event) => event.date);
    return dates.reduce(
      (totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date),
      0
    );
  }
  
  // Function to calculate the total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(
      (totalPayroll, employeeRecord) =>
        totalPayroll + allWagesFor(employeeRecord),
      0
    );
  }
  