import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userstate } from "../store/atoms/user";
import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useSetRecoilState(userstate);
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
                        const response = await axios.post("http://localhost:3000/users/signup", {
                            username: email,
                            password: password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        });

                        localStorage.setItem('token', response.data.token);
                        setUser({
                            isLoading: false,
                            userEmail: email
                        });

                        alert("You have successfully signed up!");
                        navigate('/courses');
                    } catch(error) {
                        alert(error.response.data.message);
                    }

                }}>Signup</Button>
            </Card>
        </div>
        <hr style={{width: 400}} />
        <div style={{display: "flex", justifyContent: "center", fontSize: 25}}>
            <center>
                Already a user? <Button href="/signin">Signin</Button>
            </center>
        </div>
    </div>
}

export default Signup;