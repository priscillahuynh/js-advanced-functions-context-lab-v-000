let createEmployeeRecord = function(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), date
    })
    return this
}

let createTimeOutEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find((e) => e.date === date)
    let timeOut = this.timeOutEvents.find((e) => e.date === date)   
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked*this.payPerHour
}

let calculatePayroll = function(employees){
    return employees.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

let findEmployeeByFirstName = function(employeeList, firstName){
    return employeeList.find((e => e.firstName === firstName))
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}