

// for EFFCONFUSED ERROR
const dns = require("node:dns"); // to resolve dns bug econrefused error...latest mongodb node error..always put this before connectdb()
dns.setServers(["1.1.1.1", "8.8.8.8"]);



// this file is to use products from data folder...for various backend...as it has 20 products...this is nothing but 20 producys json file..bcoz we need datta to work with..and its acta  as dummy datta
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.js")
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");
const Cart = require("./models/Cart.js")




// Function to seed data
const seedData = async () => {
    try {

        await connectDB()

        // Clear existing data... all old data and old user...everytime this fucntion runs
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();


        // Create a default admin User...after all old user and products are cleared
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "Ad@min937",
            role: "admin",
        })


        // Assign the default user ID to each product
        const userID = createdUser._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });


        //Insert the product into the dattabase
        await Product.insertMany(sampleProducts)

        console.log("product data seeded succesfully")
        process.exit()

    } catch (error) {
        console.error("Error seeding the data: ", error) 
        process.exit(1)
    }
}

seedData()