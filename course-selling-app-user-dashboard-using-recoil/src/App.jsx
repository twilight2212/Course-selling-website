import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Courses from './components/Courses';
import UserCourses from './components/UserCourses';
import PurchaseCourse from './components/PurchaseCourse';
import Appbar from './components/Appbar';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { userstate } from './store/atoms/user';

function App() {

    return <RecoilRoot>
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#EEEEEE"}}>
            <Router>
                <Appbar />
                <InitUser />
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/signup' element={<Signup />}/>
                    <Route path='/signin' element={<Signin />}/>
                    <Route path='/courses' element={<Courses />}/>
                    <Route path='/mycourses' element={<UserCourses />}/>
                    <Route path='/purchasecourse/:courseId' element={<PurchaseCourse />}/>
                </Routes>
            </Router>
        </div>
    </RecoilRoot>
}

function InitUser() {
    const setUser = useSetRecoilState(userstate);

    useEffect(() => {
        axios.get('http://localhost:3000/users/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            const data = response.data;

            if (data.username) {
                setUser({
                    isLoading: false,
                    userEmail: data.username
                });
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                });
            }
        })
        .catch((error) => {
            setUser({ isLoading: false, userEmail: null });
        });
    }, []);

    return <></>;
}

export default App;