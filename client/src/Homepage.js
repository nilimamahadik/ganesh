

import React from "react";
import frontpage from './image/frontpage.jpg'
import './Homepage.css'
import ganeshji1 from './image/ganeshji1.jpg'



function App() {
  return (
    <>
      <div className="container">

        <nav
          style={{
            position: "absolute",
            top: 0,
            right: "20px",
            padding: "10px",
           fontFamily:"Italic",
            zIndex: 1,
          }}
        >
        
       
              <a href="/adminlogin" style={{ color: "white", fontSize:"20px" }}>Admin</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/userlogin" style={{ color: "white" ,fontSize:"20px"}}>User</a>
           
       
        </nav>
      </div>
    </>
  );
}
export default App;



