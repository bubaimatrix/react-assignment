// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

const handleSubmit = async (event) => {
  event.preventDefault();
};

const ChangePassword = () => {


  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography
            variant="h3"
            fontWeight="medium"
            color="white"
            mt={1}
          >
            Change Password
          </MDTypography>
        </MDBox>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput
                  type="Password"
                  label="Old Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="Password"
                  label="New Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="Password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth>
                  Save Changes Password
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </form>
      </Card>
    </CoverLayout>
  );
};

export default ChangePassword;
