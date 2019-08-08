import React from 'react'

function Value (props){
    let str = null;
    str = props.data.map((item)=>
        item.value
    ).join("/");

    return (
        <div className="col-md-6">
            {str} {props.unit ? props.unit+"." : null}
        </div>
    )
}
export default Value