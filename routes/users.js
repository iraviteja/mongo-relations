const router = require("express").Router();
const User = require("../models/user.js");
const Car = require("../models/car.js");

router
  .route("/")
  //   Callbacks
  //   .get((req, res, next) => {
  //     User.find({}, (err, users) => {
  //       if (err) throw err;
  //       console.log(users);
  //     });
  //     res.status(200).json({ message: "This is home router" });
  //   })

  //   Promises
  //   .get((req, res, next) => {
  //     User.find({})
  //       .then(users => {
  //         res.json(users);
  //       })
  //       .catch(err => {
  //         next(err);
  //       });
  //   })

  //   Async/Await (Promises)
  .get(async (req, res, next) => {
    const users = await User.find({});
    res.json(users);
  })

  // Async/Await with custom error message

  // .get(async (req, res, next) => {
  //   try {
  //     const user = await User.findById("5b1fa25f07fbb0202ea477f1").catch(
  //       err => {
  //         res.json({ Status: "User not found" });
  //       }
  //     );
  //     user.name = "Prash";
  //     res.json(user);
  //   } catch (err) {
  //     throw err;
  //   }
  // })

  //   Callbacks
  //   .post((req, res, next) => {
  //     const newuser = new User(req.body);
  //     newuser.save((err, user) => {
  //       if (err) throw err;
  //       res.json(user);
  //     });
  //   });

  //   Promises
  //   .post((req, res, err) => {
  //     const newuser = new User(req.body);
  //     newuser
  //       .save()
  //       .then(user => {
  //         res.json(user);
  //       })
  //       .catch(err => {
  //         next(err);
  //       });
  //   });

  //   Async/Await (Promises)
  .post(async (req, res, next) => {
    const newuser = new User(req.body);
    const user = await newuser.save();
    res.json(user);
  });

router
  .route("/:userId")
  .get(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  })
  // put is for replace whole document, should replace all fields
  .put(async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json(user);
  })
  // put is for replace required fields in document, no need to replace all fields
  .patch(async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;
    const user = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json(user);
  });






router
  .route("/:userId/cars")
  .get(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cars", "-_id");
    res.status(200).json(user);
  })


  // Add NEW CAR

  // CALLBACKS


  // .post((req,res,next)=>{

  // 	//Fetching userid from url
  // 	const {userId} = req.params;

  // 	//Fetching request data
  // 	const newCar = new Car(req.body);

  // 	//Finding User/Seller from database
  // 	User.findById(userId,(err,user)=>{
  // 		if(err) throw err;
  // 		if(!user){
  // 			res.json({"status":"User not found"});
  // 		}
  // 		else{
  // 			//Add seller to car
  // 			newCar.seller = user;
  // 			newCar.save((err,newCar)=>{
  // 				if(err) throw err;
  // 				//Push car data to seller/user document
  // 				user.cars.push(newCar);
  // 				//Save user
  // 				user.save((err,user)=>{
  // 					if(err) throw err;
  // 					res.status(200).json(user);
  // 				});
  // 			});
  // 		}
  // 	});
  // });



//ASYNC/AWAIT (PROMISES)


  // .post(async (req, res, next) => {
  //   const { userId } = req.params;

  //   const newCar = new Car(req.body);

  //   try {
  //   	const user = await User.findById(userId);

  //   	newCar.seller = user;

	 //    try {
	 //    	await newCar.save();
	 //    }
	 //    catch(error){
	 //    	console.log("error2")
	 //    }

  //   	user.cars.push(newCar);

		// try {
		//     await user.save();
		// }
		// catch(error){
		// 	console.log("error2")
		// }
    
  //   	res.status(200).json(user);
  //   }
  //   catch (error){
  //   	console.log("error1")
  //   }
  // });


// PROMISES


  .post((req,res,err)=>{
  	//Fetching userid from url
  	const {userId} = req.params;

  	//Fetching request data
  	const newCar = new Car(req.body);

  	User.findById(userId)
  		.then(user=>{
  			if(!user){
  				res.json({"status":"User not found"});
  			}
  			else{
  				//Add seller to car
	  			newCar.seller = user;
	  			newCar.save()
	  				.then(newCar=>{
	  					//Push car data to seller/user document
	  					user.cars.push(newCar);
	  					user.save()
	  						.then(user=>{
	  							res.status(200).json(user);
	  						})
	  						.catch(err=>{throw err});
	  				})
	  				.catch(err=>{throw err});
  			}
  		}).catch(err=>{throw err})
  });

module.exports = router;
