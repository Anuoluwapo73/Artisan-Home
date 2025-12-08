"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; // adjust path to your store
import {
  setCategory,
  setSortOptions,
  setPriceRange,
  clearFilters,
} from "../store/productsSlice";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductsCard from "./ProductsCard";
import { Slider } from "@/components/ui/slider";

const categories = ["Furniture", "Decor", "Lighting", "Textiles", "Storage"];

const AllProducts = () => {
  const dispatch = useDispatch();
  const { filteredProducts, selectedCategory, sortOptions, priceRange } =
    useSelector((state: RootState) => state.products);

  return (
    <div className="mb-30">
      <header className="flex items-center justify-between mb-10">
        <h3 className="text-4xl sm:text-3xl playfair-display-regular font-bold">
          All Products
        </h3>
        <select
          className="border-2 p-2 rounded-sm w-[200px]"
          value={sortOptions}
          onChange={(e) => dispatch(setSortOptions(e.target.value))}
        >
          <option value="Featured">Featured</option>
          <option value="Low to High">Price: Low to High</option>
          <option value="High to Low">Price: High to Low</option>
          <option value="Name">Name: A to Z</option>
          <option value="Highest Rated">Highest Rated</option>
        </select>
      </header>

      {/* FIXED GRID STRUCTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar appears ONLY on large screens */}
        <section className="hidden lg:block col-span-1 border px-5 py-4 rounded-lg h-[380px]">
          <header className="flex mb-2 justify-between items-center">
            <h4 className="text-2xl font-semibold">Filters</h4>
            <button
              onClick={() => dispatch(clearFilters())}
              className=" px-5 py-2 rounded-md hover:bg-gray-100"
            >
              Clear All
            </button>
          </header>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">Category</h3>
            <div className="space-y-5">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCategory === category}
                    onCheckedChange={(checked) => {
                      dispatch(setCategory(checked ? category : null));
                    }}
                    className="border-orange-500 size-4"
                  />
                  <Label className="font-normal">{category}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <h3 className="text-xl font-semibold">Price Range</h3>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange} //controlled value
              onValueChange={(value) => dispatch(setPriceRange(value))} //update state
              className="mb-3 mt-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>$1000</span>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full items-center justify-center flex flex-col gap-5 my-[80]">
                <p className="text-muted-foreground ">
                  No products found matching your criteria
                </p>
                <button
                  onClick={() => dispatch(clearFilters())}
                  className="border-2 px-5 py-2 rounded-md hover:bg-gray-100"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredProducts
                .slice(0, 8)
                .map((product, index) => (
                  <ProductsCard
                    key={index}
                    url={product.url}
                    category={product.category}
                    productName={product.productName}
                    rating={product.rating}
                    amount={product.amount.toString()}
                  />
                ))
                .sort(() => Math.random() - 0.5)
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllProducts;
