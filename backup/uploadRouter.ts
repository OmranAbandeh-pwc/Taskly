


// Create task a POST route
router.post("/add/image", upload.single("file"),verifyToken, uploadImageController);

// Create task a POST route
router.post("/test", verifyToken, upload.single("file"), test);
