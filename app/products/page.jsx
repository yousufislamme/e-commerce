"use client";

import { productsLoad } from "@/app/api/productsData";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data using productsLoad
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await productsLoad();
        setData(products);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container px-10 pb-10">
      <Title titleName="Products" />
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-4">
        {loading && <h2 className="text-center">Loading...</h2>}
        {!loading && data.length === 0 && <h2 className="text-center">No products found.</h2>}
        {data?.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
