function comapreTime(timeString1, timeString2) {
    let dateTime1 = new Date(timeString1);
    let dateTime2 = new Date(timeString2);
    return dateTime1.getTime() > dateTime2.getTime();
}

module.exports = {
    compareTime
}

// here getTime() gives the time in mili
// the mili second conversion is done using epoch time which uses geo location. 