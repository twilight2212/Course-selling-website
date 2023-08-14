import { useEffect, useState } from "react";
import { Button, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user";


function Appbar(){
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoading);
    const setUser = useSetRecoilState(userState);

    if(isLoading){
        return<div>Loading.....</div>
    }

    
    if(userEmail){
        return <div style={{
            display:"flex", 
            justifyContent:"space-between", 
            background: 'linear-gradient(to right, #3AA6B9, #FFD0D0)', 
            paddingTop:5,
            height: 50
        }}>

        <Typography variant={"h4"} color={"white"}>Coursera</Typography>

        <div style={{display:"flex"}}>
            <div style={{marginRight: 10}}>
                <Typography variant="h6">{userEmail}</Typography>
            </div>

            <div style={{marginRight: 25}}>
                <Button variant="contained" onClick={() => {
                    localStorage.setItem("token", null);
                    setUser({
                        isLoading: false, 
                        userEmail: null
                    });
                    navigate('/')
                }}>Logout</Button>
            </div>
        </div>
    </div>
    }
    else{
        return <div style={{
            display:"flex", 
            justifyContent:"space-between", 
            background: 'linear-gradient(to right, #3AA6B9, #FFD0D0)', 
            paddingTop:5,
            height: 50
        }}>

            <Typography variant={"h4"} color={"white"}>Coursera</Typography>

            <div style={{display:"flex"}}>
                <div style={{marginRight: 10}}>
                    <Button variant="contained" onClick={() => {
                        navigate('/register')
                    }}>Signup</Button>
                </div>

                <div style={{marginRight: 25}}>
                    <Button variant="contained" onClick={() => {
                        navigate('/login')
                    }}>Signin</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;