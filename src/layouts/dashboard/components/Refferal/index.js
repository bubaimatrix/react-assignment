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
import { Card, Icon } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

const rows = [
  createData("1", "Eid Special", "HOLA222", "2023-06-14", "2023-06-24","Edit","Delete"),
  createData("2", "New Year", "ONBOARD11", "2023-06-15", "2023-06-22","Edit","Delete"),
  createData("3", "Christmas", "WELCOME20", "2023-07-21", "2023-07-28","Edit","Delete"),
];

function createData(name, calories, fat, carbs, protein, end,dele) {
  return { name, calories, fat, carbs, protein, end,dele };
}

function toInch(cm) {
  return (cm / 2.54).toFixed(2);
}

function toInchRange(from, to) {
  return `${toInch(from)} - ${toInch(to)}`;
}

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

function Refferal() {
  const { sales, tasks } = reportsLineChartData;

  const navigate = useNavigate();
  const add = () => {
    console.log("clicked");
    navigate("/create-cupon");
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
                    <StyledTableCell>Coupon Id </StyledTableCell>
                    <StyledTableCell align="center">Coupon Name</StyledTableCell>

                    <StyledTableCell align="center">Coupon Code</StyledTableCell>
                    <StyledTableCell align="center">
                      Coupon Start Date
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Coupon End Date
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Actions
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.fat}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.protein}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.end} &nbsp; {row.dele}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
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

export default Refferal;
