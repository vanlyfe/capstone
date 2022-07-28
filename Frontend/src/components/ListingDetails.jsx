import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@mui/material/colors";
import { Star } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import { green } from "@material-ui/core/colors";

const styles = (theme) => ({
  // appBar: {
  //   position: 'relative',
  // },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#d8e6fe",
    maxHeight: "20%",
    width: "50%",
  },

  container: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#e57373",
    display: "flex",
    flexDirection: "column",

    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  heroContent: {
    maxWidth: "50%",
    maxHeight: "20%",
    marginLeft: theme.spacing.unit * 3,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 3,
    width: "50%",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9

    width: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  //added this class

  cardActions: {
    // backgroundColor: "#1b5e20",
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
    height: "40%",
  },
});

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Album(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        {/* <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div> */}
        <div>
          {/* <div className={classNames(classes.layout, classes.cardGrid)}> */}
          {/* End hero unit */}
          {/*added the container class*/}
          <div className={classes.container} sx={{ maxHeight: "10%" }}>
            {/* <Box container spacing={40} className={classes.container}> */}
            {/* {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}> */}
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                title="Image title"
              />
              {/* <CardContent className={classes.cardContent} align="center">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </CardContent> */}
              <div className={classes.cardActions} align="center">
                <Button>
                  <ArrowBackIosIcon />
                </Button>
                <Button>
                  <ArrowForwardIosIcon />
                </Button>
              </div>
              <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                  <Typography
                    component="h6"
                    variant="h6"
                    align="left"
                    color="textPrimary"
                    gutterBottom
                  >
                    San Fransisco, CA
                  </Typography>
                  <Typography variant="h3" align="left" color="textPrimary">
                    $ 100 USD/Night
                  </Typography>
                  <Typography variant="h6" align="left" color="textPrimary">
                    Equiped Jeep Overland Camper
                  </Typography>

                  <CardContent className={classes.cardContent} align="left">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <>(5)</>
                  </CardContent>
                  <Typography
                    variant="h6"
                    align="left"
                    color="textSecondary"
                    paragraph
                  >
                    Sleeps 4
                  </Typography>
                </div>
                <div className={classes.heroButtons}>
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        BOOK
                      </Button>
                    </Grid>
                    {/* <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid> */}
                  </Grid>
                </div>
              </div>
            </Card>
            {/* </Grid> */}
            {/* ))} */}

            {/* <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography
                  component="h6"
                  variant="h6"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  San Fransisco, CA
                </Typography>
                <Typography variant="h3" align="left" color="textPrimary">
                  $ 100 USD/Night
                </Typography>
                <Typography variant="h6" align="left" color="textPrimary">
                  Equiped Jeep Overland Camper
                </Typography>

                <CardContent className={classes.cardContent} align="left">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <>(5)</>
                </CardContent>
                <Typography
                  variant="h6"
                  align="left"
                  color="textSecondary"
                  paragraph
                >
                  Sleeps 4
                </Typography>
              </div>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      BOOK
                    </Button>
                  </Grid>
                  {/* <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid> */}
            {/* </Grid>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
