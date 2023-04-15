import React from "react";

const FormGroup = props => {
    const { type, colStyle, label, selectOptions, inputOptions, onChange, required } = props;
    return (
        <div className={colStyle}>
            <div className="form-group">
                <label>{label}</label>
                {type === "select" ?
                    <select className="form-control m-b">
                        {selectOptions.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                    :
                    <input
                        onChange={onChange}
                        type={inputOptions.type}
                        className="form-control"
                        placeholder={inputOptions.placeholder}
                        required={required}
                    />
                }
            </div>
        </div>
    );
}

export default FormGroup;