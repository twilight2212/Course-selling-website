import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Appbar from './components/Appbar';
import AddCourses from './components/AddCourses';
// import Course from './components/Course';
import CourseRecoil from './components/CourseRecoil';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { useEffect } from 'react';
import axios from 'axios';
import MyCreatedCourses from './components/MyCreatedCourses';



function App() {
    return ( <RecoilRoot>
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#EEEEEE"}}>
                <Router>
                    <Appbar />
                    <InitUser />
                    <Routes>
                        {/* ADMIN SPECIFIC ROUTES */}
                        <Route path='/' element={<Landing />}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/courses" element={<ShowCourses />} />
                        {/* <Route path="/course/:courseId" element={<Course />} /> */}
                        <Route path="/course/:courseId" element={<CourseRecoil />} />
                        <Route path="/addcourse" element={<AddCourses />}></Route>
                        <Route path='/owncourses' element={<MyCreatedCourses/>}/>
                    </Routes>
                </Router>
            </div>
        </RecoilRoot>
    );
}

function InitUser(){
    const setUser = useSetRecoilState(userState);

    const init = async() => {
        try{
            const response = await axios.get("http://localhost:3000/admin/me", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
            })

            const data = response.data;
            if (data.username) {
                setUser({
                    isLoading: false,
                    userEmail: data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch(e) {
            setUser({isLoading: false, userEmail: null});
        }
    }

    useEffect(() => {
        init();
    }, [])

    return <></>
}
export default App;