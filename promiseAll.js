function parallel(tasks, cb) {
	var results = [];
	var counter = 0;
	tasks.forEach((task, i) => {
	  console.log(i,results )
		tasks[i]((err, data) => {
		  console.log(i, err, data)
			if(err) {
				return cb(err, null)
			}
			counter ++;
			results[i] = data
			if( counter === tasks.length ) {
			  console.log('results')
				return cb(null, results)
			}
	  })
	})
}

var myTasks = [
  (cb) => setTimeout(() => {
    console.log(60)
    cb(null,60)
  }, 600),
  (cb) => setTimeout(() => { 
    console.log(50)
    cb(null,50)
  }, 500), 
  (cb) => setTimeout(() => { 
    console.log(40)
    cb(null,40)
  }, 400), 
  (cb) => setTimeout(() => { 
    console.log(30)
    cb(null, 30)
  }, 300)
]

var fn = (err, data) => {
  if(err) {
    console.log('err',err)
  }else {
    console.log('data', data)
  }
}

parallel(myTasks, fn)
