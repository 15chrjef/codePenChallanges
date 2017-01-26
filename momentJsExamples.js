//returns date object moment properties attatched
// console.log(moment(Date.now()))


//compare two pre set dates **must be inputted as string**
var then = moment('10/13/1996')
let now = moment('10/13/2008')
console.log(moment.duration(now.diff(then))) // returns object with information on time duration


//same as above ^^^ but with different format
then = moment('Wed Jan 25 2012 21:08:12 GMT-0800')
now = moment('Wed Jan 25 2017 21:08:12 GMT-0800')
console.log(moment.duration(now.diff(then)))
// 5 years

var a = moment('2016-01-01'); 
// **CLONE A MOMENT BEFORE MUTATING IT**
var b = a.clone().add(1, 'week'); 
console.log(a.format(), b.format()) //2016-01-01T00:00:00-08:00 2016-01-08T00:00:00-08:00
