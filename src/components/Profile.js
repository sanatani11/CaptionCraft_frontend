// PaymentPage.js

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Button } from "@material-ui/core";
import PaymentIcon from "@mui/icons-material/Payment";
import TollIcon from "@mui/icons-material/Toll";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    background: "#fff", // Using the background color from the color scheme
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#fff", // Using the text color from the color scheme
    background: "var(--c1)",
  },
  linkButton: {
    textDecoration: "none",
    color: "inherit", // Inherit text color from parent
  },
  icon: {
    fontSize: 50,
    marginRight: theme.spacing(1),
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  balanceText: {
    marginRight: theme.spacing(1),
  },
}));

const PaymentPage = () => {
  const classes = useStyles();
  //   const [coinBalance, setCoinBalance] = useState(0); // State variable to store coin balance
  const [coinValue, setCoinValue] = useState(null);
  //   let email = localStorage.getItem("user");
  //   email = email.email; // Replace with the actual email
  useEffect(() => {
    // Fetch coin balance from backend API
    getCoinValue();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const getCoinValue = async (email) => {
    try {
      // Make GET request to the backend API endpoint
      console.log(
        JSON.parse(localStorage.getItem("user")).email,
        "this is final"
      );
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/get-coin/${
          JSON.parse(localStorage.getItem("user")).email
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //   console.log(response);
      // Parse response data
      if (response.ok) {
        let data = await response.json();
        setCoinValue(data.coin);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.balanceContainer}>
          <TollIcon className={classes.icon} />
          <h3 className={classes.balanceText}>
            Current Coin Balance: {coinValue}
          </h3>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1>Choose Your Plan</h1>
              <Grid container spacing={3} justify="center">
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <h2>50 Rupees - 100 Coins</h2>
                    <Button variant="contained" color="primary">
                      <PaymentIcon className={classes.icon} />
                      <Link
                        to="/profile/checkout?amount=50"
                        className={classes.linkButton}
                      >
                        Buy Now
                      </Link>
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <h2>100 Rupees - 250 Coins</h2>
                    <Button variant="contained" color="primary">
                      <PaymentIcon className={classes.icon} />
                      <Link
                        to="/profile/checkout?amount=100"
                        className={classes.linkButton}
                      >
                        Buy Now
                      </Link>
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PaymentPage;
