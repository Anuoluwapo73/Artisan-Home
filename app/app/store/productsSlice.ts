import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Product type
export type iProduct = {
  url: string;
  category: string;
  productName: string;
  rating: number;
  amount: number;
};

//State type
interface ProductsState {
  products: iProduct[];
  filteredProducts: iProduct[];
  selectedCategory: string | null;
  sortOptions: string;
  priceRange: number[];
  searchQuery: string;
}
const productsArray: iProduct[] = [
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732870/image_4_gvv9wy.jpg",
    category: "Furniture",
    productName: "Modern Accent Chair",
    rating: 4.5,
    amount: 299,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732842/image_5_tpy2w5.jpg",
    category: "Furniture",
    productName: "Minimalist Sofa",
    rating: 4.8,
    amount: 899,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732874/image_6_rroh2a.jpg",
    category: "Furniture",
    productName: "Designer Armchair",
    rating: 4.3,
    amount: 449,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732839/image_7_zosuvw.jpg",
    category: "Furniture",
    productName: "Lounge Chair",
    rating: 4.6,
    amount: 379,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732836/image_8_vq7jht.jpg",
    category: "Furniture",
    productName: "Dining Chair Set",
    rating: 4.7,
    amount: 599,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732830/image_9_pbv8jz.jpg",
    category: "Furniture",
    productName: "Reading Chair",
    rating: 3,
    amount: 329,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732802/image_10_a24ouy.jpg",
    category: "Furniture",
    productName: "Office Chair",
    rating: 5,
    amount: 549,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169983/modern_minimalist_fu_0a0db875_eegruw.jpg",
    category: "Furniture",
    productName: "Rocking Chair",
    rating: 2,
    amount: 399,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169874/modern_home_decor_ac_3ceb2041_vrsb0h.jpg",
    category: "Decor",
    productName: "Ceramic Vase",
    rating: 3,
    amount: 189,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732842/image_5_tpy2w5.jpg",
    category: "Decor",
    productName: "Wall Art Set",
    rating: 1.6,
    amount: 149,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169972/modern_home_decor_ac_fd9b9cb8_xlfl3e.jpg",
    category: "Lighting",
    productName: "Table Lamp",
    rating: 5,
    amount: 129,
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169905/modern_home_decor_ac_3521a7ec_xgymlj.jpg",
    category: "Textiles",
    productName: "Throw Pillows",
    rating: 3.7,
    amount: 159,
  },
];
//Initial State
const initialState: ProductsState = {
  products: productsArray,
  filteredProducts: [...productsArray],
  selectedCategory: null,
  sortOptions: "Featured",
  priceRange: [0],
  searchQuery: "",
};
//Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<iProduct[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    setSortOptions(state, action: PayloadAction<string>) {
      state.sortOptions = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    setPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    clearFilters(state) {
      state.selectedCategory = null;
      state.sortOptions = "Featured";
      state.priceRange = [0];
      state.searchQuery = "";
      state.filteredProducts = state.products;
    },
  },
});

//Centralized filter function
const filterProducts = (state: ProductsState): iProduct[] => {
  let filtered = state.products.sort(() => Math.random() - 0.5).slice(0, 8);

  if (state.selectedCategory) {
    filtered = filtered.filter((p) => p.category === state.selectedCategory);
  }
  filtered = filtered.filter((p) => p.amount >= state.priceRange[0]);
  if (state.searchQuery) {
    filtered = filtered.filter((p) =>
      p.productName.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  switch (state.sortOptions) {
    case "Low to High":
      filtered.sort((a, b) => a.amount - b.amount);
      break;
    case "High to Low":
      filtered.sort((a, b) => b.amount - a.amount);
      break;
    case "Name":
      filtered.sort((a, b) => a.productName.localeCompare(b.productName));
      break;
    case "Highest Rated":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  return filtered;
};

export const {
  setProducts,
  setCategory,
  setSortOptions,
  setPriceRange,
  setSearchQuery,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
