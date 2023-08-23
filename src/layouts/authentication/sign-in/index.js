
import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useNavigate } from "react-router-dom";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Button, TextField } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../../../assets/images/logo.jpg";

import { ADMIN_LOGIN } from '../../../assets/api/adminManagementApi'

// const api_response = {
//   "success": true,
//   "message": "Login successfully.",
//   "data": {
//     "first_name": "Super Adminse",
//     "last_name": "Admin",
//     "email": "arijitsaha@matrixnmedia.com",
//     "country_code": "",
//     "contact_no": "123456789689",
//     "profile_image": "http://localhost:4000/public/image/0-1682421809407.jpeg",
//     "address": [
//       {
//         "address_line1": "College street",
//         "city_villege": "Kolkata",
//         "pincode": 700010,
//         "district": "kolkata",
//         "state": "West Bengal",
//         "country": "india"
//       }
//     ],
//     "user_type": "SuperAdmin",
//     "roles": ["63ea084208d7c140268fa78f"],
//     "is_social_signin": false,
//     "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1wiX2lkXCI6XCI2M2VhMDRjNTA4ZDdjMTQwMjY4ZmE2YWFcIixcImZpcnN0X25hbWVcIjpcIjYzZWEwNGM1MDhkN2MxNDAyNjhmYTZhNVwiLFwibGFzdF9uYW1lXCI6XCI2M2VhMDRjNTA4ZDdjMTQwMjY4ZmE2YTZcIixcImVtYWlsXCI6XCJhcmlqaXRzYWhhQG1hdHJpeG5tZWRpYS5jb21cIixcImNvdW50cnlfY29kZVwiOlwiXCIsXCJjb250YWN0X25vXCI6XCIxMjM0NTY3ODk2ODlcIixcInBhc3N3b3JkXCI6XCIkMmIkMDgkNWIwSG93dnVWUHJUbUVJdmxqUnQyT283RDZCQi5ZV3NpcksxQ01RUTlNWVJqRXZGejRlNHVcIixcInByb2ZpbGVfaW1hZ2VcIjpcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9wdWJsaWMvaW1hZ2UvMC0xNjgyNDIxODA5NDA3LmpwZWdcIixcImFkZHJlc3NcIjpbe1wiYWRkcmVzc19saW5lMVwiOlwiQ29sbGVnZSBzdHJlZXRcIixcImNpdHlfdmlsbGVnZVwiOlwiS29sa2F0YVwiLFwicGluY29kZVwiOjcwMDAxMCxcImRpc3RyaWN0XCI6XCJrb2xrYXRhXCIsXCJzdGF0ZVwiOlwiV2VzdCBCZW5nYWxcIixcImNvdW50cnlcIjpcImluZGlhXCJ9XSxcInVzZXJfdHlwZVwiOlwiU3VwZXJBZG1pblwiLFwicm9sZXNcIjpbXCI2M2VhMDg0MjA4ZDdjMTQwMjY4ZmE3OGZcIl0sXCJzb2NpYWxfcGxhdGZvcm1cIjpcIlwiLFwic29jaWFsX2xvZ2luX2lkXCI6XCJcIixcInNvY2lhbF9sb2dpbl90b2tlblwiOlwiXCIsXCJlbWFpbF92ZXJpZmljYXRpb25fY29kZVwiOlwiXCIsXCJyZXNldF9wYXNzd29yZF92ZXJpZmljYXRpb25fY29kZVwiOlwiXCIsXCJpc19lbWFpbF92ZXJpZmllZFwiOnRydWUsXCJpc19zb2NpYWxfc2lnbmluXCI6ZmFsc2UsXCJpc19sb2dnZWRJblwiOmZhbHNlLFwiaXNfYWN0aXZlXCI6dHJ1ZSxcImlzX2RlbGV0ZWRcIjpmYWxzZSxcImNyZWF0ZWRBdFwiOlwiMjAyMy0wMi0xM1QwOTozNzowOS42NTZaXCIsXCJ1cGRhdGVkQXRcIjpcIjIwMjMtMDUtMjVUMTI6NTE6NDguMDczWlwiLFwiX192XCI6MH0iLCJpYXQiOjE2ODUwMTk0MzUsImV4cCI6MTY4NzYxMTQzNX0.7O2v8yD335BPYNeJj8Awfa_ZHfRJxSx_4IeXwjtcUQUY6UcTFDKEaINFnZMPcZtpcsiNRZf92WLf4yemcuNrxw",
//     "expiresIn": "86400000",
//     "menu_items": [
//       {
//         "menuName": "Dashboard",
//         "routerLink": "/dashboard",
//         "routerLinkActiveClass": "super-admin",
//         "child": null,
//         "visible": true,
//         "scope": "all"
//       },
//       {
//         "menuName": "Sub-Admin",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Sub-Admin Lists",
//             "routerLink": "/dashboard/user/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-users'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Sub-Admin",
//             "routerLink": "/dashboard/user/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-user-plus'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Role & Permission",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Role Lists",
//             "routerLink": "/dashboard/role/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-user-tag'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Role",
//             "routerLink": "/dashboard/role/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-plus-circle'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Hotel Owner",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Hotel Owner Lists",
//             "routerLink": "/dashboard/hotel-owners/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-users'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Hotel Owner",
//             "routerLink": "/dashboard/hotel-owners/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-user-plus'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Hotel",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Hotel Lists",
//             "routerLink": "/dashboard/hotel/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-building'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Hotel",
//             "routerLink": "/dashboard/hotel/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-building'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Room Types",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Room Type Lists",
//             "routerLink": "/dashboard/room-type/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-hotel'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Room Type",
//             "routerLink": "/dashboard/room-type/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-bed'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Hotel Recommendation",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Hotel Recommendation Lists",
//             "routerLink": "/dashboard/hotel-recommendation",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Customers",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Customer Lists",
//             "routerLink": "/dashboard/customers/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-users'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Booking",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "child": [
//           {
//             "menuName": "Booking Lists",
//             "routerLink": "/dashboard/booking/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-tv'></i>",
//             "scope": "view"
//           }
//         ],
//         "visible": true
//       },
//       {
//         "menuName": "Bidding",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "child": [
//           {
//             "menuName": "Bidding Lists",
//             "routerLink": "/dashboard/bidding/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-tv'></i>",
//             "scope": "view"
//           }
//         ],
//         "visible": true
//       },
//       {
//         "menuName": "WFRLee Points",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Add WFRLee Point",
//             "routerLink": "/dashboard/loyalty-point/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "add"
//           },
//           {
//             "menuName": "WFRLee Point Lists",
//             "routerLink": "/dashboard/loyalty-point/",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "HomePage",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Homepage",
//             "routerLink": "/dashboard/homepage",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Partners",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Partner Lists",
//             "routerLink": "/dashboard/partner",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Career",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Career Lists",
//             "routerLink": "/dashboard/career",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Coupons",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Coupon Lists",
//             "routerLink": "/dashboard/coupon",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Coupon",
//             "routerLink": "/dashboard/coupon/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-file-alt'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Promo Codes",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Promo Code Lists",
//             "routerLink": "/dashboard/promo-offer",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Promo Code",
//             "routerLink": "/dashboard/promo-offer/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-file-alt'></i>",
//             "scope": "add",
//             "skip": true
//           }
//         ]
//       },
//       {
//         "menuName": "CMS Pages",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "CMS Lists",
//             "routerLink": "/dashboard/cms/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Faq List",
//             "routerLink": "/dashboard/faq",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Partner Logo",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Partner Logo Lists",
//             "routerLink": "/dashboard/partner-logo/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Partner Logo",
//             "routerLink": "/dashboard/partner-logo/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fa fa-info-circle' aria-hidden='true'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Amenity",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Amenity Lists",
//             "routerLink": "/dashboard/amenity/list",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Amenity",
//             "routerLink": "/dashboard/amenity/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fa fa-info-circle' aria-hidden='true'></i>",
//             "scope": "add"
//           }
//         ]
//       },
//       {
//         "menuName": "Policy",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Policy Lists",
//             "routerLink": "/dashboard/policy",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "view"
//           },
//           {
//             "menuName": "Add Policy",
//             "routerLink": "/dashboard/policy/add",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-list'></i>",
//             "scope": "add",
//             "skip": true
//           }
//         ]
//       },
//       {
//         "menuName": "Rates & Availability",
//         "routerLink": null,
//         "routerLinkActiveClass": "super-admin",
//         "visible": true,
//         "child": [
//           {
//             "menuName": "Calender",
//             "routerLink": "/dashboard/rates-and-availability",
//             "routerLinkActiveClass": "active",
//             "icon": "<i class='fas fa-calender'></i>",
//             "scope": "view"
//           }
//         ]
//       },
//       {
//         "menuName": "Rating & Review",
//         "routerLink": "/dashboard/rating-and-review",
//         "routerLinkActiveClass": "super-admin",
//         "child": null,
//         "visible": true,
//         "scope": "all"
//       },
//       {
//         "menuName": "Transaction",
//         "routerLink": "/dashboard/transactions",
//         "scope": "view",
//         "routerLinkActiveClass": "super-admin",
//         "child": null,
//         "visible": true
//       },
//       {
//         "menuName": "WFRLee Account",
//         "routerLink": "/dashboard/account",
//         "scope": "view",
//         "routerLinkActiveClass": "super-admin",
//         "child": null,
//         "visible": true
//       },
//       {
//         "menuName": "Contact Us",
//         "routerLink": "/dashboard/contact/list",
//         "routerLinkActiveClass": "super-admin",
//         "child": null,
//         "visible": true,
//         "scope": "view"
//       },
//       {
//         "menuName": "Settings",
//         "routerLink": "/dashboard/settings",
//         "routerLinkActiveClass": "super-admin",
//         "child": null,
//         "visible": true,
//         "scope": "view"
//       }
//     ],
//     "permissions": [],
//     "id": "63ea04c508d7c140268fa6aa"
//   }
// }

// async function loginUser(credentials) {
//   const API_URL = process.env.REACT_APP_API_BASE_URL
//   // return await fetch("http://localhost:4000/api/v1/user/login", {
//   return await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       admin: true,
//       "Accept-Language": "EN",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

function setToken(userToken) {
  localStorage.setItem("token", JSON.stringify(userToken) || "");
}

// for getting a data from the token
// function getToken() {
//   const tokenString = localStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

const Basic = () => {
  toast.configure({
    autoClose: 17000,
    draggable: true,
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // for navigation  :
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    // const token = await loginUser({
    //   email,
    //   password,
    // });

    if (email && password) {
      const apiResponse = await ADMIN_LOGIN({ email, password});
      // if (token?.success === true) {
      if(apiResponse?.status === 200){
        console.log("Api Response ->> ", apiResponse?.data?.token);
        toast.success(apiResponse?.message);
        setToken(apiResponse?.data);
        navigate("/dashboard");
        window.location.reload(false);
      } else {
        toast.error(apiResponse?.message);
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDBox
            component="img"
            src={Logo}
            alt="Brand"
            width="8rem"
            height="auto"
          />
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              <MDBox mb={2}>
                <TextField
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  color="secondary"
                  type="email"
                  sx={{ mb: 3 }}
                  fullWidth
                  value={email}
                  error={emailError}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  color="secondary"
                  type="password"
                  value={password}
                  error={passwordError}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <Button
                  className="btn-submit"
                  variant="contained"
                  color="info"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/forget-password"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Forgot Password
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </form>
      </Card>
    </BasicLayout>
  );
};

export default Basic;
