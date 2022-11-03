import React, { children } from "react";
import Menu from './Menu';


const Base = ({
    title="MY title",
    description="MY description",
    className="  text-dark p-2 " ,
    children 
}) => {
    return(
        <div>  
            {/*       */}
            <div className="container-fluid mt-3"  >
                <div className="jumbotron  text-center " style={{ color: "#534340" }}>
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description} </p>
                </div>
               <div className={className}>{children}</div>
            </div>
            {/* <footer className="footer bg-white mt-auto py-3">
                <div className="container-fluid bg-success text-dark text-center py-3">
                    <h4>IF you got any questions free to reach out</h4>
                    <button className="btn btn-warning btn-lg">Contact US</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An Amazing <span className="text-dark">MERN</span> BOOT CAMP
                    </span>
                </div>
            </footer> */}
        </div>
    )
}

export default Base;