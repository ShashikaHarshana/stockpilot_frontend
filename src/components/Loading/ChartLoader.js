import React from "react";
import Loading1 from "./Loading1";

const ChartLoader = () => {
    return (
        <div data-testid='chartLoader' style={{display: 'flex',  justifyContent: 'center',  alignItems: 'center', width:'70vw'}}>
            <center>
                <Loading1/>
            </center>
        </div>
    )
}

export default ChartLoader