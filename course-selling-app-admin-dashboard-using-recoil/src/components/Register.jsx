import React from "react";
import TextField from '@mui/material/TextField';
import { Card } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    return <div>
        <center>
        <div style={{paddingTop:100}}>
        <h1>Register to the website</h1>
        </div>
        </center>

        <div style={{
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
                    
                    try{
                        const res = await axios.post("http://localhost:3000/admin/signup", {
                            username: email,
                            password: password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                        
                        localStorage.setItem("token", res.data.token);
                        setUser({
                            isLoading: false,
                            userEmail: email
                        });

                        alert("You have sucessfully registered!!")
                        navigate("/courses");
                    }
                    catch{
                        alert('Admin already exists');
                    }

                }}>Register</Button>
            </Card>
        </div>
        <hr style={{width: 400}} />
        <div style={{display: "flex", justifyContent: "center", fontSize: 25}}>
            <center>
                Already a user? <Button href="/login">Login</Button>
            </center>
        </div>
    </div>
}

export default Register;