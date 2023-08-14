import { Card, Typography, CardMedia, CardContent, Button, Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PurchaseCourse() {
    const {courseId} = useParams();

    const [course, setCourse] = useState();
    const [purchased, setPurchased] = useState(false); // New state for tracking purchase status

    const getCourse = async() => {
        try{
            const response = await axios.get('http://localhost:3000/users/course/' + courseId, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            const data = response.data;
            //console.log(data.course.title);
            setCourse(data.course)
        } catch(error) {
            alert(error.response.data.message);
        }
    }

    useEffect(() => {
        getCourse();
    }, [])

    if(!course) {
        return<div>Loading.....</div>
    }


    return <div>
        <DisplayCourse course={course} setPurchased={setPurchased} hasPurchased={purchased}/>
    </div>
}

function DisplayCourse(props) {

    return<center>
        <div style={{
            marginTop: 50,
            backgroundColor: '#4e4eb2',
            height: 400,
            width: '95%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
        }}>
            <div style={{marginTop:20, textAlign:'left'}}>
                <Typography variant="h3" align="center" color={"white"} >
                    {props.course.title}
                </Typography>

                <Typography variant="subtitle1" align="center" color={"white"} textAlign={'left'}>
                    {props.course.description}
                </Typography>

                <br /><br />
                <Typography variant="subtitle1" align="center" color={"white"} textAlign={'left'}>
                    Rs {props.course.price}
                </Typography>
                {!props.hasPurchased && <Button variant="contained" color="secondary" onClick={async() => {
                    try{
                        const res = await axios.post('http://localhost:3000/users/courses/'+props.course._id, null,
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        
                        props.setPurchased(true);
                        alert(res.data.message);
                    } catch(error) {
                        alert(error.response.data.message);
                    }
                }}>
                    Buy this course
                </Button>
                }
                {props.hasPurchased && <Button variant="contained" color="success">Course Purchased</Button>}
            </div>
            <Card variant="outlined" style={{backgroundColor: 'white', 
                width:'25%', 
                height: 480,
                marginTop:20,
                outline: 'solid',
                borderRadius: 10}}>
                <CardMedia
                    component="img"
                    src={props.course.imageLink}
                    alt={props.course.title}
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                        height: '50%', // Adjust image height as needed
                        borderRadius: 10,
                        outline: 'solid',
                        outlineWidth: 'thin'
                    }}
                />
                <CardContent style={{ paddingTop: 0, paddingBottom: 15 }}>
                    <Typography variant="h5" align="center">
                        {props.course.title}
                    </Typography>
                    <Typography variant="subtitle1" align="center" textAlign={'left'}>
                        {props.course.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </center>
}

export default PurchaseCourse;