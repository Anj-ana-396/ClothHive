
const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv")
dotenv.config()
const connectDB = require("./config/db.js")
const userRoutes = require("./routes/userRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js")
const  checkoutRoutes = require("./routes/checkoutRoutes.js")
const  orderRoutes = require("./routes/orderRoutes.js")
const  uploadRoutes = require("./routes/uploadRoutes.js")
const  subscriberRoutes = require("./routes/subscriberRoutes.js")
const  adminRoutes = require("./routes/adminRoutes.js")
const  productAdminRoutes = require("./routes/productAdminRoutes.js")
const  adminOrderRoutes = require("./routes/adminOrderRoutes.js")




const app = express();
app.use(express.json());
app.use(cors());


// console.log(process.env.PORT)
const PORT = process.env.PORT || 3000


//Connecting mongodb atlas
const dns = require("node:dns"); 
dns.setServers(["1.1.1.1", "8.8.8.8"]);
connectDB() 



app.get("/", (req, res) => {
res.send("WELCOME TO RABBIT API!");
})


///API ROUTES..use middleware..for all files in routes folder
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api", subscriberRoutes)


//ADMIN ROUTES
app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productAdminRoutes)
app.use("/api/admin/orders", adminOrderRoutes)












app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`)
})

