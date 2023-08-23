import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { VIEW_ORDERS_VIEW_API } from "assets/api/orderManagementApi";

const OrderDetailsModal = ({ open, onClose, orderDetails }) => {
  const [data, setData] = useState(null);

  // create a download function for pdf:
  const onDownload = () => {
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    const link = document.createElement("a");
    link.download = `download.txt`;
    link.href = "./download.txt";
    link.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (orderDetails) {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        const token = userToken?.token;
        if (token) {
          try {
            const apiResponse = await VIEW_ORDERS_VIEW_API(token, orderDetails);
            if (apiResponse?.status === 200) {
              setData(apiResponse?.data);
              // Handle success, e.g., show a success message
              // toast.success(apiResponse.message);
              // Perform any other necessary actions
            } else {
              // Handle API errors, e.g., show an error message
              // toast.error(apiResponse.error);
            }
          } catch (error) {
            // Handle errors that occur during the API call
            console.error("An error occurred:", error);
            // toast.error("An error occurred. Please try again later.");
          }
        }
      }
    };

    fetchData(); // Call the function to fetch data
  }, [orderDetails]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="order-details-modal">
      <Box className="modal-container">
        <Typography variant="h6" component="h2">
          Order Details
        </Typography>
        <div className="order-details-content">
          {/* Display order details */}
          <Typography variant="body1">
            Product Name: {data?.product?.product_actual_name}
          </Typography>
          <Typography variant="body2">
            Product Price: {data?.final_price}
          </Typography>
          <Typography variant="body2">
            Order Date: {data?.order_date}
          </Typography>
          <Typography variant="body2">Payment: {data?.payment_type}</Typography>
          <Typography variant="body2">
            product price per centimeter square:{" "}
            {data?.product?.product_price_per_centimeter_square}
          </Typography>
          <Typography variant="body2">
            Product height cm: {data?.product_height_cm}
          </Typography>
          <Typography variant="body2">
            product width cm: {data?.product_width_cm}
          </Typography>
          <Typography variant="body2">
            Tax percentage: {data?.tax_percentage}
          </Typography>
          <Typography variant="body2">
            Delivery charge: {data?.total_delivery_charge}
          </Typography>
          <Typography variant="body2">
            User Name: {data?.user?.first_name}
          </Typography>
          <Typography variant="body2">
            User Email: {data?.user?.email}
          </Typography>
          <Typography variant="body2">Status: {data?.order_status}</Typography>
          <Typography variant="body2">
            Download Product Pdf:{" "}
            <Button onClick={onDownload} variant="contained" color="success">
              Download Pdf
            </Button>
          </Typography>
        </div>
        <Button onClick={onClose} className="close-button">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default OrderDetailsModal;
