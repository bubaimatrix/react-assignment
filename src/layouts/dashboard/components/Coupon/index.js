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
import { GET_COUPON_API, DELETE_COUPON_API } from "assets/api/couponManagementApi";
import validationMessage from "utils/validationMessage";
import moment from "moment";
import CUDialog from "components/CUDialog";
import CUPagination from "components/CUPagination";

// const rows = [
//   createData("1", "Eid Special", "HOLA222", "2023-06-14", "2023-06-24","Edit","Delete"),
//   createData("2", "New Year", "ONBOARD11", "2023-06-15", "2023-06-22","Edit","Delete"),
//   createData("3", "Christmas", "WELCOME20", "2023-07-21", "2023-07-28","Edit","Delete"),
// ];

// function createData(name, calories, fat, carbs, protein, end,dele) {
//   return { name, calories, fat, carbs, protein, end,dele };
// }

// function toInch(cm) {
//   return (cm / 2.54).toFixed(2);
// }

// function toInchRange(from, to) {
//   return `${toInch(from)} - ${toInch(to)}`;
// }

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

function Coupon() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const { sales, tasks } = reportsLineChartData;

  const navigate = useNavigate();
  toast.configure({
    autoClose: 17000,
    draggable: true,
  });

  // function to create a coupon
  const add = () => {
    console.log("clicked");
    navigate("/create-coupon");
  };

  const [couponList, setCouponList] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    dataShowLimit: 3,
    numberOfPages: 0
  });

  async function getCouponData() {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const token = userToken?.token;
    if (token) {
      const searchData = {
        page: page.currentPage, 
        limit: page.dataShowLimit 
      };

      const couponListData = await GET_COUPON_API(token, searchData);
      console.log("couponListData->> ", couponListData);
      if(couponListData.status === 200) {
        setCouponList(couponListData.data);
        let totalCount = couponListData.count;
        if(totalCount > 0) {
          let numberOfPages = Math.ceil(totalCount / page.dataShowLimit);
          setPage((p) => { return { ...page, numberOfPages: numberOfPages } });
        }
      } else {
        setCouponList([]);
      }
    } else {
      toast.error(validationMessage.PLEASE_LOGIN);
    }
  }

  useEffect(()=> {
    getCouponData();
  }, [ page.currentPage ]);

  const handlePaginationChange = (e, p) => {
    console.log("Page->> ", e,p);
    setPage({ ...page, currentPage: p });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState();
  const handleClickDialogOpen = (couponId) => {
    console.log("Data-->>", couponId);
    setDeleteCoupon(couponId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteCoupon = async (couponId) => {
    console.log("ENTER in handleDeleteCoupon", couponId);
    if(couponId) {
      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      const token = userToken?.token;
      if (token) {
        const apiResponse = await DELETE_COUPON_API(token, couponId);
        if(apiResponse?.status === 200) {
          toast.success(apiResponse.message);
          setOpenDialog(false);
          // navigate("/product-management");
          // window.location.reload();
          getCouponData();
        } else {
          if(apiResponse && apiResponse.message) {
            toast.error(apiResponse.message);
          } else {
            toast.error(`${apiResponse?.errors[0]?.path} ${apiResponse?.errors[0]?.msg}`);
          }
        }
      } else {
        toast.error(validationMessage.PLEASE_LOGIN);
      }
    }
  }

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
            Coupon Management
          </MDTypography>
          {/* <Button variant="contained" onClick={add}>Create a New User</Button> */}
          <MDButton variant="gradient" color="dark" onClick={add}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Create a New Coupon
          </MDButton>
        </MDBox>
        <MDBox py={3}>
          <Grid container spacing={3}></Grid>
          <MDBox>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                  {/* <h5 className="refferal">Coupon Management</h5> */}
                  <StyledTableRow sx={{ minWidth: 450 }}>
                    <StyledTableCell>Name (English)</StyledTableCell>
                    <StyledTableCell>Name (Arabic)</StyledTableCell>
                    <StyledTableCell>Code</StyledTableCell>
                    <StyledTableCell>Discount</StyledTableCell>
                    <StyledTableCell>
                      Start Date
                    </StyledTableCell>
                    <StyledTableCell>
                      End Date
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Actions
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {couponList ? ( couponList.length > 0 ? couponList.map((row) => (
                    <StyledTableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell  component="td" scope="row" className="common-25">
                        {row?.coupon_name?.en}
                      </StyledTableCell>
                      <StyledTableCell  component="td" scope="row" className="common-25">
                        {row?.coupon_name?.ar}
                      </StyledTableCell>
                      <StyledTableCell  component="td" scope="row" className="common-25">{row?.coupon_code}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.discount_type ? row.discount_type.charAt(0).toUpperCase() + row.discount_type.slice(1) : ""} ({row?.discount_amount})
                      </StyledTableCell>
                      <StyledTableCell  component="td" scope="row" className="common-25">
                        {moment(row?.coupon_valid_from).format('YYYY-MM-DD')}
                      </StyledTableCell>
                      <StyledTableCell  component="td" scope="row" className="common-25">
                        {moment(row?.coupon_valid_till).format('YYYY-MM-DD')}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <CUDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} deleteId={deleteCoupon} handleDelete={handleDeleteCoupon} headingMessage="Confirmation" bodyMessage="Are you sure want to delete ?" />
                        <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                          <MDBox>
                            <Link to={`/coupon/edit/${row._id}`} preventScrollReset={true}>
                              <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                                <Icon>edit</Icon>&nbsp;edit
                              </MDButton>
                            </Link>
                            <MDButton variant="text" color="error" onClick={() => handleClickDialogOpen(row._id)}>
                              <Icon>delete</Icon>&nbsp;delete
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </StyledTableCell>
                    </StyledTableRow>
                  )) : 
                    <StyledTableRow key={0} sx={{"&:last-child td, &:last-child th": { border: 0 },}}>
                        <StyledTableCell component="td" scope="row" className="common-15"></StyledTableCell>
                        <StyledTableCell component="td" scope="row" className="common-15"></StyledTableCell>
                        <StyledTableCell component="td" scope="row" className="common-15"></StyledTableCell>
                        <StyledTableCell align="left" className="common-15">No Coupon Found</StyledTableCell>
                        <StyledTableCell component="td" scope="row" className="common-15"></StyledTableCell>
                        <StyledTableCell component="td" scope="row" className="common-15"></StyledTableCell>
                        <StyledTableCell component="td" scope="row" className="common-15"></StyledTableCell>
                      </StyledTableRow> ) :
                    <Box sx={{ display: 'flex', textAlign: 'center' }}><CircularProgress /></Box>
                  }
                </TableBody>
                <TableFooter>
                    <CUPagination numberOfPages = {page.numberOfPages} currentPage = {page.currentPage} onChange = {handlePaginationChange}/>
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

export default Coupon;
