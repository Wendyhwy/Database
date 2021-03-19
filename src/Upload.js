import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select
  } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: theme.spacing(3)
    }
  }));

export default function Upload() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
     

            <Card>
        <CardHeader
          subheader="User's Details"
          title="Upload Details"
        />
        <Divider />
        <CardContent>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
                <TextField
                fullWidth
                label="Token ID"
                name="tokenId"
                // onChange={handleChange}
                required
                // value={profile.firstName}
                variant="outlined"
              />
                </Grid>
                <Grid
              item
              md={12}
              xs={12}
            >
                <TextField
                fullWidth
                label="NRIC"
                name="nric"
                // onChange={handleChange}
                required
                // value={profile.firstName}
                variant="outlined"
              />
                </Grid>
                <Grid
              item
              md={12}
              xs={12}
            >
                <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                // onChange={handleChange}
                required
                // value={profile.firstName}
                variant="outlined"
              />
                </Grid>
              <Grid
              item
              md={6}
              xs={6}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                // onChange={handleChange}
                required
                // value={profile.firstName}
                variant="outlined"
              />
      


            </Grid>
            <Grid
              item
              md={6}
              xs={6}
            >
                        <TextField
                fullWidth
                label="Last name"
                name="lastName"
                // onChange={handleChange}
                required
                // value={profile.firstName}
                variant="outlined"
              />
                </Grid>

                <Grid
              item
              md={12}
              xs={12}
            >
                <TextField
                fullWidth
                label="Device"
                name="device"
                // onChange={handleChange}
                required
                // value={profile.firstName}
                variant="outlined"
              />
                </Grid>
                
        </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
            <Button>Submit</Button>
          {/* <OkButton
                color="primary"
                variant="contained"
                type="submit"
                onClick = {handleSubmit(addStaff.bind(null, profile))}
              >
                Create New Staff
          </OkButton> */}
        </Box>
      </Card>
        </div>
    )

}