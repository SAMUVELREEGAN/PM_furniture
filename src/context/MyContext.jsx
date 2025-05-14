import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [webLinks, setWebLinks] = useState([]);
  const [products, setProducts] = useState([]);
  const [size, setSizes] = useState([]);  // Added state for sizes
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch categories
        const categoriesRes = await axios.get('http://127.0.0.1:8000/api/categories/');
        setCategories(categoriesRes.data);

        // Fetch colors
        const colorsRes = await axios.get('http://127.0.0.1:8000/api/colors/');
        setColorList(colorsRes.data);

        // Fetch types
        const typesRes = await axios.get('http://127.0.0.1:8000/api/types/');
        setTypeList(typesRes.data);

        // Fetch web links
        const webLinksRes = await axios.get('http://127.0.0.1:8000/api/weblinks/');
        setWebLinks(webLinksRes.data);

        // Fetch products
        const productsRes = await axios.get('http://127.0.0.1:8000/api/product/');
        setProducts(productsRes.data.products);

        // Fetch sizes
        const sizesRes = await axios.get('http://127.0.0.1:8000/api/sizes/');
        setSizes(sizesRes.data);  // Store sizes data in state
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch data, please try again later.');
      }
    };

    

    fetchData();
  }, []); // Runs once when the component mounts

   const BASE_URL = 'http://localhost:8000';
   
  return (
    <MyContext.Provider value={{ categories, colorList, typeList, webLinks, products, size, error ,BASE_URL }}>
      {children}
    </MyContext.Provider>
  );
};
