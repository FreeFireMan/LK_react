import React from 'react'
import {Link} from 'react-router-dom'
import CardHolder from "./CardHolder";

class MaineContent extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            prod_data : [],
            isLoadingProd : true,
        }
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/shortproducts/25")
            .then(response => {

                return response.json();
            })
            .then(result => {
                this.setState({
                    prod_data : result,
                    isLoadingProd : false,
                })

            })
            .catch(error => {
                console.log("MyErrorInFetch tree : "+error)
            })
    }

    render() {
        let {filterFlag} = this.props;

        let items = this.state.prod_data.filter( it =>(it));
        items.sort((a,b)=>{ //sort by lastUpdated
            if (a.lastUpdated <b.lastUpdated){
                return 1;
            }
            if (a.lastUpdated > b.lastUpdated){
                return -1;
            }
            return 0;
        })

        let filterItems = items.filter(({categoryId}) =>(
            filterFlag.includes(categoryId.toString())
        ))
        const itemsToIterate = filterFlag.length ? filterItems : items

        console.log("maine item",filterItems);


        return (
            <div className="row">
                {

                    itemsToIterate.map( items =>
                        <CardHolder key={items.id} items={items}/>)
                }
            </div>
        )
    }

}

export default MaineContent