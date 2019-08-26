import React, {Component} from 'react';
import './Filter.css'

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name : "Дата запуска",
                    value: ["12/08/19", "25/03/18"]
                },
                {
                    id: 2,
                    name : "Content status" ,
                    value: ["Service Content", "Available", "Product Content"]
                },
                {
                    id: 3,
                    name : "Пол ребенка",
                    value: ["Для мальчиков", "Для девочек"]
                },
                {
                    id: 4,
                    name : "Количество деталей",
                    value: [2, 4, 10, 300, 4000]
                },
                {
                    id: 5,
                    name : "Product Category",
                    value: ["Standard Retail", "Exclusive"]
                },
                {
                    id: 6,
                    name: "Возраст (в годах)",
                    value: [1, 2, 3, 4, 16, 18, 25, 99]
                }]
        }
    }

    render() {
        const {data} = this.state;
        return (
            <div className="dropdown filter">
                {
                    data.map(el => (
                            <div className="filterCard col-sm-6 col-md-4" key={el.id}>
                                <a className="mybtn dropdown-toggle" data-toggle="dropdown">
                                    {el.name}
                                    <span className="caret"></span>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {el.value.map(it =>(
                                        <div className="form-check">
                                            <input type="radio" className="custom-control-input" id="defaultChecked"
                                                   name="defaultExampleRadios"/>
                                        <label className="dropdown-item" >{it}</label>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        )
                    )
                }

            </div>
        );
    }
}

export default Filter