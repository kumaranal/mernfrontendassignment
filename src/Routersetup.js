
import React, { useState } from "react";
import './App.css';
import Logincomponent from "./userComponent/Logincomponent";
import Registercomponent from "./userComponent/Registercomponent"
import Homepage from "./userComponent/homepage/Homepage";
import Createpost from "./userComponent/postcomponent/Createpost";
import Viewpost from "./userComponent/postcomponent/Viewpost";
import Viewdata from "./userComponent/postcomponent/Viewdata";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useAuth } from 'react-router-dom';
import Updatepost from "./userComponent/postcomponent/Updatepost";


// const protectedRoute = (path, component) => {
//     const [isLoggedIn, setIsLoggedIn] = useAuth();

//     if (!isLoggedIn) {
//       return <Navigate to="/login" />;
//     }

//     return <Route path={path} component={component} />;
//   };
const Routersetup = () => {

    return (
        <>

            <>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route exact path='/login' element={< Logincomponent />}></Route>
                    <Route path='/register' element={< Registercomponent />}></Route>
                    {/* <Route path="*" element={<Navigate to="/login" />} /> */}
                    <Route exact path='/post' element={<Homepage />}>
                        <Route path="view" element={<Viewpost />} />
                        <Route path="" element={<Navigate to="/post/view" />} />
                        <Route path="create" element={<Createpost />} />
                        <Route path="update" element={<Updatepost />} />

                    </Route>
                </Routes>
            </>
        </>
    )
}

export default Routersetup