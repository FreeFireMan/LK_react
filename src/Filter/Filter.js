import React, {Component} from 'react';
import './Filter.css'

class Filter extends Component {
    handleClick = (e) => {
                 this.props.filterUpDate(e);
    }

    render() {
        const {data,currentFilter} = this.props;
        return (
            <div>
                <div className="dropdown filter">
                    {
                        Object.keys(data).map(el => (currentFilter.includes(data[el].name) &&
                                <div className="filterCard col-sm-6 col-md-4" key={el}>
                                    <a className="mybtn dropdown-toggle" data-toggle="dropdown">
                                        {data[el].name}
                                        <span className="caret"></span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {Object.keys(data[el].values).map(it => (
                                            <div className="form-check" key={it}>

                                                <label className="dropdown-item">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                                                          value={data[el].values[it].value} onChange={this.handleClick.bind(null,{cat:data[el].name,val:data[el].values[it].value})}/>
                                                    {data[el].unit.value ? data[el].values[it].value + " " + data[el].unit.value : data[el].values[it].value}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="w-100 mb-1">
                    <button type="button" className="btn btn-primary">Пременить фильтр</button>
                    <button type="button" className="btn btn-secondary">Сбросить фильтр</button>
                </div>
            </div>
        );
    }
}

export default Filter