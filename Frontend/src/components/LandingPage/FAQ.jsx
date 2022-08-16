import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Container } from '@mui/system';
import Typography from './Typography';

const faq = [
  {
    question: 'How do I contact VanLyfe Customer Support?',
    answer:
      'Sending an email is usually the quickest and easiest way to reach us.',
  },
  {
    question: 'Does VanLyfe Do Background Checks?',
    answer:
      "The simple answer is No. All users of VanLyfe identify themselves by uploading a verified ID. VanLyfe doesn't collect any background information on its users. Users of VanLyfe should pick hosts or guests with positive reviews.",
  },
  {
    question: 'Who Can See My VanLyfe Profile?',
    answer: "Everyone can see your VanLyfe profile. It's public.",
  },
  {
    question: 'Should VanLyfe Guests Clean On Check Out',
    answer:
      'Yes, you should tidy the vehicle and throw trashes before leaving. You are not expected to clean the vehicle but to leave it in a reasonable condition.',
  },
];

export default function FAQ() {
  const [open, setOpen] = React.useState(null);

  return (
    <Container
      sx={{
        bgcolor: 'secondary.light',
        py: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="h4" marked="center" component="h2" sx={{ mb: 5 }}>
        Frequently Asked Questions
      </Typography>

      <List sx={{ width: '100%' }}>
        {faq.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              onClick={() => {
                setOpen(open === index ? null : index);
              }}>
              <ListItemText
                primary={item.question}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
              {open === index ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={item.answer} />
                </ListItemButton>
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}
