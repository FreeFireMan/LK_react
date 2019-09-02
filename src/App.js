import Header from './Header/Header'
import React from 'react';
import './App.css';
import Catalog from "./Catalog/Сatalog";
import Product from "./Product/Product";
import Pagination from "./Pagination/Pagination";
import Filter from "./Filter/Filter";
import {Route, Switch} from "react-router-dom";
import Footer from "./Footer/Footer";
import queryString from 'query-string'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prod_data: [],
            isLoadingProd: true,
            tree_data: {},
            isLoadingTree: true,
            filterFlag: null,
            pageSize: 21,
            totalPages: 0,
            currentPage: 1,
            filter: [],
            isLoadingfilter: true,
            currentFilter: ["Возраст от", "Возраст до", "Launch Date", "Пол ребенка", "Content status", "Product Category", "Количество деталей", "Theme"],
            arrayFilter: [], //храню чекнутые параметры в фильтре
            filterToUrl: {},

        }

        this.aletAppPost = this.aletAppPost.bind(this);
        this.handleClickCarrentPage = this.handleClickCarrentPage.bind(this);
        this.filterUpDate = this.filterUpDate.bind(this);
        this.handleOnFilter = this.handleOnFilter.bind(this);
        this.handleDeleteFilter = this.handleDeleteFilter.bind(this);

    }

    handleDeleteFilter = () => {
        this.setState({
            arrayFilter: [],
            filterToUrl: {},
        })
    };
    handleOnFilter = () => {

        let {currentPage, pageSize, filterFlag, filterToUrl} = this.state;

        JSON.stringify(filterToUrl) === JSON.stringify({}) ? alert("Фильтр пуст") :
            filterToUrl.category = filterFlag &&
                console.log("filterToUrl ", JSON.stringify(filterToUrl)) &&
                fetch('http://localhost:8080/api/test', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filterToUrl),
                }).then(response => {
                    return response.json();
                })
                    .then(result => {
                        console.log("result", result);
                    })
                    .catch(error => {
                        console.log("MyErrorInFetch : " + error)
                    });

    }

    filterUpDate = (e, chek) => {
        const {cat, val} = e;
        let copyFilterToUrl = this.state.filterToUrl;
        let copyArrayFilter = this.state.arrayFilter;
        if (chek) {
            copyFilterToUrl.hasOwnProperty(cat) ? copyFilterToUrl[cat] = [...copyFilterToUrl[cat], val] : copyFilterToUrl[cat] = [val];
            this.setState({
                filterToUrl: copyFilterToUrl,
                arrayFilter: [...copyArrayFilter, val]
            })
        }
        if(!chek){
            copyFilterToUrl[cat] = copyFilterToUrl[cat].filter( v=> v!== val);
            copyArrayFilter = copyArrayFilter.filter( v=> v!== val);
            this.setState({
                filterToUrl: copyFilterToUrl,
                arrayFilter: copyArrayFilter
            })

        }

    }
    handleClickCarrentPage = (v) => {
        let {val, changeState} = v;
        let {currentPage, pageSize, filterFlag, totalPages} = this.state;
        val = currentPage + val >= 1 && currentPage + val <= totalPages ? val : 0;

        fetch(`http://localhost:8080/api/page?page=${currentPage + val}&size=${pageSize}&cat=${filterFlag}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result.content);
                this.setState({
                    prod_data: result.content,
                    currentPage: (changeState ? currentPage + val : currentPage)
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            })
    }

    aletAppPost(id, chek) {
        let {pageSize} = this.state;
        if (chek) {
            fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=${id}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.totalPages,
                        currentPage: 1,
                        filterFlag: id,
                        filterToUrl: {},
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : " + error)
                }) && fetch(`http://localhost:8080/api/filter/${id}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        filter: result.attributes,
                        isLoadingfilter: false,
                        filterToUrl: {},
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : " + error)
                })

        } else if (!chek) {

            fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=`)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.totalPages,
                        currentPage: 1,
                        filterFlag: null,
                        isLoadingfilter: true
                    })
                })
                .catch(error => {
                    console.log("MyErrorInFetch tree : " + error)
                });
        }

    }

//-----------get request from api Content House-----------------------
    componentDidMount() {
        const {pageSize} = this.state;
        fetch("http://localhost:8080/api/catalog")
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    tree_data: result,
                    isLoadingTree: false,
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : " + error)
            })
        //------End load tree data---------------------------------------
        fetch(`http://localhost:8080/api/page?page=1&size=${pageSize}&cat=`)
            .then(response => {
                return response.json();
            })
            .then(result => {

                this.setState({
                    prod_data: result.content,
                    isLoadingProd: false,
                    totalPages: result.totalPages
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : " + error)
            })
    }

//------------------------------------------------------------------------
    render() {
        return (
            <div id="wrapper" className="container">
                <Header/>
                {
                    !this.state.isLoadingfilter && <Filter data={this.state.filter}
                                                           currentFilter={this.state.currentFilter}
                                                           arrayFilter={this.state.arrayFilter}
                                                           filterUpDate={this.filterUpDate}
                                                           handleOnFilter={this.handleOnFilter}
                                                           handleDeleteFilter={this.handleDeleteFilter}
                    />
                }
                <Switch>
                    <Route exact path="/:number" component={Product}/>
                    <Route path="/" render={(props) => (
                        <Catalog {...props} data={this.state} aletAppPost={this.aletAppPost}
                                 handleClickCarrentPage={this.handleClickCarrentPage}/>
                    )}/>
                    {/* <Catalog tree_data={tree_data} prod_data={prod_data} isLoadingTree={isLoadingTree} isLoadingProd={isLoadingProd}/>*/}
                </Switch>
                <div id="footer">
                    <div className="d-flex justify-content-center mr-1">
                        {
                            !this.state.isLoadingProd &&
                            <Pagination {...this.state} handleClickCarrentPage={this.handleClickCarrentPage}/>
                        }
                    </div>
                    <Footer/>
                </div>
            </div>);
    }
}

export default App;