// Your code here
function createEmployeeRecord(employee) {
    let employeeRecord = {
      firstName: employee[0], // Assign the first element of the `employee` array to `firstName`
      familyName: employee[1], // Assign the second element of the `employee` array to `familyName`
      title: employee[2], // Assign the third element of the `employee` array to `title`
      payPerHour: employee[3], // Assign the fourth element of the `employee` array to `payPerHour`
      timeInEvents: [], // Initialize an empty array for `timeInEvents`
      timeOutEvents: [], // Initialize an empty array for `timeOutEvents`
    };
  
    return employeeRecord; // Return the created employee record object
}

function createEmployeeRecords(employees) {
    let employeeRecords = employees.map(createEmployeeRecord);
    return employeeRecords;
}
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' '); // Split the date and time
    const [hour, minutes] = time.split(':'); // Split the time into hour and minutes
  
    // Create the timeInEvent object and push it to the timeInEvents array of the employee record
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour + minutes, 10), // Concatenate hour and minutes and parse as integer
      date: date,
    });
  
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' '); // Split the date and time
    const [hour, minutes] = time.split(':'); // Split the time into hour and minutes
  
    // Create the timeOutEvent object and push it to the timeOutEvents array of the employee record
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour + minutes, 10), // Concatenate hour and minutes and parse as integer
      date: date,
    });
  
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date); // Find the timeInEvent for the specified date
  const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date); // Find the timeOutEvent for the specified date

  if (timeInEvent && timeOutEvent) {
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100; // Calculate the difference in hours between timeIn and timeOut
    return hoursWorked;
  } else {
    return 0; // Return 0 if either the timeInEvent or timeOutEvent is missing
  }
}
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}
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

