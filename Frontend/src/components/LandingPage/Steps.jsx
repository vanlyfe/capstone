import * as React from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Stepper from "@mui/material/Stepper";

import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Book Your Vehicle",
    description: ` Tap the 'Book' icon and complete your reservation all within the Vanlyfe app.`,
  },
  {
    label: "Check in",
    description: ` Arrive at your host's location at the reservation time to check in for the night.`,
  },
  {
    label: "Check out",
    description: `When you are done, return the the keys to the host. That's it!`,
  },
];

export default function Steps() {
  return (
    <Box
      sx={{
        padding: 5,
      }}
    >
      <Box
        sx={{
          ml: "30%",
        }}
      >
        <Typography
          variant="h4"
          marked="center"
          component="h2"
          sx={{ ml: 10, mb: 5, padding: 2 }}
        >
          How it Works
        </Typography>

        <Box orientation="vertical">
          {steps.map((step, index) => (
            <Stepper orientation="vertical">
              <Step sx={{ height: 100 }}>
                <StepLabel>
                  <Typography sx={{ fontWeight: 600 }}>{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography sx={{ mt: 2 }}>{step.description}</Typography>
                </StepContent>
              </Step>
            </Stepper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
