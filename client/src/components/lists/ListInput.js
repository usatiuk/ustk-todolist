import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";

const button = {
    width: 36,
    height: 36,
};

export default function ListInput({ onClick, children, defaultValue }) {
    let input;
    return (
        <div id="listselector" className="list--input">
            <input
                ref={(node) => {
                    input = node;
                }}
                defaultValue={defaultValue}
                style={{ height: 40 }}
                id="input"
                type="text"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        onClick(input.value);
                    }
                }}
            />
            <IconButton
                style={button}
                type="submit"
                onClick={() => input.value.trim() && onClick(input.value)}
            >
                {children}
            </IconButton>
        </div>
    );
}

ListInput.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    defaultValue: PropTypes.string,
};
