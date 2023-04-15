import React from "react";

const Card = props => {
    const { cardCol, cardStyle, cardBody } = props;
    return (
        <div className={cardCol}>
            <div className={cardStyle}>
                <div className="p-m">
                    <h1 className="m-xs">{cardBody.amount}</h1>

                    <h3 className="font-bold no-margins">{cardBody.Header}</h3>
                    <small>{cardBody.text}</small>
                </div>
                <div className="flot-chart">
                    <div className="flot-chart-content" id="flot-chart1"></div>
                </div>
            </div>
        </div>
    );
}

export default Card;