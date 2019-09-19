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

class App extends React.Component {
    constructor(props) {
        super(props)
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
            cart:[],

        }

        this.aletAppPost = this.aletAppPost.bind(this);
        this.handleClickCarrentPage = this.handleClickCarrentPage.bind(this);
        this.filterUpDate = this.filterUpDate.bind(this);
        this.handleOnFilter = this.handleOnFilter.bind(this);
        this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
        this.handleClickLogoHeader = this.handleClickLogoHeader.bind(this);
        this.handleClickItems = this.handleClickItems.bind(this);
        this.clearCart = this.clearCart.bind(this);

    }
    clearCart = ()=>{
             this.setState({cart:[]}) 
    }
    handleClickItems = (e)=>{
        const {value,checked} = e.target;
        const  copyCart = this.state.cart;
        checked
        ? this.setState({cart:[...copyCart,value]})
        : this.setState({cart:[...copyCart.filter(val=> val!=value)]}) 
    }
    handleClickLogoHeader = () => {
        let {currentPage, pageSize, filterFlag} = this.state;
        fetch(`http://localhost:8080/api/categories/${filterFlag}/products?page=1&size=${pageSize}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            return response.json();
        })
            .then(result => {
                this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.page.totalPages,
                        currentPage: result.page.number + 1,
                    }
                )
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            });
    }
    getFetch = () => {
        let {currentPage, pageSize, filterFlag} = this.state;
        fetch(`http://localhost:8080/api/categories/${filterFlag}/products?page=${currentPage}&size=${pageSize}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            return response.json();
        })
            .then(result => {
                this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.page.totalPages,
                        currentPage: result.page.number + 1,
                    }
                )
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            });
    }
    handleClickCarrentPage = (v) => {
        let {val, changeState} = v;
        let {currentPage, pageSize, filterFlag, totalPages, filterToUrl} = this.state;
        val = currentPage + val >= 1 && currentPage + val <= totalPages ? val : 0;
        fetch(`http://localhost:8080/api/categories/${filterFlag}/products?page=${currentPage + val}&size=${pageSize}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterToUrl),
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.setState({
                    prod_data: result.content,
                    isLoadingProd: false,
                    totalPages: result.page.totalPages,
                    currentPage: (changeState ? currentPage + val : currentPage)
                })
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            })
    }
    handleDeleteFilter = () => {
        this.getFetch();
        this.setState({
            arrayFilter: [],
            filterToUrl: {},
        })
    };

    handleOnFilter = () => {

        let {currentPage, pageSize, filterFlag, filterToUrl} = this.state;
        if (JSON.stringify(filterToUrl) === JSON.stringify({})) {
            alert("Фильтр пуст")
        } else {
            fetch(`http://localhost:8080/api/categories/${filterFlag}/products?page=1&size=${pageSize}`, {
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
                    this.setState({
                            prod_data: result.content,
                            isLoadingProd: false,
                            totalPages: result.page.totalPages,
                            currentPage: result.page.number + 1,
                        }
                    )

                })
                .catch(error => {
                    console.log("MyErrorInFetch : " + error)
                });
        }
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
        if (!chek) {
            copyFilterToUrl[cat] = copyFilterToUrl[cat].filter(v => v !== val);
            copyArrayFilter = copyArrayFilter.filter(v => v !== val);
            this.setState({
                filterToUrl: copyFilterToUrl,
                arrayFilter: copyArrayFilter
            })

        }

    }

    aletAppPost(id, chek) {
        let {pageSize} = this.state;
        if (chek) {
            fetch(`http://localhost:8080/api/categories/${id}/products?page=1&size=${pageSize}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }).then(response => {

                return response.json();
            })
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
                .catch(error => {
                    console.log("MyErrorInFetch tree : " + error)
                });
            fetch(`http://localhost:8080/api/filter/${id}`)
                .then(response => {
                    return response.json();
                })
                .then(result => {

                    this.setState({
                        filter: result.attributes,
                        isLoadingFilter: false,
                        filterToUrl: {},
                    })
                })
                .catch(error => {
                    console.log("aletAppPost error : " + error)
                    this.setState({
                        filter: [],
                        isLoadingFilter: true,
                        filterToUrl: {},
                    })
                })

        } else if (!chek) {

            fetch(`http://localhost:8080/api/categories/0/products?page=1&size=${pageSize}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }).then(response => {
                return response.json();
            })
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
                .catch(error => {
                    console.log("MaletAppPost else if error : " + error)
                });
        }
    }

//-----------get request from api Content House-----------------------
    componentDidMount() {
        const {pageSize, filterFlag} = this.state;
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
            });
        //------End load tree data---------------------------------------
        fetch(`http://localhost:8080/api/categories/${filterFlag}/products?page=1&size=${pageSize}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).then(response => {
            return response.json();
        })
            .then(result => {
                this.setState({
                        prod_data: result.content,
                        isLoadingProd: false,
                        totalPages: result.page.totalPages,
                        currentPage: result.page.number + 1,
                    }
                )
            })
            .catch(error => {
                console.log("MyErrorInFetch : " + error)
            });
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
                    <Route path="/lk" render={(props)=>(<PrivateArea cart={this.state.cart} handleClickItems={this.handleClickItems} />)}/>
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
                                     aletAppPost={this.aletAppPost}
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