import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { FiHome, FiFileText, FiTrello,FiBookOpen,FiCalendar,FiFile} from "react-icons/fi";
import { FaUserCircle,FaSchool,FaChild,FaBoxes} from 'react-icons/fa';
import {  BiFemale ,BiCheckbox                            } from 'react-icons/bi'
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

const Header = () => {
    const [strUseApp, setUseApp] = useState("Home");

    return (
        <>
            <div id="header">
                <ProSidebar collapsed={false}>
                    <SidebarHeader>
                        <div className="row m-0 p-0">
                            <div className="col-md-4 m-0 p-0 text-dark fw-bold text-center h3 mt-2 mb-2"><FaSchool /></div>
                            <div className="col-md-8 m-0 p-0 text-dark fw-bold mt-2 mb-2"><span style={{ fontSize: "24px", marginTop: "10vh" }}> School Management System </span></div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={strUseApp === "Home" ? true : false} icon={<FiHome />} onClick={() => setUseApp("Home")}>
                                Home
                                <Link to="/" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Student" ? true : false} icon={<FaChild />} onClick={() => setUseApp("Student")}>
                                Student
                                <Link to="/student" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Subject" ? true : false} icon={<FiBookOpen />} onClick={() => setUseApp("Subject")}>
                                Subject
                                <Link to="/subject" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Staff" ? true : false} icon={<BiFemale />} onClick={() => setUseApp("Staff")}>
                                Staff
                                <Link to="/staff" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Exam" ? true : false} icon={<FiFileText />} onClick={() => setUseApp("Exam")}>
                                Exam
                                <Link to="/exams" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Finance" ? true : false} icon={<FiTrello />} onClick={() => setUseApp("Finance")}>
                                Finance
                                <Link to="/finances" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Attendance" ? true : false} icon={<FiCalendar />} onClick={() => setUseApp("Attendance")}>
                                Attendance
                                <Link to="/attendance" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Assets" ? true : false} icon={<FaBoxes />} onClick={() => setUseApp("Assets")}>
                                Assets
                                <Link to="/assets" />
                            </MenuItem>
                            <MenuItem active={strUseApp === "Notice" ? true : false} icon={<FiFile />} onClick={() => setUseApp("Notice")}>
                                Notice
                                <Link to="/notice" />
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaUserCircle />}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default Header;