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
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import DatePicker from "@mui/lab/DatePicker";
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { DesktopDatePicker } from "@mui/lab";
import { DatePicker } from '@mui/x-date-pickers';
import moment from "moment";
import { toast } from "react-toastify";
import validationMessage from "utils/validationMessage";
import { VIEW_COUPON_API, UPDATE_COUPON_API } from "assets/api/couponManagementApi";
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function CreateCopoun() {
  // const [age, setAge] = React.useState("");
  // const [value, setValue] = useState(null);
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  toast.configure({
    autoClose: 17000,
    draggable: true,
  });

  const [openSelect, setOpenSelect] = useState(false);
  // const [ select, setSelect ] = useState("flat");
  const handleSelectClose = () => {
    setOpenSelect(false);
  };

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };

  const params = useParams();
  const navigate = useNavigate();

  const defaultFormState = {
    'name_en': "",
    'name_en_error': false,
    'name_en_error_message': "",
    'name_ar': "",
    'name_ar_error': false,
    'name_ar_error_message': "",
    'coupon_code': "",
    'coupon_code_error': false,
    'coupon_code_error_message': "",
    'discount_type': "flat",
    'discount_type_error': false,
    'discount_type_error_message': "",
    'discount_amount': "",
    'discount_amount_error': false,
    'discount_amount_error_message': "",
    'coupon_start_date': moment().toString(),
    'coupon_start_date_error': false,
    'coupon_start_date_error_message': "",
    'coupon_end_date': moment().add(1, 'days'),
    'coupon_end_date_error': false,
    'coupon_end_date_error_message': "",
    'coupon_description': "",
    'coupon_description_error': false,
    'coupon_description_error_message': "",
    'coupon_image': "",
    'coupon_image_to_show': "",
    'coupon_image_name': "",
    'coupon_image_error': false,
    'coupon_image_error_message': ""
  };

  // Get a specific coupon details
  useEffect(()=> {
    // console.log("ID-->> ", searchParams.get("id"));
    async function getCouponData() {
      if(params.id) {
        console.log("params data-->> ", params);
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        const token = userToken?.token;
        if (token) {
          console.log("IF PART ->>");
          const apiResponse = await VIEW_COUPON_API(token, params.id);
          console.log("apiResponse-->> ", apiResponse);
          if(apiResponse?.status === 200) {
            setFormData((values) => {
              if(apiResponse && apiResponse.data && apiResponse.data.coupon_name.en) {
                values = { ...values, name_en: apiResponse.data.coupon_name.en, name_en_error: false, name_en_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.coupon_name.ar) {
                values = { ...values, name_ar: apiResponse.data.coupon_name.ar, name_ar_error: false, name_ar_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.coupon_code) {
                values = { ...values, coupon_code: apiResponse.data.coupon_code, coupon_code_error: false, coupon_code_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.discount_type) {
                values = { ...values, discount_type: apiResponse.data.discount_type, discount_type_error: false, discount_type_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.discount_amount) {
                values = { ...values, discount_amount: apiResponse.data.discount_amount, discount_amount_error: false, discount_amount_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.coupon_valid_from) {
                values = { ...values, coupon_start_date: apiResponse.data.coupon_valid_from, coupon_start_date_error: false, coupon_start_date_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.coupon_valid_till) {
                values = { ...values, coupon_end_date: apiResponse.data.coupon_valid_till, coupon_end_date_error: false, coupon_end_date_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.coupon_description) {
                values = { ...values, coupon_description: apiResponse.data.coupon_description, coupon_description_error: false, coupon_description_error_message: "" };
              }
              if(apiResponse && apiResponse.data && apiResponse.data.image) {
                values = { ...values, coupon_image_to_show: apiResponse.data.image, coupon_image_error: false, coupon_image_error_message: "" }
              }

              return values;
            })
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
    getCouponData()
  }, [params.id]);

  const [formData, setFormData] = useState(defaultFormState);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // setImgData(reader.result);
      setFormData((values) => {
        console.log("Values-->> ", values);
        return { ...values, coupon_image: file, coupon_image_to_show: reader.result, coupon_image_name: file.name, coupon_image_error: false, coupon_image_error_message: "" }
      })
    });
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleFormDataChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log("FormData-->> ", formData);

    setFormData((values) => {
      if(name === 'name_en') {
        values = { ...values, name_en_error: false, name_en_error_message: "" };
      }
      else if(name === 'name_ar') {
        values = { ...values, name_ar_error: false, name_ar_error_message: "" };
      }
      else if(name === 'coupon_code') {
        values = { ...values, coupon_code_error: false, coupon_code_error_message: "" };
      }
      else if(name === 'discount_type') {
        values = { ...values, discount_type_error: false, discount_type_error_message: "" };
      }
      else if(name === 'discount_amount') {
        values = { ...values, discount_amount_error: false, discount_amount_error_message: "" };
      }
      else if(name === 'coupon_description') {
        values = { ...values, coupon_description_error: false, coupon_description_error_message: "" };
      }
      // else if(name === 'coupon_start_date') {
      //   values = { ...values, coupon_start_date_error: false, coupon_start_date_error_message: "" };
      // }
      // else if(name === 'coupon_end_date') {
      //   values = { ...values, coupon_end_date_error: false, coupon_end_date_error_message: "" };
      // }
      // else if(name === 'coupon_image') {
      //   values = { ...values, coupon_image_error: false, coupon_image_error_message: "" };
      // }
      return { ...values, [name]: value };
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form Validation
    if(formData.name_en === "") {
      setFormData((values) => ({ ...values, name_en_error: true, name_en_error_message: validationMessage.COUPON_NAME_EN_REQUIRED }))
    }
    if(formData.name_ar === "") {
      setFormData((values) => ({ ...values, name_ar_error: true, name_ar_error_message: validationMessage.COUPON_NAME_AR_REQUIRED }))
    }
    if(formData.coupon_code === "") {
      setFormData((values) => ({ ...values, coupon_code_error: true, coupon_code_error_message: validationMessage.COUPON_CODE_REQUIRED }))
    }
    if(formData.discount_type === "") {
      setFormData((values) => ({ ...values, discount_type_error: true, discount_type_error_message: validationMessage.COUPON_DISCOUNT_TYPE_REQUIRED }))
    }
    if(formData.discount_amount === "") {
      setFormData((values) => ({ ...values, discount_amount_error: true, discount_amount_error_message: validationMessage.COUPON_DISCOUNT_AMOUNT_REQUIRED }))
    } 
    if(formData.coupon_start_date === "") {
      setFormData((values) => ({ ...values, coupon_start_date_error: true, coupon_start_date_error_message: validationMessage.COUPON_START_DATE_REQUIRED }))
    } 
    if(formData.coupon_end_date === "") {
      setFormData((values) => ({ ...values, coupon_end_date_error: true, coupon_end_date_error_message: validationMessage.COUPON_END_DATE_REQUIRED }))
    }
    // if(formData.coupon_image === "") {
    //   setFormData((values) => ({ ...values, coupon_image_error: true, coupon_image_error_message: validationMessage.COUPON_IMAGE_REQUIRED }))
    // }
    // if(formData.coupon_description === "") {
    //   setFormData((values) => ({ ...values, coupon_description_error: true, coupon_description_error_message: validationMessage.COUPON_DESCRIPTION_REQUIRED }))
    // }
    if (formData.name_en && formData.name_ar && formData.coupon_code && formData.discount_type && formData.discount_amount && formData.coupon_start_date && formData.coupon_end_date) {
      // console.log("Enter Here --->> ***");
      // Save Data
      const formDataObj = new FormData();
      formDataObj.append('coupon_name_en', formData.name_en);
      formDataObj.append('coupon_name_ar', formData.name_ar);
      if(formData.coupon_description) formDataObj.append('coupon_description', formData.coupon_description);
      formDataObj.append('coupon_code', formData.coupon_code);
      if(formData.coupon_image) formDataObj.append('image', formData.coupon_image);
      formDataObj.append('discount_type', formData.discount_type);
      formDataObj.append('discount_amount', formData.discount_amount);
      formDataObj.append('coupon_valid_from', moment(formData.coupon_start_date).format('YYYY-MM-DD'));
      formDataObj.append('coupon_valid_till', moment(formData.coupon_end_date).format('YYYY-MM-DD'));
      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      const token = userToken?.token;
      if (token) {
        console.log("IF PART ->>");
        const apiResponse = await UPDATE_COUPON_API(token, params.id, formDataObj);
        console.log("apiResponse-->> ", apiResponse);
        if(apiResponse?.status === 200) {
          toast.success(apiResponse.message);
          navigate("/coupon");
          // window.location.reload(false);
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
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ paddingBottom: 5 }}>
            Update Coupon
          </Typography>
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Name In English
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  error={formData.name_en_error ? true : false}
                  helperText={formData.name_en_error_message ? formData.name_en_error_message : ""}
                  id={formData.name_en_error ? "outlined-error-helper-text" : "name_en"}
                  name="name_en"
                  label="Coupon Name In English"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData.name_en}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Name In Arabic
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  error={formData.name_ar_error ? true : false}
                  helperText={formData.name_ar_error_message ? formData.name_ar_error_message : ""}
                  id={formData.name_ar_error ? "outlined-error-helper-text" : "name_ar"}
                  name="name_ar"
                  label="Coupon Name In Arabic"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData.name_ar}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Code
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  error={formData.coupon_code_error ? true : false}
                  helperText={formData.coupon_code_error_message ? formData.coupon_code_error_message : ""}
                  id={formData.coupon_code_error ? "outlined-error-helper-text" : "coupon_code"}
                  name="coupon_code"
                  label="Coupon Code"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData.coupon_code}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Discount Type
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="demo-controlled-open-select-label" style={{marginLeft: "-9px"}}>Discount</InputLabel>

                <Select
                  error={formData.discount_type_error ? true : false}
                  helperText={formData.discount_type_error_message ? formData.discount_type_error_message : ""}
                  id={formData.discount_type_error ? "outlined-error-helper-text" : "demo-controlled-open-select"}
                  labelId="demo-controlled-open-select-label"
                  name="discount_type"
                  open={openSelect}
                  onClose={handleSelectClose}
                  onOpen={handleSelectOpen}
                  label="Discount"
                  style={{minHeight: "35px", marginLeft: "-9px"}}
                  onChange={handleFormDataChange}
                  value={formData.discount_type}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value="flat">Flat</MenuItem>
                  <MenuItem value="percentage">Percentage</MenuItem>
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Discount Amount
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  error={formData.discount_amount_error ? true : false}
                  helperText={formData.discount_amount_error_message ? formData.discount_amount_error_message : ""}
                  id={formData.discount_amount_error ? "outlined-error-helper-text" : "discount_amount"}
                  name="discount_amount"
                  label="Discount Amount"
                  fullWidth
                  size="small"
                  type="number"
                  autoComplete="off"
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData.discount_amount}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Start Date
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    error={formData.coupon_start_date_error ? true : false}
                    helperText={formData.coupon_start_date_error_message ? formData.coupon_start_date_error_message : ""}
                    id={formData.coupon_start_date_error ? "outlined-error-helper-text" : "coupon_start_date"}
                    label="Coupon Start Date" 
                    onChange={(selectStartDate) => {
                      setFormData({ ...formData, 'coupon_start_date': selectStartDate, 'coupon_start_date_error': false, 'coupon_start_date_error_message': "" })
                    }}
                    value={moment(formData.coupon_start_date)}
                    format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon End Date
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    error={formData.coupon_end_date_error ? true : false}
                    helperText={formData.coupon_end_date_error_message ? formData.coupon_end_date_error_message : ""}
                    id={formData.coupon_end_date_error ? "outlined-error-helper-text" : "coupon_end_date"}
                    label="Coupon End Date" 
                    onChange={(selectStartDate) => {
                      setFormData({ ...formData, 'coupon_end_date': selectStartDate, 'coupon_end_date_error': false, 'coupon_end_date_error_message': "" })
                    }}
                    value={moment(formData.coupon_end_date)}
                    format="YYYY-MM-DD"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Image
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 300,
                    marginTop: "10px",
                    marginBottom: "10px",
                    width: '4rem', 
                    height: '4rem'
                  }}
                >
                { formData?.coupon_image_to_show && <img src={formData?.coupon_image_to_show} style={{width: '4rem', height: '4rem'}} /> }
                </InputLabel>
                <Button variant="contained" component="label">
                  <UploadFileIcon />
                  <input hidden accept="image/*" multiple type="file" name="coupon_image" id="coupon_image" onChange={handleFileChange} />
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
                {formData.coupon_image_name}
                </InputLabel> */}
                { formData.coupon_image_error &&
                  <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 300,
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: 'red'
                  }}
                  >
                    {formData.coupon_image_error_message}
                  </InputLabel>
                }
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Coupon Description
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  error={formData.coupon_description_error ? true : false}
                  helperText={formData.coupon_description_error_message ? formData.coupon_description_error_message : ""}
                  id={formData.coupon_description_error ? "outlined-error-helper-text" : "coupon_description"}
                  name="coupon_description"
                  label="Coupon Description"
                  fullWidth
                  size="small"
                  type="number"
                  autoComplete="off"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={handleFormDataChange}
                  value={formData.coupon_description}
                />
              </Grid>

              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  sx={{ color: "yellow", width: "272px", margin: "5px" }}
                  onClick={() => navigate(-1)}
                >
                  Go Back to the Coupon Page
                </Button>
                <Button type="submit" variant="contained" sx={{ color: "yellow" }}>
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
