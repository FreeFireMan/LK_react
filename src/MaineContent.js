import React from 'react'


class MaineContent extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            data: this.props.data.map(item => item.map( items =>
                <div key={items.id} className="card m-1 p-1" style={{width: "260px"}}>
                    <label className="containerForTree">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <img src={items.baseImage} className="card-img-top" style={{width: "250px"}} alt="..."/>
                    <div className="card-body">
                        <h6 className="card-title">Код производителя: {items.partNumber}</h6>
                        <p className="card-text"><a href="#">{items.article}</a></p>
                        <a href={items.id} className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                )
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