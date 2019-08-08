import React from 'react'
import Value from './Value'

function Attributes (props){
    return (
        <div>
            {
                props.data.map((item)=>
                    <div id={item.id} key={item.id} className="bottom row">
                        <div className="col-md-6">{item.name}</div>
                        <Value data={item.values} unit={item.unit}/>
                    </div>
                )
            }
        </div>
    )
}
export default Attributes