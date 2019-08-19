import React from 'react'
import {Link} from 'react-router-dom'
import CardHolder from "./CardHolder";
import Pagination from "./Pagination";

class MaineContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickCarrentPageMC = this.handleClickCarrentPageMC.bind(this)

    }
    handleClickCarrentPageMC=(val)=>{
        this.props.handleClickCarrentPageC(val)
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
        return (
            <div>
            <div >
                {
                   !this.state.isLoadingProd && <Pagination {...this.state} handleClickCarrentPage={this.handleClickCarrentPageMC}  />
                }
            </div>
            <div className="row">
                {

                    itemsToIterate.map( items =>
                        <CardHolder key={items.id} items={items}/>)
                }
            </div>
            </div>
        )
    }

}

export default MaineContent