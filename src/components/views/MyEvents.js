import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Grid, Typography } from "@mui/material";

const MyEvents = () => {
  return (
    <BaseContainer className="lobby">
      <Grid item xs={12}>
        <Typography variant={"h3"}>My Events</Typography>
        <Typography
          variant={"h5"}
          style={{ color: "#333", textAlign: "center", marginTop: "200px" }}
        >
          Coming soon! This feature will be available soon. Thank you for your
          patience!
        </Typography>
      </Grid>
    </BaseContainer>
  );
};

export default MyEvents;
