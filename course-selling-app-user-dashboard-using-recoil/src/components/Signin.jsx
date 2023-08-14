import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userstate } from "../store/atoms/user";
import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useSetRecoilState(userstate);
    const navigate = useNavigate();

    return <div>
        <center>
        <div style={{paddingTop:100}}>
        <h1>Login to the website</h1>
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
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>

                <br/><br/>
                <TextField 
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    type="Password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}/>

                <br/><br/>
                <Button variant="contained" onClick={async() => {
                    try{
                        const response = await axios.post("http://localhost:3000/users/login", null, {
                            headers: {
                                "username": email, // Sending email as the username in the request headers
                                "password": password // Sending password in the request headers
                            }
                        });

                        const data = response.data;

                        setUser({
                            isLoading: false,
                            userEmail: email
                        });
                
                        localStorage.setItem("token", data.token);
                        navigate("/courses");

                    } catch (error) {
                        //console.error("Error occurred during login request:", error.response.data.message);
                        alert(error.response.data.message);
                        // Handle the error here (e.g., show an error message to the user)
                    }

                }}>Signin</Button>
            </Card>
        </div>
        <hr style={{width: 400}} />
        <div style={{display: "flex", justifyContent: "center", fontSize: 25}}>
            <center>
                Already a user? <Button href="/signup">Signup</Button>
            </center>
        </div>
    </div>
}

export default Signin;