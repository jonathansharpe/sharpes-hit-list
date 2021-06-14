const express=require("express");
const app= express();app.get("/", function(req,res){
  res.send("Welcome to the world of science fiction, conflicting theories, fantasies and some eccentric nerds!")
});app.listen(3000, function(){
        console.log("SERVER STARTED ON localhost:3000");
})
