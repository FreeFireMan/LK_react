import Header from './Header/Header'
import React from 'react';
import './App.css';
import Catalog from "./Catalog/Сatalog";
import Product from "./Product/Product";
import Pagination from "./Pagination";
import Filter from "./Filter/Filter";
import {Route, Switch} from "react-router-dom";

class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            prod_data : [],
            isLoadingProd : true,
            tree_data: {},
            isLoadingTree : true,
            filterFlag: [],
            pageSize : 21,
            totalPages: 0,
            currentPage : 1
        }
        this.aletAppPost = this.aletAppPost.bind(this);
        this.handleClickCarrentPage = this.handleClickCarrentPage.bind(this)
    }
    handleClickCarrentPage  =(v) =>{
        let {val,changeState} = v;
        let {currentPage,pageSize,filterFlag,totalPages} = this.state;
        val = currentPage+val >= 1 && currentPage+val <= totalPages ? val:0;

        fetch(`http://localhost:8080/api/page?page=${currentPage+val}&size=${pageSize}&cat=${filterFlag}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    prod_data : result.content,
                    currentPage : (changeState?currentPage+val:currentPage)
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch : "+error)
            })
    }
        aletAppPost(id,chek){
        let {filterFlag,pageSize} = this.state;
        if (chek){
            !filterFlag.includes(id) &&
            fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=${[...filterFlag,id]}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        prod_data : result.content,
                        isLoadingProd : false,
                        totalPages : result.totalPages,
                        currentPage : 1,
                        filterFlag :[...filterFlag,id]
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : "+error)
                });
        } else if (!chek){
            let newfilterFlag = filterFlag.filter(t => (
                t !== id
            ))
            filterFlag.includes(id)  &&
             fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=${newfilterFlag}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        prod_data : result.content,
                        isLoadingProd : false,
                        totalPages : result.totalPages,
                        currentPage : 1,
                        filterFlag : newfilterFlag
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : "+error)
                });
        }

    }
//-----------get request from api Content House-----------------------
    componentDidMount() {
        const {filterFlag,pageSize} = this.state;
        fetch("http://localhost:8080/api/catalog")
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    tree_data : result,
                    isLoadingTree : false,
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : "+error)
            })
        //------End load tree data---------------------------------------
        fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=${filterFlag}`)
            .then(response => {
                return response.json();
            })
            .then(result => {

                this.setState({
                    prod_data : result.content,
                    isLoadingProd : false,
                    totalPages : result.totalPages
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : "+error)
            })
    }
//------------------------------------------------------------------------
    render() {
        return (
            <div id="wrapper" className="container">
                <Header/>
                <Filter/>
                <Switch>
                    <Route exact path="/:number" component={Product}/>
                    <Route path="/" render={(props) => (
                        <Catalog {...props} data={this.state} aletAppPost = {this.aletAppPost} handleClickCarrentPage={this.handleClickCarrentPage}/>
                    )}/>
                    {/* <Catalog tree_data={tree_data} prod_data={prod_data} isLoadingTree={isLoadingTree} isLoadingProd={isLoadingProd}/>*/}
                </Switch>
                <div id="footer">
                    <div className="d-flex justify-content-center mr-1" >
                        {
                            !this.state.isLoadingProd && <Pagination {...this.state} handleClickCarrentPage={this.handleClickCarrentPage}  />
                        }
                    </div>

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