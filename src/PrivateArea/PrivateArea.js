import React, {Component} from 'react'

class PrivateArea extends Component {
    constructor(props) {
        super(props);

       console.log("props in privateArea : ",props)
    }
    render() {
        return(
            <div>
              <h1>Hello Lk</h1>
            </div>
        )
    }
}
export default PrivateArea