import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Button, TextField, Grid } from "@mui/material";
import { CourseDisplay } from "./ShowCourses";
import { useNavigate } from "react-router-dom";

function Course(){
    const {courseId} = useParams();
    const [course, setCourse] = React.useState();
    const navigate = useNavigate();
    console.log("Hi from Course");

    React.useEffect(() => {
        fetch(`http://localhost:3000/admin/course/${courseId}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data.course);
                setCourse(data.course);
            })
        })
    }, [])

    if (!course) {
        // Render a loading state while course is being fetched
        return <div>Loading...</div>;
      }

    return <div style={{padding:20}}>
        <Grid container>
            <Grid item lg={8} md={12} sm={12} style={{display:"flex", justifyContent: "center"}}>
                {/* Using this component from ShowCourses.jsx used 'export' keyword for this component there */}
                <CourseDisplay course={course}/>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                {/* We can also pass right side of a state variable as a prop, in this case 'setCourse' */}
                <UpdateCard course={course} setCourse={setCourse}/>
            </Grid>
        </Grid>
    </div>

}

//this is object destructuring instead of using props as a argument written this '{course, setCourse}'
function UpdateCard({course, setCourse}){
    const [title, setTitle] = React.useState(course.title);
    const [description, setDescription] = React.useState(course.description);
    const [image, setImage] = React.useState(course.imageLink);
    const [price, setPrice] = React.useState(course.price);
    console.log("Hi from UpdateCard");

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
                    {console.log(price)}
                <br /> <br />
                <Button variant="contained" onClick={() => {
                    fetch("http://localhost:3000/admin/courses/" + course.id,{
                        method: "PUT",
                        body: JSON.stringify({
                            title,
                            description,
                            price: price,
                            imageLink: image
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).then((response) => {
                        response.json().then((data) => {
                            // console.log(image);
                            // alert(data.message);
                            setCourse({
                                title,
                                description,
                                price: price,
                                imageLink: image
                            })
                        })
                    })
                }}>Update Course</Button>
            </Card>
        </div>
            
}

export default Course;