/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



const employeeArray = ["Gray", "Worm", "Security", 1];

// function createEmployeeRecord() {
//   console.log('this', this);
//   const record = {
//     firstName: this[0],
//     familyName: this[1],
//     title: this[2],
//     payPerHour: this[3],
//     timeInEvents: [],
//     timeOutEvents: []
//   };
//   console.log('record', record);
//   return record;
// }

// createEmployeeRecord.call(employeeArray)

function createEmployeeRecord(employee) {
  const record = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return record;
}

createEmployeeRecord(employeeArray)

const employeeArrays = [
  ["moe", "sizlak", "barkeep", 2],
  ["bartholomew", "simpson", "scamp", 3]
];
 
// function createEmployeeRecords() {
//   const records = this.map(array => {
//     console.log('this', this);
//     return createEmployeeRecord.call(array);
//   })
//   console.log('records', records);
//   return records;
// }

// createEmployeeRecords.call(employeeArrays);

function createEmployeeRecords(employees) {
  const records = employees.map(employee => {
    return createEmployeeRecord(employee);
  })
  return records;
}

createEmployeeRecords(employeeArrays);

const byronRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
const byronTimeInStamp = "2014-02-28 1400"

function createTimeInEvent(dateStamp) {
  const dateTimeArray = dateStamp.split(' ');
  const dateTimeObj = {
    type: "TimeIn",
    date: dateTimeArray[0],
    hour: parseInt(dateTimeArray[1])
  }
  this.timeInEvents.push(dateTimeObj);
  return this;
}

createTimeInEvent.call(byronRecord, byronTimeInStamp)

function createTimeOutEvent(dateStamp) {
  const dateTimeArray = dateStamp.split(' ');
  const dateTimeObj = {
    type: "TimeOut",
    date: dateTimeArray[0],
    hour: parseInt(dateTimeArray[1])
  }
  this.timeOutEvents.push(dateTimeObj);
  return this;
}

const juliusEmployee = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
createTimeInEvent.call(juliusEmployee, "2044-03-15 0900");
createTimeOutEvent.call(juliusEmployee, "2044-03-15 1100");

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(event => event.date === date);
  const timeOut = this.timeOutEvents.find(event => event.date === date);

  const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

hoursWorkedOnDate.call(juliusEmployee, "2044-03-15")

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date)
  const payPerHour = this.payPerHour;
  const wages = hoursWorked * payPerHour;
  return wages;
}

wagesEarnedOnDate.call(juliusEmployee, "2044-03-15")


const avengers = [
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150]
];

function findEmployeeByFirstName(array, nameStr) {
  const name = array.find(employee => employee.firstName === nameStr);
  return name;
}

findEmployeeByFirstName(createEmployeeRecords(avengers), "Loki")

const allTheEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300]
];

const allTimesIn = [
  ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
  ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
  ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
  ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
];

const allTimesOut = [
  ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
  ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
  ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

const allEmployeeRecords = createEmployeeRecords(allTheEmployees);
allEmployeeRecords.forEach(function (rec) {
  let timesInRecordRow = allTimesIn.find(function (row) {
    return rec.firstName === row[0];
  })
  let timesOutRecordRow = allTimesOut.find(function (row) {
    return rec.firstName === row[0];
  })
  timesInRecordRow[1].forEach(function(timeInStamp) {
    createTimeInEvent.call(rec, timeInStamp);
  })
  timesOutRecordRow[1].forEach(function(timeOutStamp) {
    createTimeOutEvent.call(rec, timeOutStamp);
  })
})

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date
  })

  const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable
}

function calculatePayroll(records) {
  const allWages = [];
  const thing = records.map(record => {
    const wages = allWagesFor.call(record);
    allWages.push(wages);
  })
  const totalWages = allWages.reduce((first, second) => first + second, 0);
  return totalWages;
}

calculatePayroll(allEmployeeRecords)
