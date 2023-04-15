import React from "react";


const IBox = props => {
    const { children, title, header } = props;
    return (
        <div className="ibox">
            <div className="ibox-title">{title}</div>
            <div className="ibox-content">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="mb-3">{header}</h3>
                        {children}
                    </div>
                </div>
            </div >
        </div >
    );
};

export default IBox;
