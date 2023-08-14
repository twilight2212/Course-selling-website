
import React from "react";

import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Card } from "@mui/material";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {

    const navigate = useNavigate();
    return <div style={{paddingTop: 150}}>
        <center>
            <Card variant="outlined" style={{width: 600, padding:50}}>
                <h1>Welcome to course selling website!</h1>
                <h4>Choose your role here!</h4>
                {/* <a href="/register">Register</a>
                <br/>
                <a href="/login">Login</a> */}
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <div style={{marginRight:10}}>
                        <Button variant="contained" onClick={() => {
                            navigate('/user');
                        }}>User</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => {
                            navigate('/admin');
                        }}>Admin</Button>
                    </div>
                </div>
            </Card>
        </center>
    </div>
}

export default Landing;