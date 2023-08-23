
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import {
  Button,
  CardContent,
  Icon,
  TableFooter,
  Typography,
} from "@mui/material";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";

//Table :

import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { GET_PRODUCT_API } from "assets/api/productManagementApi";
import CUPagination from "components/CUPagination";
import CUDialog from "components/CUDialog";
import { useMaterialUIController } from "context";
import { DELETE_PRODUCT_API } from "assets/api/productManagementApi";
import { toast } from "react-toastify";
import validationMessage from "utils/validationMessage";
import { GET_ADMIN_LIST } from "assets/api/adminManagementApi";
import { DELETE_ADMIN_API } from "assets/api/adminManagementApi";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// function toInch(cm) {
//   return (cm / 2.54).toFixed(2);
// }

// function toInchRange(from, to) {
//   return `${toInch(from)} - ${toInch(to)}`;
// }

function ManageAdminAccounts() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const navigate = useNavigate();
  toast.configure({
    autoClose: 17000,
    draggable: true,
  });

  // function to create a products
  const add = () => {
    console.log("clicked");
    navigate("/create-admin");
  };

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

  const [adminList, setadminList] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    dataShowLimit: 3,
    numberOfPages: 0,
  });

  // async function getAdminData() {
  const getAdminData = async () => {
    const searchData = {
      page: page.currentPage,
      limit: page.dataShowLimit,
    };
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const token = userToken?.token;
    if (token) {
      const searchData = {
        page: page.currentPage,
        limit: page.dataShowLimit,
      };
      const adminListData = await GET_ADMIN_LIST(token, searchData);
      if (adminListData?.status === 200) {
        setadminList(adminListData?.data);
        let totalCount = adminListData?.count;
        if (totalCount > 0) {
          let numberOfPages = Math.ceil(totalCount / page.dataShowLimit);
          setPage((p) => {
            return { ...page, numberOfPages: numberOfPages };
          });
        }
      } else {
        setadminList([]);
      }
    }
  };

  useEffect(() => {
    getAdminData();
  }, [page.currentPage]);

  const handlePaginationChange = (e, p) => {
    console.log("Page->> ", e, p);
    setPage({ ...page, currentPage: p });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState();
  const handleClickDialogOpen = (productId) => {
    setDeleteProduct(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (productId) {
      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      const token = userToken?.token;
      if (token) {
        const apiResponse = await DELETE_ADMIN_API(token, productId);
        if (apiResponse?.status === 200) {
          toast.success(apiResponse.message);
          setOpenDialog(false);
          // navigate("/product-management");
          // window.location.reload();
          getAdminData();
        } else {
          if (apiResponse && apiResponse.message) {
            toast.error(apiResponse.message);
          } else {
            toast.error(
              `${apiResponse?.errors[0]?.path} ${apiResponse?.errors[0]?.msg}`
            );
          }
        }
      } else {
        toast.error(validationMessage.PLEASE_LOGIN);
      }
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
                  Manage Admin Accounts
                </MDTypography>
                {/* <Button variant="contained" onClick={add}>Create a New User</Button> */}
                <MDButton variant="gradient" color="dark" onClick={add}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Create a New Admin
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                      <StyledTableRow className="table-data">
                        <StyledTableCell>UsersName</StyledTableCell>
                        <StyledTableCell>Profile Picture</StyledTableCell>
                        <StyledTableCell>User Type</StyledTableCell>
                        <StyledTableCell>Gender</StyledTableCell>
                        <StyledTableCell align="center">
                          Actions
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {adminList ? (
                        adminList.length > 0 ? (
                          adminList.map((row) => (
                            <StyledTableRow
                              key={row._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell
                                component="td"
                                scope="row"
                                className="common-25"
                              >
                                {row?.first_name + " " + row?.last_name}
                              </StyledTableCell>
                              <StyledTableCell
                                component="td"
                                scope="row"
                                className="common-25"
                              >
                                <img
                                  src={row?.profile_picture || "NaN"}
                                  alt={row?.profile_picture}
                                  style={{ width: "3rem", height: "3rem" }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                component="td"
                                scope="row"
                                className="common-25"
                              >
                                {row?.user_type || "NaN"}
                              </StyledTableCell>
                              <StyledTableCell
                                component="td"
                                scope="row"
                                className="common-25"
                              >
                                {row?.gender || "NaN"}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className="common-25"
                              >
                                <CUDialog
                                  openDialog={openDialog}
                                  handleCloseDialog={handleCloseDialog}
                                  deleteId={deleteProduct}
                                  handleDelete={handleDeleteProduct}
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
                                    <Link
                                      to={`/admin/edit/${row._id}`}
                                      preventScrollReset={true}
                                    >
                                      <MDButton
                                        variant="text"
                                        color={darkMode ? "white" : "dark"}
                                      >
                                        <Icon>edit</Icon>&nbsp;edit
                                      </MDButton>
                                    </Link>
                                    <MDButton
                                      variant="text"
                                      color="error"
                                      onClick={() =>
                                        handleClickDialogOpen(row._id)
                                      }
                                    >
                                      <Icon>delete</Icon>&nbsp;delete
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
                              className="common-25"
                            ></StyledTableCell>
                            <StyledTableCell
                              component="td"
                              scope="row"
                              className="common-25"
                            ></StyledTableCell>
                            <StyledTableCell align="left" className="common-25">
                              No Product Found
                            </StyledTableCell>
                            <StyledTableCell
                              component="td"
                              scope="row"
                              className="common-25"
                            ></StyledTableCell>
                            <StyledTableCell
                              component="td"
                              scope="row"
                              className="common-25"
                            ></StyledTableCell>
                          </StyledTableRow>
                        )
                      ) : (
                        <Box sx={{ display: "flex", textAlign: "center" }}>
                          <CircularProgress />
                        </Box>
                      )}
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
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ManageAdminAccounts;
