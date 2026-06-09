import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"

const FilterSidebar = () => {



    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [priceRange, setPriceRange] = useState([0, 100])
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    })




    const categories = ["Top Wear", "Bottom Wear"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const genders = ["Men", "Women"]

    const colors = [
        "Red",
        "Blue",
        "Black",
        "Green",
        "Yellow",
        "Gray",
        "White",
        "Pink",
        "Beige",
        "Navy",]

    const materials = [
        "Cotton",
        "Wool",
        "Denim",
        "Polyester",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece",]

    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",]



    useEffect(() => {

        const params = Object.fromEntries([...searchParams])



        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 0,
        })
        setPriceRange([0, params.maxPrice || 100])
    }, [searchParams])





    const handleFilterChange = (e) => {

        const { name, value, checked, type } = e.target
        let newFilters = { ...filters }

       


        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value]
            }
            else {
                newFilters[name] = newFilters[name].filter((item) => item !== value)
            }
        }
        else {
            newFilters[name] = value
        }
        setFilters(newFilters)
        updateURLParams(newFilters) 
    }




    //updating url according to selcted filter by user
    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams()

        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","))
            }
            else if (newFilters[key]) {
                params.append(key, newFilters[key])
            }
        })

        setSearchParams(params)
        navigate(`?${params.toString()}`)
    }


    //for price range slider at end
    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice])
        const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice }
        setFilters(newFilters)
        updateURLParams(newFilters)
    }



    return (
        <div className="p-4 m-1  ">

            <h3 className="text-2xl font-bold text-cornflower-blue-500 mb-4">Filter</h3>


            {/* Category Filter */}
            <div className="mb-6">
                <label className="block text-cornflower-blue-500 font-medium mb-1 ">Category</label>
                {categories.map((category) => (
                    <div key={category} className="flex items-center mb-0.5 ">
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            onChange={handleFilterChange}
                            checked={filters.category === category}
                            className="mr-2 h-3 w-3 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <p className='text-gray-600 text-sm mr-2 '>{category}</p>
                    </div>
                ))}
            </div>



            {/* Gender Filter */}
            <div className="mb-6">
                <label className="block text-cornflower-blue-500 font-medium mb-1">Gender</label>
                {genders.map((gender) => (
                    <div key={gender} className="flex items-center mb-0.5 ">
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            onChange={handleFilterChange}
                            checked={filters.gender === gender}
                            className="mr-2 h-3 w-3 text-blue-500 focus:ring-blue-400 border-gray-300"
                        />
                        <p className='text-gray-600 text-sm'>{gender}</p>
                    </div>
                ))}
            </div>



            {/* Color Filter */}
            <div className="mb-6">
                <label className="block text-cornflower-blue-500 font-medium mb-2.5">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            name="color"
                            value={color}
                            checked={filters.color === color}
                            onClick={handleFilterChange}
                            className={`w-7 h-7 rounded-full border border-gray-600 cursor-pointer transition hover:scale-105  ${filters.color === color ? " ring-2 text-black" : "ring-0 opacity-60"}`}
                            style={{ backgroundColor: color.toLowerCase() }}
                        ></button>
                    ))}
                </div>
            </div>



            {/* Size Filter */}
            <div className="mb-6">
                <label className="block text-cornflower-blue-500 font-medium mb-1">Size</label>
                {sizes.map((size) => (
                    <div key={size} className="flex items-center mb-0.5">
                        <input
                            type="checkbox"
                            name="size"
                            value={size}
                            onChange={handleFilterChange}
                            checked={filters.size.includes(size)}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                        <span className="text-gray-700 text-sm">{size}</span>
                    </div>
                ))}
            </div>



            {/* Material Filter */}
            <div className="mb-6">
                <label className="block text-cornflower-blue-500 font-medium mb-1">Material</label>
                {materials.map((material) => (
                    <div key={material} className="flex items-center mb-0.5">
                        <input
                            type="checkbox"
                            name="material"
                            value={material}
                            onChange={handleFilterChange}
                            checked={filters.material.includes(material)}
                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                        <span className="text-gray-700 text-sm">{material}</span>
                    </div>
                ))}
            </div>



            {/* Brand Filter */}
            <div className="mb-6">
                <label className="block text-cornflower-blue-500 font-medium mb-1">Brand</label>
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center mb-0.5">
                        <input
                            type="checkbox"
                            name="brand"
                            value={brand}
                            onChange={handleFilterChange}
                            checked={filters.brand.includes(brand)}

                            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                        <span className="text-gray-700 text-sm">{brand}</span>
                    </div>
                ))}
            </div>


            {/* Price Range Filter */}
            <div className='mb-6'>
                <label className='block text-cornflower-blue-500  font-medium '>Price Range</label>
                <input
                    type="range"
                    name="priceRange"
                    min={0}
                    max={100}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className='w-full h-2 bg-gray-300 rounded-lg  cursor-pointer' />
                <div className='text-sm  flex justify-between mx-1'>
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>






        </div>










    )
}

export default FilterSidebar
