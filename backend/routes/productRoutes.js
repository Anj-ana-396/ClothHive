const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();







// @route POST /api/products
// to Create a new Product by only admin and not customer
//  Private/Admin access...if its by admin it is private route..and by user then public routs
router.post("/", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;
        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category, brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id 
        })

        const createdProduct = await product.save()// saves the created product to mongodb
        res.status(201).json(createdProduct)

    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})






// @route PUT /api/products/:id
// for Update an existing product ID only by admin and not customer
// access only by Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;
        const product = await Product.findById(req.params.id)
        if (product) {
            //update field datils by admin
            product.name = name || product.name 
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured =
                isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished =
                isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;


            //save the update details to mongodb database
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        }
        else {
            res.status(404).json({ message: "Product not found" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})




// @route DELETE /api/products/:id
// to Delete a product by ID by admin only
// access by Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Find the product by ID
        if (product) {
            await product.deleteOne(); // Remove the product from DB
            res.json({ message: "Product removed" });
        }
        else {
            res.status(404).json({ message: "Product not found" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})



// @route GET /api/products
// to Get all products with optional query filters
//  Public access
router.get("/", async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query
        let query = {}

        //Filtering logic
        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection; // .we want user to choose one catergory
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category;// we want user to choose just one category
        }
        if (material) {
            query.material = { $in: material.split(",") } 
        }
        if (brand) {
            query.brand = { $in: brand.split(",") } 
        }
        if (size) {
            query.sizes = { $in: size.split(",") } 
        }
        if (color) {
            query.colors = { $in: [color] };
        }
        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } }, 
                { description: { $regex: search, $options: "i" } },
            ]
        }


        // Sort Logic..here sortby is react method
        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }


        // Fetch products and apply sorting and limit
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)

    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})




// @route GET /api/products/best-seller
// TO Retrieve the product with highest rating
//  Public ACCESS
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller);
        } else {
            res.status(404).json({ message: "No Bestseller found" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})




// @route GET /api/products/new-arrivals
// to Retrieve latest  products  using Creation date atleats 8
//  Public access
router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})






// @route GET /api/products/:id
// to  Get a single product by ID
// Public access
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})





// @route GET /api/products/similar/:id
// to Retrieve similar products based on the current product's gender and category
// for  Public access
router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const similarProducts = await Product.find({
            _id: { $ne: id }, 
            gender: product.gender,
            category: product.category,
        }).limit(4)

        res.json(similarProducts)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})





module.exports = router