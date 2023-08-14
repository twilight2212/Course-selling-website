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
        background: 'linear-gradient(to right, #FFF3E2, #FCC8D1)',
    }}>
        <div style={{marginTop: 150}}>
            <Typography variant="h4" fontStyle={'bold'} color={'#9376E0'}>Happy Online Teaching!!</Typography>
            <Typography variant="h6" color={'#7AA874'}>Teach to upskill the world for present and future.</Typography>
            {!userEmail && <div style={{marginTop: 50}}>
                <Button variant="contained" style={{marginRight: 20}} onClick={() => {
                    navigate('/login')
                }}>Login</Button>
                <Button variant="contained" onClick={() => {
                    navigate('/register')
                }}>Register</Button>
            </div>
            }
        </div>
        <div style={{marginTop: 50}}>
            <img style={{height:'75%'}} src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=2000"></img>
        </div>
    </div>
}

export default Landing;