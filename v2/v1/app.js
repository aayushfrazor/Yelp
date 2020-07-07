var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


var campgroundSchema=new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground=mongoose.model("Campground",campgroundSchema);

/*  Campground.create(
	{
		name: "Granite Hill",
		image: "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
		description: "This is a huge granite hill with no bathrooms, no water.. Just beautiful granite"	
	}, function(err, campground){
		if(err)
			console.log(err);
		else 
			{
			console.log("Newly Created Campground");
			console.log(campground); }
}); */ 



app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err)
			console.log(err);
		else
			res.render("index",{campgrounds:allCampgrounds});
	});
});


app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name: name, image: image, description:desc}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err)
			console.log(err);
		else
			res.redirect("/campgrounds");
	});
});

app.get("/campgrounds/new",function(req,res){

res.render("new.ejs");

});


app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
			console.log(err);
		else
			res.render("show",{campground: foundCampground});
	});
});



app.listen(8083,function(){ console.log("yo"); });
