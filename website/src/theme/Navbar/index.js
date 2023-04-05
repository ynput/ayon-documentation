import React from "react";
import Navbar from "@theme-original/Navbar";
import YnputNavbar from "../../components/YnputNavbar";

export default function NavbarWrapper(props) {
    return (
        <>
            <YnputNavbar />
            <Navbar {...props} />
        </>
    );
}
