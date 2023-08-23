// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Box, Card, CircularProgress, Icon, TableFooter } from "@mui/material";
import MDTypography from "components/MDTypography";
import Bill from "layouts/billing/components/Bill";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

//Table code  import:
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMaterialUIController } from "context";
import { useEffect, useState } from "react";
import {
  GET_COUPON_API,
  DELETE_COUPON_API,
} from "assets/api/couponManagementApi";
import validationMessage from "utils/validationMessage";
import moment from "moment";
import CUDialog from "components/CUDialog";
import CUPagination from "components/CUPagination";
import { GET_ORDERS_API_LIST } from "assets/api/orderManagementApi";
import { VIEW_ORDERS_VIEW_API } from "assets/api/orderManagementApi";
import OrderDetailsModal from "utils/OrderDetailsModal";
import MDBadge from "components/MDBadge";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function OrdersManagements() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const { sales, tasks } = reportsLineChartData;

  const navigate = useNavigate();
  toast.configure({
    autoClose: 17000,
    draggable: true,
  });

  const [ordersList, setordersList] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    dataShowLimit: 3,
    numberOfPages: 0,
  });

  async function getCouponData() {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const token = userToken?.token;
    if (token) {
      const searchData = {
        page: page.currentPage,
        limit: page.dataShowLimit,
      };

      const ordersListData = await GET_ORDERS_API_LIST(token, searchData);
      if (ordersListData.status === 200) {
        setordersList(ordersListData.data);
        let totalCount = ordersListData.count;
        if (totalCount > 0) {
          let numberOfPages = Math.ceil(totalCount / page.dataShowLimit);
          setPage((p) => {
            return { ...page, numberOfPages: numberOfPages };
          });
        }
      } else {
        setordersList([]);
      }
    } else {
      toast.error(validationMessage.PLEASE_LOGIN);
    }
  }

  useEffect(() => {
    getCouponData();
  }, [page.currentPage]);

  const handlePaginationChange = (e, p) => {
    setPage({ ...page, currentPage: p });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState();
  const handleClickDialogOpen = (orderId) => {
    setDeleteCoupon(orderId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(""); // Store the order details here

  const handleOpenModal = (orderDetails) => {
    setSelectedOrder(orderDetails);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder("");
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox
          pt={2}
          px={2}
          display="flex"
          variant="gradient"
          borderRadius="lg"
          coloredShadow="info"
          bgColor="info"
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="15px"
        >
          <MDTypography variant="h6" color="white">
            Orders List
          </MDTypography>
        </MDBox>
        <MDBox py={3}>
          <Grid container spacing={3}></Grid>
          <MDBox>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                  {/* <h5 className="refferal">Coupon Management</h5> */}
                  <StyledTableRow sx={{ minWidth: 450 }}>
                    <StyledTableCell>Order Id</StyledTableCell>
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell>Product Price</StyledTableCell>
                    <StyledTableCell>Product Picture</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Order Status</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {ordersList ? (
                    ordersList.length > 0 ? (
                      ordersList.map((row) => (
                        <StyledTableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell
                            component="td"
                            scope="row"
                            className="common-25"
                          >
                            {row?.order_id}
                          </StyledTableCell>
                          <StyledTableCell
                            component="td"
                            scope="row"
                            className="common-25"
                          >
                            {row?.product?.product_actual_name}
                          </StyledTableCell>
                          <StyledTableCell
                            component="td"
                            scope="row"
                            className="common-25"
                          >
                            {row?.final_price}
                          </StyledTableCell>
                          <StyledTableCell
                            component="td"
                            scope="row"
                            className="common-25"
                          >
                            <img
                              src={row?.product?.product_picture}
                              alt={row?.product?.product_actual_name}
                              style={{ width: "3rem", height: "3rem" }}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            component="td"
                            scope="row"
                            className="common-25"
                          >
                            {row?.quantity}
                          </StyledTableCell>
                          <StyledTableCell
                            component="td"
                            scope="row"
                            className="common-25"
                          >
                            <MDBox ml={-1}>
                              <MDBadge
                                badgeContent={row?.order_status}
                                color={row?.order_status === "success" ? "success" : "error"}
                                // variant="gradient"
                                size="sm"
                              />
                            </MDBox>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <CUDialog
                              openDialog={openDialog}
                              handleCloseDialog={handleCloseDialog}
                              deleteId={deleteCoupon}
                              headingMessage="Confirmation"
                              bodyMessage="Are you sure want to delete ?"
                            />
                            <MDBox
                              display="flex"
                              alignItems="center"
                              mt={{ xs: 2, sm: 0 }}
                              ml={{ xs: -1.5, sm: 0 }}
                            >
                              <MDBox>
                                <MDButton
                                  variant="text"
                                  color="error"
                                  onClick={() => handleOpenModal(row._id)} // onClick={() => handleViewOders(row._id)}
                                >
                                  <RemoveRedEyeIcon />
                                   {/* view */}
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow
                        key={0}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell
                          component="td"
                          scope="row"
                          className="common-15"
                        ></StyledTableCell>
                        <StyledTableCell
                          component="td"
                          scope="row"
                          className="common-15"
                        ></StyledTableCell>
                        <StyledTableCell
                          component="td"
                          scope="row"
                          className="common-15"
                        ></StyledTableCell>
                        <StyledTableCell align="left" className="common-15">
                          No Coupon Found
                        </StyledTableCell>
                        <StyledTableCell
                          component="td"
                          scope="row"
                          className="common-15"
                        ></StyledTableCell>
                        <StyledTableCell
                          component="td"
                          scope="row"
                          className="common-15"
                        ></StyledTableCell>
                        <StyledTableCell
                          component="td"
                          scope="row"
                          className="common-15"
                        ></StyledTableCell>
                      </StyledTableRow>
                    )
                  ) : (
                    <Box sx={{ display: "flex", textAlign: "center" }}>
                      <CircularProgress />
                    </Box>
                  )}
                  <OrderDetailsModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    orderDetails={selectedOrder}
                  />
                </TableBody>
                <TableFooter>
                  <CUPagination
                    numberOfPages={page.numberOfPages}
                    currentPage={page.currentPage}
                    onChange={handlePaginationChange}
                  />
                </TableFooter>
              </Table>
            </TableContainer>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Card></Card>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default OrdersManagements;
