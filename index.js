var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

//Other setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//DB setting
//환경변수에서 설정내용을 가져온다.
//mongodb://iniron:<PASSWORD>@cluster0-shard-00-00-ves2t.mongodb.net:27017,cluster0-shard-00-01-ves2t.mongodb.net:27017,cluster0-shard-00-02-ves2t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
mongoose.connect(process.env.MONGO_DB, {useMongoClient:true});
var db = mongoose.connection;
db.once('open', function(){     //연결성공
  console.log('DB connected');
});
db.on('error', function(err){   //연결실패
  console.log('DB ERROR : ', err);
});

//Routes
app.use("/", require("./routes/home")); //1
app.use("/contacts", require("./routes/contacts")); //2

//Port setting
app.listen(3000, function(){
  console.log('Server On!');
});
