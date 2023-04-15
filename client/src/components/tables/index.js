import React from "react";
import IBox from './../ibox/index';

const Datatable = props => {
    const { tableHeader, data, tableName } = props;
    return (
        <div className="row mt-3 pb-5">
            <div className="col-lg-12">
                <IBox title={tableName}>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {tableHeader.map((item, index) => (
                                        <th key={index} colSpan={item.col}>{item.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {tableHeader.map((headValue, el) => (
                                            <td key={el}>{headValue.type === Number ? "#" : ""}{item[headValue.identifier]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </IBox>
            </div>
        </div>
    );
}

export default Datatable;