import React from "react";

function TextFieldComponent({style , onChangeHandler, ...props}){
    return (
        <input 
            type="text"
            onChange={onChangeHandler}
            placeholder="Your Name"
            maxLength={50}
            required
            className="text-feild"
            style={style}
        />
    )
}

export default TextFieldComponent;