// // Importing express module
// var express = require("express");
 
// // Importing mongoose module
// var mongoose = require("mongoose");
// const port = 80;
// const app = express();
 
// // Handling the get request
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
 
// // Starting the server on the 80 port
// app.listen(port, () => {
//   console.log(`The application started
//   successfully on port ${port}`);
// });

var express = require("express");
var mongoose = require("mongoose");
const port = 80;
const app = express();

const DB = 'mongodb+srv://Srinath:Ratlas@cluster0.rjpjz.mongodb.net/loginlist?retryWrites=true&w=majority'
   
// mongoose.connect("mongodb://localhost/projectDG",
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`connection successful`);
}).catch((err) => console.log(`no connection`));
  
var db = mongoose.connection;
   
app.use(express.json());
   
// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
   
app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
     
  // res.send("Hello World");
  return res.redirect("index.html");
});
   
app.post("/formFillUp", (req, res) => {
  var name = req.body.name;
  var reason = req.body.reason;
  var email = req.body.email;
  var phone = req.body.phone;
  var city = req.body.city;
  var state = req.body.state;
  var addressline = req.body.addressline;
   
  var data = {
    name: name,
    reason: reason,
    email: email,
    phone: phone,
    city: city,
    state: state,
    addressline: addressline,
  };
   
  db.collection("users").insertOne(
  data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Data inserted successfully!");
  });
   
  return res.redirect("formSubmitted.html");
});
   
app.listen(process.env.PORT || port, () => {
  console.log(`The application started 
  successfully on port ${port}`);
});