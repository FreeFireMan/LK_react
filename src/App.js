import Header from './Header'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from "./SideBar";
import MaineContent from "./MainContent/MaineContent";
import Catalog from "./Сatalog";
import Product from "./Product/Product";


class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            tree_data: {},
            isLoadingTree : true,
             prod_data : [],
             isLoadingProd : true,
        }
    }
//-----------get request from api Content House-----------------------
    componentDidMount() {
        fetch("http://localhost:8080/api/catalog/")
            .then(response => {

                return response.json();
            })
            .then(result => {
                //console.log(result.children)
                this.setState({
                    tree_data : result,
                    isLoadingTree : false,
                    prod_data : result.children.map(item =>{
                        return item.children
                    }),
                    isLoadingProd : false,

                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : "+error)
            })
        //------End load tree data---------------------------------------


    }

//------------------------------------------------------------------------
    render() {
        const {tree_data,prod_data,isLoadingTree,isLoadingProd} = this.state;

        //console.log(poducts)
    return (

        <div id="wrapper" className="container">

            <Header/>
            <Product idProd={170207143605005} />
          {/*  <Catalog tree_data={tree_data} prod_data={prod_data} isLoadingTree={isLoadingTree} isLoadingProd={isLoadingProd}/>*/}
            <div id="footer">
                <div className="footer-top row">
                    <div className="menu-footer col-sm-6 col-md-3">
                        <div className="well">3<br/>.menu-footer</div>
                    </div>
                    <div className="menu-footer col-sm-6 col-md-3">
                        <div className="well">3<br/>.menu-footer</div>
                    </div>
                    <div className="menu-footer col-sm-6 col-md-3">
                        <div className="well">3<br/>.menu-footer</div>
                    </div>
                    <div className="menu-footer col-sm-6 col-md-3">
                        <div className="well">3<br/>.menu-footer</div>
                    </div>
                </div>
                <div className="footer-bottom row">
                    <div className="copyrights col-sm-6 col-md-6">
                        <div className="well">6<br/>.copyrights</div>
                    </div>
                    <div className="copyrights col-sm-6 col-md-6">
                        <div className="well">6<br/>.copyrights</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default App;
