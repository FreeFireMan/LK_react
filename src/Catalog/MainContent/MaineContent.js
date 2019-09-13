import React from 'react'
import CardHolder from "./CardHolder";

class MaineContent extends React.Component {

    render() {
        return (
            <div id="MaineContent" className="d-flex align-content-stretch flex-wrap">
                {
                    this.props.data.prod_data.map( items =>
                        <CardHolder key={items.id} items={items}/>)
                }
            </div>
        )
    }

}

export default MaineContent