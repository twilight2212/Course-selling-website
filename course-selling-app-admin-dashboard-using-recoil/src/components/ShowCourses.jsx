import { Button, Card, Typography, CardMedia, CardContent, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const navigate = useNavigate();

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    React.useEffect(() => {
        axios.get("http://localhost:3000/admin/courses/", {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            setCourses(res.data.courses)
        })
    }, [])

    return <div style={{margin: "0px", backgroundColor: "#EEEEEE"}}>
        <Typography variant="h4" align="center">All Courses</Typography>
        <div style={{display: "flex", justifyContent:"flex-end", marginRight:25, marginBottom:20}}>
            <Button variant="contained" onClick={() => {
                navigate('/addcourse')
            }}>Add Course</Button>
        </div>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center",  height: "100%"}}>
            {courses.map((course) => {
                return <div style={{marginRight: 50, marginTop:20}}>
                    <CourseDisplay course={course} setCourses={setCourses}/>
                    {/* <center>
                        <Button variant="outlined" style={{width: 300, marginLeft: -50, borderRadius: 25}} onClick={() => {
                            navigate('/course/'+ course._id)
                        }}>Edit</Button>
                    </center> */}
                </div>
            })}
        </div>
    </div>
}

//with export keyword we can use 'Course' component in other functions/conponents/places as well
export function CourseDisplay(props) {
    console.log("Hi from CourseDisplay");
    const navigate = useNavigate();
    return (
        <Card
            variant="outlined"
            sx={{ border: '1px solid black' }}
            style={{
                width: 300,
                height: '100%',
                borderRadius: 20,
                overflow: 'hidden', // Hide overflowing content
                // outline: 'solid'
            }}
        >
            <div>
            <CardMedia
                component="img"
                src={props.course.imageLink}
                alt={props.course.title}
                // sx={{ border: '1px solid black' }}
                style={{
                    width: '100%',
                    objectFit: 'cover',
                    height: 190, // Adjust image height as needed
                    outline: 'solid',
                    outlineWidth: 'thin'
                }}
            />
            <CardContent style={{ paddingTop: 0, paddingBottom: 15 }}>
                <Typography variant="h5" align="center">
                    {props.course.title}
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Rs {props.course.price}
                </Typography>
                <Typography variant="subtitle1" align="center">
                    {props.course.description}
                </Typography>
            </CardContent>
            </div>
        </Card>
    );
    // return<Card variant="outlined" style={{
    //     // margin: 10,
    //     width: 300,
    //     minHeight: 200,
    //     marginRight: 50,
    //     paddingBottom: 15,
    //     borderRadius: 20
    // }}>
    //         <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
    //         <Typography variant="subtitle1" textAlign={"center"}>{props.course.description}</Typography>
    //         <Typography variant="subtitle1" textAlign={"center"}>Rs {props.course.price}</Typography>
    //         <img src={props.course.imageLink} style={{width: 300}}></img>
    // </Card>
}

export default ShowCourses;