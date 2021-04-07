import React, {useState} from 'react';
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
import Axios from 'axios'
import { useLocation, useParams } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: theme.spacing(3)
    }
    
  }));

export default function Upload() {
    const classes = useStyles();
    const [nric, setNric] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [registeredAdd, setRegisteredAdd] = useState("");
    const [email, setEmail] = useState("");



    const submitUser = () => {
      Axios.post('http://localhost:3001/api/profile',{
        nric: nric,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        tokenId:tokenId,
        registeredAdd: registeredAdd,
        email: email
      }).then(() => {
        alert("nric" + " " + nric + "\n" + "firstName" + " " + firstName + "\n" + "lastName" + " " + lastName + "\n" + "contactNo" + " " + contactNo + "\n" + "tokenId" + " " + tokenId + "\n"
        + "registeredAdd" + " " + registeredAdd + "\n" + "email" + " " + email + "\n")
      });

    }
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
                label="NRIC"
                name="nric"
                onChange={(e) => {
                  setNric(e.target.value)
                }}    
                required
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
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
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
                onChange={(e) => {
                  setLastName(e.target.value)
                }}                
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
                name="contactNo"
                onChange={(e) => {
                  setContactNo(e.target.value)
                }}
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
                label="Token Id"
                name="tokenId"
                onChange={(e) => {
                  setTokenId(e.target.value)
                }}
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
                label="Registered Add"
                name="registeredAdd"
                onChange={(e) => {
                  setRegisteredAdd(e.target.value)
                }}
                required
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
                label="Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
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
            <Button onClick={submitUser}>Submit</Button>
        </Box>
      </Card>
        </div>
    )

}