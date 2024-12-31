




export const test = (req:Request, res:Response) => {
    const {title, subTitle} = req.body
    res.status(200).json({title,subTitle})
  }
  export const uploadImageController = async (req: RequestWithUserRole, res: Response) => {
    const userid = req.userid;
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 400, message: "No image file provided" });
    }
  
    const {title} = req.body
    const { buffer, originalname } = req.file;
  
    try {
      const pool = await connectToDatabase();
      await pool
        .request()
        .input("ImageName", sql.NVarChar, originalname)
        .input("ImageData", sql.VarBinary(sql.MAX), buffer).query(`
              INSERT INTO Images (ImageName, ImageData) 
              VALUES (@ImageName, @ImageData)
          `);
  
      res
        .status(200)
        .json({ status: 200, message: "Image uploaded successfully",userid });
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      res
        .status(500)
        .json({
          status: 500,
          message: "Failed to upload image",
          details: error.message,
        });
    }
  };
  