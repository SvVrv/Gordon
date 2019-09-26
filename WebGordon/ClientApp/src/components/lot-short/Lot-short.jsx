import React from 'react'
import './Lot-short.css'

const LotShort = () => {
    return (
        <div className="lot-short container-fluid">
            <div className="row border rounded">
                <div className=" img-thumb col-2">
                    <img className="img-thumbnail" src="https://cdn.auth0.com/blog/react-js/react.png" alt="lot" />
                </div>
                <div className="col-10">
                    <div className="lot-header bg-light">
                        <b>Дрова дубові</b>
                    </div>
                    <p>Продам дрова дубові сирі не рубані, самовивоз, дорого</p>
                    <div>
                        Ціна: 100 грн
                    </div>
                    <div className="lot-footer bg-light">
                        Ставок: 5 остання ставка дата закінчення
                    </div>
                </div>
            </div>
        </div >
        )
}

export default LotShort