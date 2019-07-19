import * as React from "react";
import * as ReactDOM from "react-dom";
import * as data from "./data/data.json";
import Table from "./components/Table";


ReactDOM.render(
    
    <Table {...data} />,
    document.getElementById("root")
);