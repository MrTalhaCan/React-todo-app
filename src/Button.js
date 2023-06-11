import { useState } from "react";

export default function Button({isVisible}){
    const [mynumber, setMyNumber]   =   useState(0);
    const numberInc    =  () => setMyNumber(prev => prev+1);
    const numberDec    =  () => setMyNumber(prev => (prev>0) ? prev - 1 : prev = prev);
    return (
        <>
            {isVisible &&<div>
                <button onClick={numberInc}>Click me+</button>
                <button onClick={numberDec}>Click me-</button>
                <div>{mynumber}</div>
            </div>}
        </>
    );
}