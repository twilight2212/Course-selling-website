import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Link, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { userstate } from "../store/atoms/user";
import { loadingState } from "../store/selectors/isLoading";
import { userEmailState } from "../store/selectors/userEmail";
function Appbar() {
    const setUser = useSetRecoilState(userstate);
    const navigate = useNavigate();
    const loading = useRecoilValue(loadingState);
    const user = useRecoilValue(userEmailState);

    // console.log(loading);
    if(loading){
        return<div>Loading......</div>
    }

    if(user){
        return <div style={{
            display:"flex", 
            justifyContent:"space-between", 
            background: 'linear-gradient(to right, #3AA6B9, #FFD0D0)', 
            paddingTop:5,
            height: 50
        }}>
            <Link variant={"h4"} href="/" underline="none" color="#e3f2fd">Coursera</Link>

            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Typography variant="h6">{user}</Typography>
                </div>

                <div style={{marginRight: 25}}>
                    <Button variant="contained" onClick={() => {
                        localStorage.setItem('token', null);
                        setUser({
                            isLoading: false,
                            userEmail: null
                        })
                        navigate('/');
                    }}>Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display:"flex", 
            justifyContent:"space-between", 
            background: 'linear-gradient(to right, #3AA6B9, #FFD0D0)', 
            paddingTop:5,
            height: 50
        }}>
            <Typography variant={"h4"} color={"white"}>Coursera</Typography>

            <div style={{display: "flex"}}>
                <div style={{marginRight: 25}}>
                    <Button variant="contained" onClick={() => {
                        navigate("/signup");
                    }}>Signup</Button>
                </div>

                <div style={{marginRight: 25}}>
                    <Button variant="contained" onClick={() => {
                        navigate("signin");
                    }}>Signin</Button>
                </div>
            </div>
        </div>
    }

}

export default Appbar;