// Easy approach using setInterval
// 1 
// let a = 0;
// setInterval(()=> {
//   a += 1;
//   console.log(a)
// }, 1000)

// Another approach using setTimeOut

// 2
let counter = 0;
function incrementAndLog() {
  counter += 1;
  console.log(counter);
  setTimeout(incrementAndLog, 1000); 
}
incrementAndLog();

// 3

const fs = require("fs");
fs.readFile('assignments/week-2/01-async-js/easy/2-counter.md', 'utf-8', function(err, data)  {
  if (err) {
    console.log(err)
    return
  }
  console.log(data);
})


// 4 
data = 'I want to perform a read operation using fs'
fs.writeFile('assignments/week-2/01-async-js/easy/2-counter.md', data, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("the file has been updated successfully")
  }
})




