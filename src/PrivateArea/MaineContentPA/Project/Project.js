import React from 'react'

class Project extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isRenewCatalog : true,
        }
    }
    renewCatalog=()=>{
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
                    isRenewCatalog : false
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            })
    }
    render() {
        return(
            <button type="button" className="btn btn-primary" onClick={this.renewCatalog}>Обновить каталог</button>
        )
    }
}
export default Project