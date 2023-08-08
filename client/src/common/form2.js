import { useContext } from "react";
import { Dropdown, Menu, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import Drawer from "./drawer";
import { AccountContext } from "../context/AccountProvider";
import {RWebShare} from "react-web-share";


function CustomTable({ data }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "Receipt No.",
      dataIndex: "receiptNumber",
      key: "receiptNumber"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["md"]
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },

    {
      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
      render: (text, record) => (

        <Link to={`/poster/${record._id}`}>
          <Button variant="contained">View Receipt</Button>
        </Link>
      ),
    },
    {

      title: "Share",

      dataIndex: "share",

      key: "share",
      render: (text, record) => (
        <RWebShare
          data={{
            text: "ONLINE BHARAT",
            url: `${window.location.protocol}//${window.location.host}/poster/${record._id}`,
            title: "ONLINE BHARAT",
          }}
        >
        
          <Button variant="contained">Share </Button>
        </RWebShare>
      )



    },

  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });

  const addKeys = (arr) => {
    return arr.map((item, index) => {
      return {
        ...item,
        receiptNumber: index + 1
      }
    });
  }
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Dropdown
          overlay={
            <Menu onClick={colVisibilityClickHandler} items={columnItems} />
          }
          placement="bottomLeft"
        >
          <Button>Column Visibility</Button>
        </Dropdown>
      </div>
      <div>
        <div>
          <Table
            scroll={{ x: true }}
            columns={columnsToShow}
            dataSource={data ? addKeys(data) : []}
          />
        </div>
      </div>
    </div>
  );
}

const FormExampleAdmin = () => {
  const params = useParams()
  // console.log(params);
  const { info, user } = useContext(AccountContext);
  // console.log(user);
  // console.log(info);
  const [data, setData] = useState([])
  const [value, setValue] = useState({})
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    amount: ""
  })
  const handleonchange = (e) => {
    // console.log(e);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const getallusers = async () => {

    const get = axios.get(`/api/getallusers/${params.id}`)
      .then((res) => {
        setData(res.data.data);
        //  console.log(res.data);
        localStorage.setItem("count", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getallusers();
    
  }, []);

  useEffect(() => {
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setValue(parsedInfo);
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = {
      name: formData.name,
      address: formData.address,
      amount: formData.amount,
      group_id: params.id,
      receiver: value.name
    };
    setFormData({
      name: "",
      address: "",
      amount: "",
      group_id: "",

    })

    const first = () => {
      // console.log(form);
      return axios
        .post("/api/submit", form)
        .then((response) => {
          getallusers()
          return response;
        }
        )
        .catch((err) => {
          console.log(err)
        })

    }
    first();

  }

  return (
    <>
      <div className="card column-design" >
        <div className="card-body" style={{ backgroundImage: 'url()' }}>
          <div className="front" style={{ backgroundColor: '#FA7D09' }}>
            {/* <Link to="/">
              <Button variant="contained">Log Out</Button>
            </Link> */}
             <Drawer />
            <Typography variant="h6" align="center">
              <b>|| श्री गणेशाय नमः ||</b>
            </Typography>
            <br />
            <Typography variant="h2" align="center">
              <b>{value.id}</b>
            </Typography>
            <Typography variant="h5" align="center">
              {value.address}
            </Typography>
            <hr />
          </div>
          <div>
          </div>
          <br /><br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '40px', borderColor: "Green" }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="नाव"><b>नाव:</b></label> &nbsp;&nbsp;
                <TextField
                  label="name"
                  name="name"
                  value={formData.name}
                  onChange={handleonchange}
                  required
                />
              </div>

              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="पत्ता"><b>पत्ता:</b></label> &nbsp;&nbsp;
                <TextField
                  type="text"
                  label="address"
                  name='address'
                  value={formData.address}
                  onChange={handleonchange}
                  required
                  multiline
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="रक्कम"><b>रक्कम:</b></label> &nbsp;&nbsp;
                <TextField
                  label="amount"
                  name='amount'
                  value={formData.amount}
                  onChange={handleonchange}
                  required
                  type="text"
                />
              </div>
              <br /><br />
              <div style={{ display: 'flex' }}>
                <Button variant="contained" type="submit">Save</Button>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" onClick={() => navigate("/userlist")} aria-label="User Management">User Management</Button> */}
              </div>
            </form>
          </div>
          <br></br>
          <div>
            <h2><u>Contributors</u></h2>
            <CustomTable data={data} />
            <td>
            </td>
            <br></br>
          </div>
        </div>
      </div>

    </>
  );

}
export default FormExampleAdmin;





