import { Button, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";


function Landing() {
    const userEmail = useRecoilValue(userEmailState);
    const navigate = useNavigate();

    return<div style={{display:'flex', 
        justifyContent:'space-around', 
        marginTop: 50, 
        height: '75%', 
        background: 'linear-gradient(to right, #F8FDCF, #78C1F3)',
    }}>
        <div style={{marginTop: 150}}>
            <Typography variant="h4" fontStyle={'bold'} color={'#9376E0'}>Learning that gets you</Typography>
            <Typography variant="h6" color={'#F266AB'}>Skills for your present (and your future). Get started with us.</Typography>
            {!userEmail && <div style={{marginTop: 50}}>
                <Button variant="contained" style={{marginRight: 20}} onClick={() => {
                    navigate('/signin')
                }}>SignIn</Button>
                <Button variant="contained" onClick={() => {
                    navigate('/signup')
                }}>Signup</Button>
            </div>
            }
        </div>
        <div style={{marginTop: 50}}>
            <img src="https://t3.ftcdn.net/jpg/04/01/82/88/360_F_401828855_iExtL0qWwbwZMMMmBGcdRoJulSW07wXf.webp"></img>
        </div>
    </div>
}

export default Landing;