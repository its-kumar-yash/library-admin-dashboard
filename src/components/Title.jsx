import React from "react";
import { Link } from "react-router-dom";

const Title = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><h2>Book Records Dashboard</h2></Link>
            </div>
        </nav>
    );
}

export default Title;