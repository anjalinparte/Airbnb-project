const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require("multer");
const {storage} = require("../cloudconff.js");
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.createlisting)

);




//new route
router.get("/new",isLoggedIn,listingController.renderNewFrom);


router.route("/:id")
.get(isLoggedIn,wrapAsync(listingController.showlisting))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(listingController.renderUpdateFrom))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.renderdeleteFrom ));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditfrom ));


module.exports=router;

