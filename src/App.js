import Header from './Header/Header'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from "./Catalog/SideBar";
import MaineContent from "./Catalog/MainContent/MaineContent";
import Catalog from "./Catalog/Сatalog";
import Product from "./Product/Product";
import { BrowserRouter, Route,Link,Switch} from "react-router-dom";


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
        this.aletAppPost = this.aletAppPost.bind(this)
        this.handleClickCarrentPage = this.handleClickCarrentPage.bind(this)
    }
    handleClickCarrentPage  =(val) =>{
        console.log(val)
        fetch(`http://localhost:8080/api/page?page=${this.state.currentPage+val}&size=${this.state.pageSize}`)
            .then(response => {
                console.log("fetch worked")
                return response.json();
            })
            .then(result => {
                console.log(result.content)
                this.setState({
                    prod_data : result.content,
                    currentPage : (this.state.currentPage+val)
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : "+error)
            })

        console.log("state",this.state.currentPage)
        console.log("state",this.state.isLoadingProd)
    }
        aletAppPost(id,chek){
        let ids = this.state.filterFlag;

        console.log("state befor chench id : "+this.state.filterFlag)
        console.log("aletAppPost id : "+id+"chek : "+chek)
        if (chek){
            !ids.includes(id) &&
            this.setState(({filterFlag}) =>{
                return  {filterFlag :[...filterFlag,id]}
            })
        } else if (!chek){
            ids.includes(id) &&
            this.setState(({filterFlag}) =>{
                return  {filterFlag : filterFlag.filter(t => (
                        t !== id
                    ))}
            })
        }
    }
//-----------get request from api Content House-----------------------
    componentDidMount() {
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
        fetch(`http://localhost:8080/api/page?page=${this.state.currentPage}&size=${this.state.pageSize}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result.content)
                this.setState({
                    prod_data : result.content,
                    isLoadingProd : false,
                    totalPages : result.totalPages
                })
                console.log(this.state.prod_data)

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
                <Switch>
                    <Route exact path="/:number" component={Product}/>

                    <Route path="/" render={(props) => (
                        <Catalog {...props} data={this.state} aletAppPost = {this.aletAppPost} handleClickCarrentPage={this.handleClickCarrentPage}/>
                    )}/>
                    {/* <Catalog tree_data={tree_data} prod_data={prod_data} isLoadingTree={isLoadingTree} isLoadingProd={isLoadingProd}/>*/}
                </Switch>
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