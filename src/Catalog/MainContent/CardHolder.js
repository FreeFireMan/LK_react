import React, {Component} from 'react'
import {Link} from "react-router-dom";

class CardHolder extends Component {
    constructor(props){

        super(props)
    }
    render() {
        return(
            <div key={this.props.items.id} className="card m-1 p-1" style={{width: "260px"}}>
                <label className="containerForTree">
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
                <Link to={'/'+this.props.items.id}><img src={this.props.items.baseImage} className="card-img-top" style={{width: "250px"}} alt="..."/></Link>
                <div className="card-body">
                    <h6 className="card-title">Код производителя: {this.props.items.partNumber}</h6>
                    <p className="card-text"><Link to={'/'+this.props.items.id}>{this.props.items.article}</Link></p>
                    {/* <a href={items.id} className="btn btn-primary">Go somewhere</a>*/}
                </div>
            </div>
        )
    }
}
export default CardHolder