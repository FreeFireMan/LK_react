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
            tree_data: {},
            isLoadingTree : true,
          /*  prod_data : [],
            isLoadingProd : true,*/
            filterFlag: [],
        }
        this.aletAppPost = this.aletAppPost.bind(this)


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
        fetch("http://localhost:8080/api/catalog/")
            .then(response => {

                return response.json();
            })
            .then(result => {
                //console.log(result.children)
                this.setState({
                    tree_data : result,
                    isLoadingTree : false,
                   /* prod_data : result.children.map(item =>{
                        return item.products
                    }),
                    isLoadingProd : false,*/

                })
            })
            .catch(error => {
                console.log("MyErrorInFetch tree : "+error)
            })
        //------End load tree data---------------------------------------



    }

//------------------------------------------------------------------------
    render() {

        return (

            <div id="wrapper" className="container">

                <Header/>
                <Switch>
                    <Route exact path="/:number" component={Product}/>

                    <Route path="/" render={(props) => (
                        <Catalog {...props} data={this.state} aletAppPost = {this.aletAppPost}/>
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