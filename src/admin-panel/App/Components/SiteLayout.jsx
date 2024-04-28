import React from "react";
import { Navbar } from "./Navbar";

function AdminLayout(props) {
  return <Navbar>{props.children}</Navbar>;
}

export { AdminLayout };
