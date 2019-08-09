import React from 'react'
import {Link} from 'react-router-dom'

class MaineContent extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
          data: props.data

        }
    }


    render() {
        return (
            <div className="row">
                {this.state.data.map( item => item && item.map( items =>
                    <div key={items.id} className="card m-1 p-1" style={{width: "260px"}}>
                        <label className="containerForTree">
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                        </label>
                        <img src={items.baseImage} className="card-img-top" style={{width: "250px"}} alt="..."/>
                        <div className="card-body">
                            <h6 className="card-title">Код производителя: {items.partNumber}</h6>
                            <p className="card-text"><Link to={'/'+items.id}>{items.article}</Link></p>
                           {/* <a href={items.id} className="btn btn-primary">Go somewhere</a>*/}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}

export default MaineContent