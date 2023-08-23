import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { GET_PRODUCT_API } from "assets/api/productManagementApi";

const Projects = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    dataShowLimit: 3,
    numberOfPages: 0,
  });

  async function getProductData() {
    const searchData = {
      page: page.currentPage,
      limit: page.dataShowLimit,
    };
    const productListData = await GET_PRODUCT_API(searchData);
    if (productListData.status === 200) {
      setProductList(productListData.data);
      let totalCount = productListData.count;
      if (totalCount > 0) {
        let numberOfPages = Math.ceil(totalCount / page.dataShowLimit);
        setPage((p) => {
          return { ...page, numberOfPages: numberOfPages };
        });
      }
    } else {
      setProductList([]);
    }
  }

  useEffect(() => {
    getProductData();
  }, [page.currentPage]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Frame Picture</TableCell>
            <TableCell>Frame</TableCell>
            <TableCell>Price sq.cm (SAR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList &&
            productList?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell>
                  <img
                    src={row?.product_picture}
                    alt={row?.product_actual_name}
                    style={{ width: "3rem", height: "3rem" }}
                  />
                </TableCell>

                <TableCell>{row?.product_actual_name}</TableCell>

                <TableCell>
                  {row?.product_price_per_centimeter_square}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Projects;
