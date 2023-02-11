import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Result() {
  const { accuracy, pressedkey, wpm } = useSelector(
    (store) => store.AppReducer
  );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          gap: "40px",
          marginTop: "50px",
        }}
      >
        <Typography variant="h4">
          <Box sx={{ fontSize: "30px" }}>WPM :- {wpm}</Box>
        </Typography>
        <Typography variant="h4">
          <Box sx={{ fontSize: "30px" }}>Accuracy :- {`${accuracy}%`}</Box>
        </Typography>
      </Box>
      <Typography sx={{ marginTop: "20px" }}>
        <Typography sx={{ fontSize: "20px" }}>
          Number of keys pressed in a 5 min :- {pressedkey}
        </Typography>
      </Typography>
    </Box>
  );
}

export default Result;
