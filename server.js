const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const spectacleRoute = require("./routes/spectacles");
const genreRoute = require("./routes/genres");
const userRoute = require("./routes/users");


const app = express();

app.use(cors());

const databaseConfig = require("./config/keys");
console.log(databaseConfig);
mongoose.connect(databaseConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect('mongodb://localhost:27017/booking-db', {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//      useCreateIndex: true
//  })

var db = mongoose.connection;
db.once("open", () => console.log("Mongo Database is connected now!"));
db.on("error", console.error.bind(console, "connection error:"));

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

//App routes to handle requests
app.use("/api/spectacles", spectacleRoute);
app.use("/api/genres", genreRoute); //cache
app.use("/api/users", userRoute);


app.use(express.static("frontend/public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
});

// app.listen(9999, function() {
//        console.log('Server up at 9999')
//    })

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;

// //const bcrypt = require('bcrypt')
// //const jwt = require('jsonwebtoken')
// const userRoute = require("./routes/users")
// //const JWT_SECRET = 'disiaieiojiefjs4213@$&^%hflu$%%&^Iduyh7%%'

// const app = express()

// //to prevent CORS errors
// app.use(cors()) 

// // mongoose.connect('mongodb://localhost:27017/booking-db', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useCreateIndex: true
// // })

// //connecting mongoDB
// const databaseConfig = require("./config/keys");
// console.log(databaseConfig);
// mongoose.connect(databaseConfig, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// //checking the connection to db 
// var db = mongoose.connection;
// db.once("open", () => console.log("Mongo Database is connected now!"))
// db.on("error", console.error.bind(console, "connection error"))

// //app.use('/', express.static(path.join(__dirname, 'static')))

// //Body parser middleware
// app.use(bodyParser.urlencoded({ extended: true, limit: "10mb"}))
// app.use(bodyParser.json({ limit: "10mb"}))

// //App routes to handle requests
// app.use("/api/users", userRoute)

// //Serve our static asset
// app.use(express.static("frontend/public"))

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend","public", "index.html"))
// })

// // app.post('/api/change-password', async (req, res) => {
// //     const { token, newpassword: plainTextPassword } = req.body

// //     if(!plainTextPassword || typeof plainTextPassword !== 'string') {
// //         return res.json({status: 'error', error: 'Invalid password' })
// //     }

// //     if(plainTextPassword.length < 5) {
// //         return res.json({status: 'error', error: 'Password too small. Should be atleast 6 characters' })
// //     }

// //     try{
// //         const user = jwt.verify(token, JWT_SECRET)
        
// //         const _id = user.id

// //         const password = await bcrypt.hash(plainTextPassword, 10)

// //         await User.updateOne(
// //             { _id },
// //             {
// //                 $set: { password }
// //             }
// //         )
// //         res.json({ status: 'ok' })
// //     } catch (error) {
// //         console.log(error)
// //         res.json({ status: 'error', error: ';))'})
// //     }
// // })

// // app.post('/api/login', async (req, res) => {
// //     console.log(req.body)
// //     const {username, password } = req.body
// //     const user = await User.findOne({ username }).lean() 

// //     if(!user) {
// //         return res.json ({status: 'error', error: 'Invalid username/password' })
// //     }

// //     if(await bcrypt.compare(password, user.password)) {
// //         //the username, password combination is successful

// //         const token = jwt.sign(
// //             {
// //                 id: user._id,
// //                 username: user.username  
// //             }, 
// //             JWT_SECRET
// //         )

// //         return res.json({ status: 'ok', data: token })
// //     }

// //     res.json({ status: 'error', data: 'Invalid username/password' })
// // })

// // app.post('/api/register', async (req, res) => {
// //     const { username, password: plainTextPassword } = req.body

// //     if(!username || typeof username !== 'string') {
// //         return res.json({status: 'error', error: 'Invalid username' })
// //     }

// //     if(!plainTextPassword || typeof plainTextPassword !== 'string') {
// //         return res.json({status: 'error', error: 'Invalid password' })
// //     }

// //     if(plainTextPassword.length < 5) {
// //         return res.json({status: 'error', error: 'Password too small. Should be atleast 5 characters' })
// //     }

// //     const password = await bcrypt.hash(plainTextPassword, 10)

// //     try{
// //         const response = await User.create({
// //             username,
// //             password
// //         })
// //         console.log('User created successfully: ', response)
// //     }catch (error) {
// //         if(error.code === 11000) {
// //             return res.json({status: 'error', error: 'Username already in use' })   
// //         }
// //         throw error
// //     }

// //     res.json({ status: 'ok' })
// // })

// // app.listen(9900, function() {
// //     console.log('Server up at 9000')
// // })

