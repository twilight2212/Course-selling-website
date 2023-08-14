import { Button, Card, TextField, Typography, Select } from "@mui/material";
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCourses(){
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [published, setPublished] = React.useState('');
    const navigate = useNavigate();

    return<div>
        <div style={{paddingTop:10, marginLeft: 10}}>
            <Button variant="contained" onClick={() => {
                navigate(-1);
            }}>Go Back</Button>
        </div>
        <div style={{paddingTop:100}}>
            <Typography textAlign={"center"} variant="h5" style={{marginBottom:20}}>Add new course details here</Typography>
            <center>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Card variant="outlined" style={{width: 400, padding: 20}}>
                        <TextField
                            fullWidth={true}
                            id="outlined-basic" 
                            label="Title" 
                            variant="outlined"
                            onChange={e => {
                                setTitle(e.target.value)
                            }} />
                        <br /> <br />
                        <TextField
                            fullWidth={true}
                            id="outlined-basic" 
                            label="Description" 
                            variant="outlined"
                            onChange={e => {
                                setDescription(e.target.value)
                            }} />
                        <br /> <br />
                        <TextField
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

                        <TextField
                            fullWidth={true}
                            id="outlined-basic" 
                            label="Published" 
                            variant="outlined"
                            type="boolean"
                            onChange={e => {
                                setPublished(e.target.value)
                            }} />
                            {console.log(published)}
                        <br /> <br />

                        <Button variant="contained" onClick={async () => {

                            const res = await axios.post("http://localhost:3000/admin/courses", {
                                title,
                                description,
                                price: price,
                                imageLink: image,
                                published: published
                            }, {
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            })

                            const data = res.data;
                            alert(data.message);

                        }}>Add Course</Button>
                    </Card>
                </div>
            </center>
        </div>
    </div>
}

export default AddCourses;