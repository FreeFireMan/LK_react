import React from 'react'
import Attributes from './Attributes'

function PropBlock(props) {
    return(
        <div className="bottom row">
            {
                props.data.map((item) =>
                    <div id={item.id} key={item.id} className="col-md-12" >
                        <div className="" style={{background:"#cccccc"}} >{item.name}
                        </div>
                        <Attributes data={item.attributes}/>

                    </div>)
            }
        </div>
        )
}

export default PropBlock