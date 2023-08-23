

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography
              display="inline"
              variant="body2"
              verticalAlign="middle"
            >
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>
                arrow_upward
              </Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="2400(SAR) Frame 1 Design, "
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="2400(SAR) Frame 2 Design, "
          // title="New order Id #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="2400(SAR) Frame 3 Design, "
          // title="Server payments for Card"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="2400(SAR) Frame 4 Design, "
          // title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem  
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
