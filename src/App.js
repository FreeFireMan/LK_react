import Header from './Header/Header'
import React from 'react';
import './App.css';
import Catalog from "./Catalog/Сatalog";
import Product from "./Product/Product";
import Pagination from "./Pagination/Pagination";
import Filter from "./Filter/Filter";
import {Route, Switch} from "react-router-dom";
import Footer from "./Footer/Footer";

class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            prod_data : [],
            isLoadingProd : true,
            tree_data: {},
            isLoadingTree : true,
            filterFlag: null,
            pageSize : 21,
            totalPages: 0,
            currentPage : 1,
            filter:[],
            isLoadingfilter: true,
            currentFilter:["Возраст от","Возраст до","Launch Date","Пол ребенка","Content status","Product Category","Количество деталей","Theme"],
            filterToUrl: {ageFrom : [],ageTo:[],launchDate:[],sex:[],contentStatus:[],productCategory:[],countPieces:[]},

        }

        this.aletAppPost = this.aletAppPost.bind(this);
        this.handleClickCarrentPage = this.handleClickCarrentPage.bind(this);
        this.filterUpDate = this.filterUpDate.bind(this)

    }
    filterUpDate=(e)=>{
        console.log("filterToUrl",this.state.filterToUrl);
        const {cat,val} = e;
        let copyfilterToUrl = this.state.filterToUrl;
        console.log("Filter value1 : "+cat);
        console.log("Filter value2 : "+val);
        console.log("Filter filterToUrl : "+copyfilterToUrl);
        cat === "Возраст от" && (copyfilterToUrl.ageFrom= [...copyfilterToUrl.ageFrom,val]);
        cat === "Возраст до" && (copyfilterToUrl.ageTo= [...copyfilterToUrl.ageTo,val]);
        cat === "Launch Date" && (copyfilterToUrl.launchDate= [...copyfilterToUrl.launchDate,val]);
        cat === "Пол ребенка" && (copyfilterToUrl.sex= [...copyfilterToUrl.sex,val]);
        cat === "Content status" && (copyfilterToUrl.contentStatus= [...copyfilterToUrl.contentStatus,val]);
        cat === "Product Category" && (copyfilterToUrl.productCategory= [...copyfilterToUrl.productCategory,val]);
        cat === "Количество деталей" && (copyfilterToUrl.countPieces= [...copyfilterToUrl.countPieces,val]);
        this.setState({
            filterToUrl : copyfilterToUrl,
        })

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
                console.log(result.content);
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
        let {pageSize} = this.state;
        if (chek){
            fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=${id}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        prod_data : result.content,
                        isLoadingProd : false,
                        totalPages : result.totalPages,
                        currentPage : 1,
                        filterFlag : id
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : "+error)
                })&& fetch(`http://localhost:8080/api/test/${id}`)
                .then(response => {
                    console.log("Request to filter");
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        filter : result.attributes,
                        isLoadingfilter : false,
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : "+error)
                })

        } else if (!chek){

             fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        prod_data : result.content,
                        isLoadingProd : false,
                        totalPages : result.totalPages,
                        currentPage : 1,
                        filterFlag : null,
                        isLoadingfilter: true
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
        fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=`)
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
                {
                    !this.state.isLoadingfilter && <Filter data={this.state.filter} currentFilter={this.state.currentFilter} filterUpDate={this.filterUpDate} />
                }
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
                    <Footer/>
                </div>
            </div>);
    }
}
export default App;