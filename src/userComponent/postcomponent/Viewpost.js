




import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API = `https://mernbackend-ukwc.onrender.com`;







const Viewdata = () => {
    const [users, setUsers] = React.useState([]);

    const [latitude,setLatitude]=React.useState(0)
    const [longitude,setLongitude]=React.useState(0)
    const navigate = useNavigate();
    const auth = localStorage.getItem('AUTH');
    const username=localStorage.getItem('USERNAME')
    // console.log(auth)

    
  
      const getlocation=async()=>{
        // console.log("gk")
        if (navigator.geolocation) {
  
          navigator.geolocation.getCurrentPosition(async(pos,err) => {
            let position = await pos;
            // console.log("position", position)
            await setLatitude(position.coords.latitude);
            await setLongitude(position.coords.longitude);
          });
        }
        else{
        //   console.log("alert")
          alert("location permission needed for better reach of post")
        }
      }



    const callapi = () => {
        axios({
            method: 'get',
            url: `${API}/tasks`,
            headers: {
                "Authorization": auth
            }
        })
            .then(result => {
                // console.log("result", result.data.data)
                setUsers(result.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    React.useEffect(() => {
        callapi()
        getlocation()
    }, [])

    ///
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [distance, setdistance] = React.useState();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClick = (row) => {
        // console.log('data', row)

        const latitudeData = row.loc.coordinates[0].toString()
        const longitudeData = row.loc.coordinates[0].toString()
        navigate("/post/update", { state: { id: row._id, title: row.title, body: row.body, latitute: latitudeData, longitude: longitudeData, status: row.status } });

    }
    const handleClickdelete = (row) => {
        // console.log("delete", row._id)
        axios({
            method: 'delete',
            url: `${API}/tasks/${row._id}`,
            headers: {
                "Authorization": auth
            }
        })
            .then(result => {
                if (result.data.msg.toLowerCase() == "success") {
                    callapi()
                }
            })
            .catch(err => {
                console.log(err);

            })
    }



    const handleFilter = (e) => {
        e.preventDefault();
        // console.log(distance)
        if(distance<=0){
            alert("put the distance greater than zero")

        }
        else{
        axios({
            method: 'get',
            url: `${API}/locationsearch?latitude=${latitude}&longitude=${longitude}&miledistance=${distance}`,
            headers: {
                "Authorization": auth
            }
        })
            .then(result => {
                if (result.data.msg.toLowerCase() == "success") {
                    setUsers(result.data.data)
                }
            })
            .catch(err => {
                console.log(err);
                alert("put the distance greater than zero")

            })
        }
    }
    ///
    return (

        <>
            <div className='App'>
                <div className="auth-form-container">
                    <form className="login-form" onSubmit={handleFilter}>
                        <label htmlFor="title">Distance</label>
                        <input value={distance} onChange={(e) => setdistance(e.target.value)} type="text" placeholder="put the distance" id="distance" name="distance" />
                        <br/>
                        <button type="submit">fiter data</button>
                    </form>
                    <br />
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                        <TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
                            <Table stickyHeader aria-label="sticky table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Body</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Created_by</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Action</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                        .map((row) => (
                                            <TableRow
                                                key={row._id}
                                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    {row.body}
                                                </TableCell>
                                                <TableCell align="center">{row.title}</TableCell>
                                                <TableCell align="center">{row.created_by}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center">
                                                {row.created_by == username? 
                                                <>
                                                    <Button variant="contained" onClick={() => handleClick(row)}>Update</Button>
                                                    <Button variant="contained" onClick={() => handleClickdelete(row)}>Delete</Button>
                                                </>
                                                    : null }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 100]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </Paper>
                </div>
            </div>
        </>

    )
}

export default Viewdata