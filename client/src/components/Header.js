import React from "react";
import UserHeader from "./user/UserHeader";
import Lists from "./lists/Lists";

export default function Header() {
    return (
        <div id="header">
            <UserHeader />
            <Lists />
        </div>
    );
}
