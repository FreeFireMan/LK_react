import React from 'react'

class Project extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isRenewCatalog : true,
            onRenewCatalog: false,
        }
    }
    renewCatalog=()=>{
        this.setState({
            onRenewCatalog: true,
            isRenewCatalog : true,
        })
        fetch(`http://localhost:8080/api/catalog/renew`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    isRenewCatalog : false,
                    onRenewCatalog: true
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            })
    }
    render() {
        return(
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Обновление {this.state.onRenewCatalog ? "в процессе" : "не запущенно"}</label>
                <div className="col-sm-9">

                </div>
                <button type="button" className="btn btn-primary" onClick={this.renewCatalog}>Обновить каталог</button>
            </div>

        )
    }
}
export default Project