import React from "react";
import TextField from '@mui/material/TextField';
import { Card } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    return <div>
        <center>
        <div style={{paddingTop:100}}>
            <h1>Login to admin dashboard</h1>
        </div>
        </center>
        <div style={{
            //flex arranges things side by side****************IMPORTANT
            display: "flex",
            justifyContent: "center",
            marginBottom: 25
        }}>
            <Card variant="outlined" style={{width: 400, padding: 20}}>
                <TextField 
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    onChange={e => {
                        setEmail(e.target.value);
                    }}/>
                <br /> <br />
                <TextField 
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Password" 
                    type="Password"
                    variant="outlined" 
                    onChange={e => {
                        setPassword(e.target.value);
                    }}/>
                <br /> <br />
                <Button variant="contained" onClick={async () => {
                    
                    try {
                        const res = await axios.post("http://localhost:3000/admin/login", null, {
                            headers: {
                                "username": email, // Sending email as the username in the request headers
                                "password": password // Sending password in the request headers
                            }
                        });
                        const data = res.data;
                
                        if (data.message === "Logged in successfully") {
                            localStorage.setItem("token", data.token);
                            window.location= "/courses";
                        }
                    } catch (error) {
                        console.error("Error occurred during login request:", error);
                        alert("Invalid username or password");
                        // Handle the error here (e.g., show an error message to the user)
                    }

                }}>Login</Button>
            </Card>
        </div>
        <hr style={{width: 400}} />
        <div style={{display: "flex", justifyContent: "center", fontSize: 25}}>
            <center>
                New here? <Button href="/register">Register</Button>
            </center>
        </div>
    </div>
}

export default Login;