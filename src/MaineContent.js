import React from 'react'


class MaineContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data.map(items =>
                <div key={items.id} className="card m-1" style={{width: "260px"}}>
                    <label className="containerForTree">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <img src={items.baseImage} className="card-img-top" style={{width: "250px"}} alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Код производителя:{items.partNumber}</h5>
                        <p className="card-text"><a href="#">{items.article}</a></p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            )

        }
    }

    render() {
        return (
            <div className="row">

                {this.state.data}

            </div>
        )
    }

}

export default MaineContent