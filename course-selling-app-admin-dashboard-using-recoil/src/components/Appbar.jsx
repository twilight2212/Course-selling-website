import React, { useState } from "react";
import { Button, Typography, Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user";
import MenuIcon from '@mui/icons-material/Menu';


function Appbar() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(isUserLoading);
  const setUser = useSetRecoilState(userState);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate('/');
  };

  const sidebarContent = (
    <>
    <List>
        <ListItem button onClick={() => navigate('/courses')}>
            <ListItemText primary="All Courses" />
        </ListItem>
        <hr></hr>
        <ListItem button onClick={() => navigate('/owncourses')}>
            <ListItemText primary="My Courses" />
        </ListItem>
        <hr></hr>
        <ListItem button onClick={() => navigate('/addcourse')}>
            <ListItemText primary="Create Courses" />
        </ListItem>
        <hr></hr>
        <ListItem button onClick={() => navigate('/')}>
        <ListItemText primary="Home" />
        </ListItem>
        <hr></hr>
    </List>
    </>
  );

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: 'linear-gradient(to right, #3AA6B9, #FFD0D0)',
          paddingTop: 5,
          height: 50
        }}
      >
        {userEmail && <div>
            <IconButton variant="contained" onClick={toggleSidebar}>
            <MenuIcon />
            </IconButton>
        </div>
        }
        <Typography variant="h4" color="white" style={{ marginRight: "auto" }}>
          Coursera
        </Typography>
        <div style={{ display: "flex" }}>
          {userEmail ? (
            <>
              <div style={{ marginRight: 10 }}>
                <Typography variant="h6">{userEmail}</Typography>
              </div>
              <div style={{ marginRight: 25 }}>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginRight: 10 }}>
                <Button variant="contained" onClick={() => navigate('/register')}>Signup</Button>
              </div>
              <div style={{ marginRight: 25 }}>
                <Button variant="contained" onClick={() => navigate('/login')}>Signin</Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        {sidebarContent}
      </Drawer>
    </div>
  );
}

export default Appbar;
