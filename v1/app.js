var express = require("express");
var app = express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
var campgrounds=[
                {name: "Salmon Creek",image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440742f7fdd934acc_340.jpg" },
                {name: "Granite Hill",image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e50744075267dd59145c7_340.jpg" } ,
                {name: "Mountain Goat's Rest",image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf8525478497c297ad29f4f_340.jpg" } 
];
app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});


app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name: name,image: image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){

res.render("new.ejs");

});

app.listen(8083,function(){ console.log("yo"); });
