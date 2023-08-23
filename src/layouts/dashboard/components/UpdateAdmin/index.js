import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import validationMessage from "utils/validationMessage";
import { toast } from "react-toastify";
import {
  VIEW_PRODUCT_API,
  UPDATE_PRODUCT_API,
} from "assets/api/productManagementApi";
import { VIEW_ADMIN_API } from "assets/api/adminManagementApi";
import { API_ADMIN_UPDATE } from "assets/api/commonApiEndPoint";
import { UPDATE_ADMIN_API } from "assets/api/adminManagementApi";

export default function UpdateAdmin() {
  toast.configure({
    autoClose: 17000,
    draggable: true,
  });

  const navigate = useNavigate();
  const params = useParams();
  // console.log("params--->> ", params);

  const defaultFormState = {
    name_en: "",
    name_en_error: false,
    name_en_error_message: "",
    name_ar: "",
    name_ar_error: false,
    name_ar_error_message: "",
    email: "",
    email_error: false,
    email_error_message: "",
    picture: "",
    picture_to_show: "",
    picture_name: "",
    picture_error: false,
    picture_error_message: "",
    gender: "",
    gender_error: false,
    gender_error_message: "",
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFormData((values) => {
        return {
          ...values,
          picture: file,
          picture_to_show: reader.result,
          picture_name: file.name,
          picture_error: false,
          picture_error_message: "",
        };
      });
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  // Get a specific product details
  useEffect(() => {
    async function getProductData() {
      if (params?.id) {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        const token = userToken?.token;
        if (token) {
          const apiResponse = await VIEW_ADMIN_API(token, params?.id);
          if (apiResponse?.status === 200) {
            setFormData((values) => {
              if (
                apiResponse &&
                apiResponse.data &&
                apiResponse?.data?.first_name
              ) {
                values = {
                  ...values,
                  name_en: apiResponse?.data?.first_name,
                  name_en_error: false,
                  name_en_error_message: "",
                };
              }
              if (
                apiResponse &&
                apiResponse.data &&
                apiResponse?.data?.last_name
              ) {
                values = {
                  ...values,
                  name_ar: apiResponse?.data?.last_name,
                  name_ar_error: false,
                  name_ar_error_message: "",
                };
              }
              if (apiResponse && apiResponse.data && apiResponse?.data?.email) {
                values = {
                  ...values,
                  email: apiResponse?.data?.email,
                  email_error: false,
                  email_error_message: "",
                };
              }
              if (
                apiResponse &&
                apiResponse?.data &&
                apiResponse?.data?.gender
              ) {
                values = {
                  ...values,
                  gender: apiResponse?.data?.gender,
                  gender_error: false,
                  gender_error_message: "",
                };
              }
              if (
                apiResponse &&
                apiResponse.data &&
                apiResponse?.data?.profile_picture
              ) {
                values = {
                  ...values,
                  picture_to_show: apiResponse?.data?.profile_picture,
                  picture_error: false,
                  picture_error_message: "",
                };
              }

              return values;
            });
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
    }
    getProductData();
  }, [params.id]);

  const handleFormDataChange = (e) => {
    // console.log(e.target.files[0]);
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => {
      if (name === "name_en") {
        values = { ...values, name_en_error: false, name_en_error_message: "" };
      } else if (name === "name_ar") {
        values = { ...values, name_ar_error: false, name_ar_error_message: "" };
      } else if (name === "email") {
        values = { ...values, email_error: false, email_error_message: "" };
      } else if (name === "gender") {
        values = { ...values, gender_error: false, gender_error_message: "" };
      } else if (name === "picture_to_show") {
        values = { ...values, picture_error: false, picture_error_message: "" };
      }
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form Validation
    if (formData.name_en == "") {
      setFormData((values) => ({
        ...values,
        name_en_error: true,
        name_en_error_message: validationMessage.ADMIN_FIRST_NAME_EN_REQUIRED,
      }));
    }
    if (formData.name_ar == "") {
      setFormData((values) => ({
        ...values,
        name_ar_error: true,
        name_ar_error_message: validationMessage.ADMIN_FIRST_NAME_EN_REQUIRED,
      }));
    }
    if (formData.email == "") {
      setFormData((values) => ({
        ...values,
        email_error: true,
        email_error_message: validationMessage.ADMIN_EMAIL_REQUIRED,
      }));
    }
    if (formData.gender == "") {
      setFormData((values) => ({
        ...values,
        gender_error: true,
        gender_error_message: validationMessage.ADMIN_GENDER_REQUIRED,
      }));
    } else {
      // console.log("Enter Here --->> ");
      // Save Data
      const formDataObj = new FormData();
      if (formData.picture)
        formDataObj.append("profile_picture", formData?.picture);
      formDataObj.append("first_name", formData?.name_en);
      formDataObj.append("last_name", formData?.name_ar);
      formDataObj.append("email", formData?.email);
      formDataObj.append("gender", formData?.gender);
      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      const token = userToken?.token;
      if (token) {
        const apiResponse = await UPDATE_ADMIN_API(
          token,
          params.id,
          formDataObj
        );
        if (apiResponse?.status === 200) {
          toast.success(apiResponse.message);
          navigate("/Manage-admin-accounts");
          // window.location.reload(false);
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
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Update Admin
          </Typography>
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3.5}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  First Name
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8.5}>
                <TextField
                  error={formData?.name_en_error ? true : false}
                  helperText={
                    formData?.name_en_error_message
                      ? formData.name_en_error_message
                      : ""
                  }
                  id={
                    formData?.name_en_error
                      ? "outlined-error-helper-text"
                      : "name_en"
                  }
                  name="name_en"
                  label="First Name"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData?.name_en}
                />
              </Grid>

              <Grid item xs={12} sm={3.5}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Last Name
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8.5}>
                <TextField
                  error={formData?.name_ar_error ? true : false}
                  helperText={
                    formData?.name_ar_error_message
                      ? formData.name_ar_error_message
                      : ""
                  }
                  id={
                    formData?.name_ar_error
                      ? "outlined-error-helper-text"
                      : "name_ar"
                  }
                  name="name_ar"
                  label="Last Name"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData?.name_ar}
                />
              </Grid>

              <Grid item xs={12} sm={3.5}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Gender
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8.5}>
                <TextField
                  error={formData?.gender_error_message ? true : false}
                  helperText={
                    formData?.gender_error_message
                      ? formData.gender_error_message
                      : ""
                  }
                  id={
                    formData?.gender_error_message
                      ? "outlined-error-helper-text"
                      : "gender"
                  }
                  name="gender"
                  label="Gender"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  InputLabelProps={{ shrink: true }}
                  value={formData?.gender}
                />
              </Grid>

              <Grid item xs={12} sm={3.5}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Email
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8.5}>
                <TextField
                  error={formData?.email_error ? true : false}
                  helperText={
                    formData?.email_error_message
                      ? formData?.email_error_message
                      : ""
                  }
                  id={
                    formData?.email_error
                      ? "outlined-error-helper-text"
                      : "email"
                  }
                  name="email"
                  label="Email"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  InputLabelProps={{ shrink: true }}
                  value={formData?.email}
                />
              </Grid>

              <Grid item xs={12} sm={3.5}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Profile Picture
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8.5}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 300,
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: "4rem",
                    height: "4rem",
                  }}
                >
                  {formData?.picture_to_show && (
                    <img
                      src={formData?.picture_to_show}
                      style={{ width: "4rem", height: "4rem" }}
                    />
                  )}
                </InputLabel>
                <Button variant="contained" component="label">
                  <UploadFileIcon />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    name="picture"
                    id="picture"
                    onChange={handleFileChange}
                  />
                </Button>
                {/* <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 300,
                    marginTop: "10px",
                    marginBottom: "10px"
                  }}
                >
                {formData?.picture_name}
                </InputLabel> */}
                {formData?.picture_error && (
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      fontWeight: 300,
                      marginTop: "10px",
                      marginBottom: "10px",
                      color: "red",
                    }}
                  >
                    {formData?.picture_error_message}
                  </InputLabel>
                )}
              </Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  sx={{ color: "yellow", width: "272px", margin: "5px" }}
                  onClick={() => navigate(-1)}
                >
                  Go Back to the Admin Page
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: "yellow" }}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </form>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
