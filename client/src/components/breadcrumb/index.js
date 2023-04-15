import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = props => {
    const { header, options } = props;
    return (
        <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-9">
                <h2>{header}</h2>
                <ol className="breadcrumb">
                    {options.map((item, index) => (
                        <li className="breadcrumb-item" key={index}>
                            {item.link ?
                                <Link to={item.link}>{item.title}</Link>
                                :
                                item.title
                            }
                        </li>
                    ))}
                    <li className="breadcrumb-item active">
                        <strong>{header}</strong>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Breadcrumb;
