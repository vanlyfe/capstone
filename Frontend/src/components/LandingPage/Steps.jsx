import * as React from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';

import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Book Your Vehicle',
    description: `Tap the 'Book' icon and complete your reservation all within the VanLyfe app.`,
  },
  {
    label: 'Check in',
    description: `Arrive at your host's location at the reservation time to check in for the night.`,
  },
  {
    label: 'Check out',
    description: `When you are done, return the the keys to the host. That's it!`,
  },
];

export default function Steps() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="h4"
        marked="center"
        component="h2"
        sx={{ mt: 10, mb: 5 }}>
        How it Works
      </Typography>

      <Stepper orientation="vertical" sx={{ mb: 10, ml: 1 }}>
        {steps.map((step, index) => (
          <Step active={true} key={index}>
            <StepLabel>
              <Typography sx={{ fontWeight: 600 }}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
