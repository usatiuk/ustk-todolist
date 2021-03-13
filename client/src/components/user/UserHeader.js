import React from "react";

import LogoutLink from "./LogoutLink";
import HeaderLink from "./HeaderLink";

export default function UserHeader() {
    return (
        <div id="user-header">
            <HeaderLink to="/edit" text="account" />
            <LogoutLink>logout</LogoutLink>
        </div>
    );
}
