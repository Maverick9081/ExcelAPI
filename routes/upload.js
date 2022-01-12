import express  from "express";

export const uploadRoutes = express.Router();
import  { upload }   from "../controller/upload.js";

uploadRoutes.post('/',upload);

// module.exports = router;
// export default router;
