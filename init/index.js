const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing= require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust123";

main()
.then(()=>{
    console.log("connected to Db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany();
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"664edce59e3a2a0053ef1123"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();
