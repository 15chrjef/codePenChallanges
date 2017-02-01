// 1.
// There's a bug in the following controller logic. Can you spot it and how would you fix it? 
	//initially res.send is after database.find and would send a response before the query would return data
// 2. Write a function find() that wraps the database.find() method above in a Promise
// 3. Rewrite the above example using our new find() method
// 4. Apply some newer ES features to the above code

var database = require('database_connection.js');
var encrypt = require('sha1_encryptor.js');

//before promise implementation
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.authorized = true;
  res.status = 200;

  database.find('users', username, function(err, user) {
    if (err || encrypt(password) !== user.password) {
      res.status = 401;
      res.authorized = false;
    }
      res.send();
  });

});

//after promise implementation
const find = (username, password) =>{
  return new Promise (
    database.find('users', username, function(err, user) {
      if (err || encrypt(password) !== user.password) {
        reject()
      } else {
      	resolve()
      }
    })
  )
}
    
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  find(username,password)
  .then(() => {
    res.authorized = true;
 	  res.status = 200;
    res.send()
  })
  .catch(() => {
    res.status = 401;
    res.authorized = false;
    res.send()
	)
});

  
  // 5.
// What is the order of the log output for the following file?

setTimeout(function() {
  console.log('A');
}, 0);

console.log('B');

setTimeout(function() {
  console.log('C');
}, 0);

setTimeout(function() {
  console.log('D');
}, 100);

var i = 0;
while (i < 100,000,000) {
  // Takes ~500ms to run this loop
  var ignore = Math.sqrt(i);
  i++;
}

console.log('E');
  
// B, E, A, C, D
