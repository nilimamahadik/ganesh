import React, { useMemo, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton"; // Import the IconButton component
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu"; // Import the icon you want to use for the button
import obbb from "../image/obbb.jpg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Drawer = () => {
  const navigate = useNavigate();
const[value,setValue] = useState();
  const [state, setState] = React.useState({
    left: false
  });
  useEffect(() => {
   
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setValue(parsedInfo);
    }
   
  }, []);

const submit = () =>{
  navigate(`/csv/${value.id}`);
}

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
 

  const list = (anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List style={{display:"flex", paddingLeft:"30px",backgroundColor: '#de0f3f'}}>
        {/* <div style={{display:"flex", padingLeft:"30px",backgroundColor: '#de0f3f'}}> */}
    <img src={obbb} alt="obbb" style={{ height: "30%", width: "60px" }} />&nbsp;
      <h6 style={{paddingTop:"20px" , color:"white"}}>BHARAT ONLINE
    </h6>
      {/* <h6>  We got everything you need !</h6> */}
      {/* </div> */}
    </List>
    <Divider />
    <List>
    <p color="black">
   <ManageAccountsIcon style={{ fontSize: 30, color: 'blue' }}/> &nbsp;&nbsp;
   <Link to="/userlist" style={{color:"black",fontSize:"20px",fontWeight: "normal",textDecoration: "none"}}>User Management </Link></p>
  {/* <p onClick={() => navigate("/userlist")} aria-label="User Management" style={{fontSize:"20px",fontWeight: "normal"}}>  <ManageAccountsIcon style={{ fontSize: 30, color: 'blue' }}/> &nbsp;&nbsp;User Management</p>     */}
   {/* <Link to="/"> */}
   <p>
< DownloadForOfflineIcon style={{ fontSize: 30, color: 'blue' }}/>&nbsp;&nbsp;

<text onClick={submit} style={{color:"black",fontSize:"20px",fontWeight: "normal",textDecoration: "none"}}>Download</text>
</p>
   <p color="black">
   <LogoutIcon style={{ fontSize: 30, color: 'blue' }}/> &nbsp;&nbsp;
   <Link to="/" style={{color:"black",fontSize:"20px",fontWeight: "normal",textDecoration: "none"}}>Log Out  </Link></p>
    </List>
  </Box>

  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* Here we add the IconButton with the MenuIcon */}
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            edge="start"
            // color="inherit"
            aria-label="menu"
            style={{ paddingLeft: '20px' }} 
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
    
  );
};

export default Drawer;


