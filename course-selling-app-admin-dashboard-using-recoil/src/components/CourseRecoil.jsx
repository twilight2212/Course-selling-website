import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Button, TextField, Grid, CardContent, CardMedia } from "@mui/material";
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import axios from "axios";
import { courseState } from "../store/atoms/course";
import { courseDescription, courseImage, coursePrice, coursePublished, courseTitle, isCourseLoading } from "../store/selectors/course";

function Course(){
    const {courseId} = useParams();
    console.log("Hi from Course");

    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    React.useEffect(() => {

        axios.get(`http://localhost:3000/admin/course/${courseId}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data.course);
            setCourse({
                isLoading: false,
                course:res.data.course
            });
        }).catch(e => {
            setCourse({isLoading: false, course: null});
        });

    }, [])

    if(courseLoading){
        return<>Loading.....</>
    }

    return <div style={{padding:20}}>
        <Grid container>
            <Grid item lg={8} md={12} sm={12} style={{display:"flex", justifyContent: "center", marginTop: 50}}>
                {/* Using this component from ShowCourses.jsx used 'export' keyword for this component there */}
                <CourseCard/>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                {/* We can also pass right side of a state variable as a prop, in this case 'setCourse' */}
                <UpdateCard/>
            </Grid>
        </Grid>
    </div>
}

//this is object destructuring instead of using props as a argument written this '{course, setCourse}'
function UpdateCard(){

    const [courseDetails, setCourse] = useRecoilState(courseState);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [published, setPublished] = React.useState('');
    console.log("Hi from UpdateCard");

    React.useEffect(() => {
        setTitle(courseDetails.course.title);
        setDescription(courseDetails.course.description);
        setImage(courseDetails.course.imageLink);
        setPrice(courseDetails.course.price);
        setPublished(courseDetails.course.published);
      }, [courseDetails]);

    
    console.log(title);

    return <div>

            <Card variant="outlined" style={{width: 400, padding: 10}}>
                <Typography variant="h6" style={{marginBottom:10}}>Update course details</Typography>
                <TextField
                    value={title}
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined"
                    onChange={e => {
                        setTitle(e.target.value)
                    }} />
                <br /> <br />
                <TextField
                    value={description}
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Description" 
                    variant="outlined"
                    onChange={e => {
                        setDescription(e.target.value)
                    }} />
                <br /> <br />
                <TextField
                    value={price}
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Price" 
                    variant="outlined"
                    type="number"
                    min="500"
                    max="20000"
                    onChange={e => {
                        setPrice(e.target.value)
                    }} />
                <br /> <br />
                <TextField
                    value={image}
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Image Link" 
                    variant="outlined"
                    onChange={e => {
                        console.log("hi")
                        setImage(e.target.value)
                    }} />
                <br /> <br />
                <TextField
                    value={published}
                    fullWidth={true}
                    id="outlined-basic" 
                    label="Published" 
                    variant="outlined"
                    onChange={e => {
                        setPublished(e.target.value)
                    }} />
                {console.log(published)}
                <br /> <br />
                <Button variant="contained" onClick={async () => {

                    try{
                        const res = await axios.put("http://localhost:3000/admin/courses/" + courseDetails.course._id, {
                            title: title,
                            description: description,
                            price: price,
                            imageLink: image
                        },{
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });

                        // const data = res.data;
                        const updatedCourse = {
                            _id: courseDetails.course._id,
                            title: title,
                            description: description,
                            price: price,
                            imageLink: image,
                            published: published
                        };

                        setCourse({
                            isLoading: false,
                            course: updatedCourse
                        });

                    }
                    catch{
                        alert('Course not found');
                    }

                }}>Update Course</Button>
            </Card>
        </div>
            
}

function CourseCard(){
    console.log("Hi from CourseCard");

    const title = useRecoilValue(courseTitle);
    const description = useRecoilValue(courseDescription);
    const price = useRecoilValue(coursePrice);
    const image = useRecoilValue(courseImage);
    const published = useRecoilValue(coursePublished);

    // if (!course) {
    //     // Render a loading state while course is being fetched
    //     return <div>Loading...</div>;
    //   }

    return<Card variant="outlined" 
        sx={{ border: '1px solid black' }}
        style={{
        // margin: 10,
        width: 300,
        height: 340,
        marginRight: 50,
        paddingBottom: 15,
        borderRadius: 20
    }}>
        <CardContent style={{ paddingTop: 0, paddingBottom: 15 }}>
            <Typography textAlign={"center"} variant="h5">{title}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{description}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>Rs {price}</Typography>
            <Typography variant="subtitle1" textAlign={"center"}>{published}</Typography>
        </CardContent>
        <CardMedia
                component="img"
                src={image}
                alt={title}
                // sx={{ border: '1px solid black' }}
                style={{
                    width: '100%',
                    objectFit: 'cover',
                    height: 200, // Adjust image height as needed
                    outline: 'solid',
                    outlineWidth: 'thin'
                }}
            />
            {/* <img src={image} style={{width: 300}}></img> */}
    </Card>
}

export default Course;