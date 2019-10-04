import Header from './Header/Header'
import React from 'react';
import './App.css';
import Catalog from "./Catalog/Сatalog";
import Product from "./Product/Product";
import Pagination from "./Pagination/Pagination";
import Filter from "./Filter/Filter";
import {Route, Switch} from "react-router-dom";
import Footer from "./Footer/Footer";
import PrivateArea from "./PrivateArea/PrivateArea";
import Agreement from "./Agreement/Agreement";
import 'react-image-lightbox/style.css';
import GetData from './service/GetData'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prod_data: [],
            isLoadingProd: true,
            tree_data: {},
            isLoadingTree: true,
            filterFlag: 0,
            pageSize: 21,
            totalPages: 0,
            currentPage: 1,
            filter: [],
            isLoadingFilter: true,
            //    currentFilter: ["Возраст от", "Возраст до", "Launch Date", "Пол ребенка", "Content status", "Product Category", "Количество деталей"], // for lego
            currentFilter: ["Диагональ экрана", "Тип экрана", "Цвет корпуса"], //for tpv
            arrayFilter: [], //храню чекнутые параметры в фильтре
            filterToUrl: {},
            cart: [],

        }

        this.selectedCategory = this.selectedCategory.bind(this);
        this.handleClickCarrentPage = this.handleClickCarrentPage.bind(this);
        this.filterUpDate = this.filterUpDate.bind(this);
        this.handleOnFilter = this.handleOnFilter.bind(this);
        this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
        this.handleClickLogoHeader = this.handleClickLogoHeader.bind(this);
        this.handleClickItems = this.handleClickItems.bind(this);
        this.clearCart = this.clearCart.bind(this);

    }

    clearCart = () => {
        this.setState({cart: []})
    }

    handleClickItems = (event) => {
        const {value, checked} = event.target;
        const copyCart = this.state.cart;
        checked
            ? this.setState({cart: [...copyCart, value]})
            : this.setState({cart: [...copyCart.filter(val => val != value)]})
    }
    handleClickLogoHeader = () => {
        const {currentPage, pageSize, filterFlag} = this.state;
        GetData.getFirtsPageOfProduct(filterFlag, pageSize, currentPage)
            .then(result => {
                this.setState({
                    prod_data: result.content,
                    isLoadingProd: false,
                    totalPages: result.page.totalPages,
                    currentPage: result.page.number + 1,
                })
            })
            .catch(error => console.log("handleClickLogoHeader : ",error));
    };
    handleClickCarrentPage = (obj) => {
        let {val, changeState} = obj;
        const {currentPage, pageSize, filterFlag, totalPages, filterToUrl} = this.state;
        val =
            currentPage + val >= 1 && currentPage + val <= totalPages
            ? val
            : 0;
        GetData.getFirtsPageOfProduct(filterFlag, pageSize, (currentPage + val), filterToUrl)
            .then(result => {
                this.setState({
                    prod_data: result.content,
                    isLoadingProd: false,
                    totalPages: result.page.totalPages,
                    currentPage: (changeState ? currentPage + val : currentPage)
                })
            })
            .catch(error => console.log("handleClickCarrentPage : ",error))
    }
    handleDeleteFilter = () => {
        const {currentPage, pageSize, filterFlag} = this.state;
        GetData.getFirtsPageOfProduct(filterFlag, pageSize, currentPage)
            .then(result => {
                this.setState({
                    prod_data: result.content,
                    isLoadingProd: false,
                    totalPages: result.page.totalPages,
                    currentPage: result.page.number + 1,
                    arrayFilter: [],
                    filterToUrl: {},
                })
            })
            .catch(error => console.log("handleDeleteFilter : ",error));
    };

    handleOnFilter = () => {

        let {pageSize, filterFlag, filterToUrl} = this.state;
        if (JSON.stringify(filterToUrl) === JSON.stringify({})) {
            alert("Фильтр пуст")
        } else {
            GetData.getFirtsPageOfProduct(filterFlag, pageSize, 1, filterToUrl)
                .then(result => {
                    this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.page.totalPages,
                        currentPage: result.page.number + 1,
                    })
                })
                .catch(error =>
                    console.log("handleOnFilter : ",error));
        }
    };
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
        if (!chek) {
            copyFilterToUrl[cat] = copyFilterToUrl[cat].filter(v => v !== val);
            copyArrayFilter = copyArrayFilter.filter(v => v !== val);
            this.setState({
                filterToUrl: copyFilterToUrl,
                arrayFilter: copyArrayFilter
            })

        }
    }

    selectedCategory(id, chek) {
        let {pageSize} = this.state;
        if (chek) {
            GetData.getFirtsPageOfProduct(id, pageSize, 1)
                .then(result => {

                    this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.page.totalPages,
                        currentPage: 1,
                        filterFlag: id,
                        filterToUrl: {},
                        arrayFilter: []
                    })
                })
                .catch(error =>
                    console.log("selectedCategory error : ",error));
            GetData.getFilter(id) //получаем фильтра на категории
                .then(result => {
                    this.setState({
                        filter: result.attributes,
                        isLoadingFilter: false,
                        filterToUrl: {},
                    })
                })
                .catch(error => {
                    console.log("getFilter error : ",error)
                    this.setState({
                        filter: [],
                        isLoadingFilter: true,
                        filterToUrl: {},
                    })
                })

        } else if (!chek) {
            GetData.getFirtsPageOfProduct(0, pageSize, 1)
                .then(result => {
                    this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.page.totalPages,
                        currentPage: 1,
                        filterFlag: 0,
                        isLoadingFilter: true
                    })
                })
                .catch(error => console.log("unChek selectedCategory error : ",error));
        }
    }

//-----------get request from api Content House-----------------------
    componentDidMount() {
        const {pageSize, filterFlag} = this.state;
        GetData.getCatalog()
            .then(result => {
                this.setState({
                    tree_data: result,
                    isLoadingTree: false,
                })
            })
            .catch(error => console.log("getEndPoint catalog : ",error));
        //------End load tree data---------------------------------------
        GetData.getFirtsPageOfProduct(filterFlag, pageSize, 1)
            .then(result => {
                this.setState({
                    prod_data: result.content,
                    isLoadingProd: false,
                    totalPages: result.page.totalPages,
                    currentPage: result.page.number + 1,
                })
            })
            .catch(error => console.log("getPageOfProduct : ",error));
    }

//------------------------------------------------------------------------
    render() {
        return (
            <div id="wrapper" className="container">
                <Header
                    handleClickLogoHeader={this.handleClickLogoHeader}
                    clearCart={this.clearCart}
                    cart={this.state.cart}/>

                <Switch>
                    <Route path="/lk" render={(props) => (
                        <PrivateArea cart={this.state.cart} handleClickItems={this.handleClickItems}/>)}/>
                    <Route path="/agreement" component={Agreement}/>
                    <Route exact path="/:number" component={Product}/>
                    <Route path="/" render={(props) => (
                        <div>
                            {
                                !this.state.isLoadingFilter && <Filter data={this.state.filter}
                                                                       currentFilter={this.state.currentFilter}
                                                                       arrayFilter={this.state.arrayFilter}
                                                                       filterUpDate={this.filterUpDate}
                                                                       handleOnFilter={this.handleOnFilter}
                                                                       handleDeleteFilter={this.handleDeleteFilter}
                                />
                            }
                            <Catalog {...props}
                                     data={this.state}
                                     selectedCategory={this.selectedCategory}
                                     handleClickCarrentPage={this.handleClickCarrentPage}
                                     handleClickItems={this.handleClickItems}
                            />
                            <div className="d-flex justify-content-center mr-1">
                                {
                                    !this.state.isLoadingProd &&
                                    <Pagination {...this.state} handleClickCarrentPage={this.handleClickCarrentPage}/>
                                }
                            </div>

                        </div>
                    )}/>
                </Switch>
                <div id="footer">

                    <Footer/>
                </div>
            </div>);
    }
}

export default App;