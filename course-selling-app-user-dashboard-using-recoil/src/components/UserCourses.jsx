import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function UserCourses() {
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users/purchasedCourses', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            const data = res.data;
            const courseIds = data.purchasedCourses;

            // Use Promise.all to fetch all courses
            const fetchPromises = courseIds.map((id) => {
                return axios.get('http://localhost:3000/users/course/' + id, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            });

            Promise.all(fetchPromises)
                .then((responses) => {
                    const fetchedCourses = responses.map(response => response.data.course);
                    setMyCourses(fetchedCourses);
                })
                .catch((error) => {
                    console.error('Error fetching courses:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching course IDs:', error);
        });
    }, []);

    if(myCourses.length === 0) {
        return <div>Loading....</div>
    }

    console.log(myCourses);

    return <div>
        <Typography variant="h4" style={{marginBottom: 20}} textAlign={'center'}>Purchased Courses......</Typography>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '100%'}}>
            {myCourses.map((course) => {
                return <div style={{marginRight: 50}}>
                    <DisplayCourses course={course}/>
                </div>
            })}
        </div>
    </div>
}

function DisplayCourses(props) {
    return (
        <Card
            variant="outlined"
            sx={{ border: '1px solid black' }}
            style={{
                width: 300,
                height: '100%',
                borderRadius: 20,
                overflow: 'hidden', // Hide overflowing content
            }}
        >
            <CardMedia
                component="img"
                src={props.course.imageLink}
                alt={props.course.title}
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
        </Card>
    );
}


export default UserCourses;