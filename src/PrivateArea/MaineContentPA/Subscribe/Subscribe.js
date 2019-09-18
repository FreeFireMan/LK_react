import React from 'react'

function Subscribe({subscribe,toggleSubscribe,toggleSubscribeItems}) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Код События</th>
                <th scope="col">Описание события</th>
                <th scope="col">Подписаться</th>
            </tr>
            </thead>
            <tbody>
            {
                subscribe.map(item=>
                    (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.code}</td>
                            <td>{item.description}</td>
                            <td>
                                <label className="containerForTree">
                                    <input type="checkbox" value={item.id} onChange={toggleSubscribeItems} checked={toggleSubscribe.includes(item.id.toString())}/>
                                    <span className="checkmark"  ></span>
                                </label>
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    )
}

export default Subscribe