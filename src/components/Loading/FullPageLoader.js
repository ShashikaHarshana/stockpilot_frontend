import React from "react";
import Loading1 from "./Loading1";

const FullPageLoader = () => {
    return (
        <div data-testid='loader' style={{display: 'flex',  justifyContent: 'center',  alignItems: 'center', height: '80vh'}}>
            <Loading1 />
        </div>
    )
}

export default FullPageLoader