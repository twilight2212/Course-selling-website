import { Card, Typography, CardMedia, CardContent, IconButton, CardActions, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState([]);

    const getCourses = async() => {

        const res = await axios.get('http://localhost:3000/users/courses', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })

        const data = res.data;

        setCourses(data.courses);
    }

    useEffect(() => {
        getCourses();
    }, [])

    return <div>
        <Typography variant="h4" style={{marginBottom: 20}} textAlign={'center'}>All Courses</Typography>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '100%'}}>
            {courses.map((course) => {
                return <div style={{marginRight: 50, marginTop:20}}>
                    <CourseCard course={course}/>
                </div>
            })}
        </div>
    </div>
}

// function CourseCard(props) {
//     return<Card variant="outlined" 
//     style={{

//         // margin: 10,
//         width: 300,
//         Height: 200,
//         marginRight: 50,
//         paddingBottom: 15,
//         borderRadius: 20,
//         display: 'flex',
//         flexDirection: 'column', // Arrange content vertically
//         justifyContent: 'space-between', // Space out content vertically
//         overflow: 'hidden', // Hide overflowing content
//     }}>
        
//         <img src={props.course.imageLink} style={{width: '100%',
//             objectFit: 'cover', // Ensure the image covers the entire space
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             height: 150}}></img>
//         <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
//         <Typography variant="subtitle1" textAlign={"center"}>{props.course.description}</Typography>
//         <Typography variant="subtitle1" textAlign={"center"}>Rs {props.course.price}</Typography>
//     </Card>
// }

const CourseCard = (props) => {
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
                {/* <Typography variant="subtitle1" align="center">
                    {props.course.description}
                </Typography> */}
            </CardContent>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => {
                navigate('/purchasecourse/'+ props.course._id);   //CHANGE THIS LATER
            }}>
                <AddShoppingCartIcon style={{fontSize: 30}}/>
            </IconButton>
        </Card>
    );
};

export default Courses;