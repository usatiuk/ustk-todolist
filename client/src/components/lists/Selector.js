import React from "react";
import PropTypes from "prop-types";
import { Select, MenuItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";

import ListInput from "./ListInput";
import "./Selector.css";

const icon = {
    fontSize: 24,
};

export default function Selector({
    lists,
    list,
    onChange,
    editing,
    creating,
    addList,
    editList,
}) {
    if (creating) {
        return (
            <ListInput onClick={addList}>
                <AddIcon style={icon} />
            </ListInput>
        );
    }
    if (editing) {
        return (
            <ListInput onClick={editList} defaultValue={lists.lists[list].name}>
                <CheckIcon style={icon} />
            </ListInput>
        );
    }
    if (list) {
        return (
            <div id="listselector">
                <Select
                    style={{ fontSize: "1.5rem", width: "100%", height: 40 }}
                    value={list}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {Object.values(lists.lists).map((elem) => (
                        <MenuItem key={elem.id} value={elem.id}>
                            {elem.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    }
    return null;
}

Selector.defaultProps = {
    list: "",
};

Selector.propTypes = {
    list: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    creating: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    editList: PropTypes.func.isRequired,
    addList: PropTypes.func.isRequired,
    lists: PropTypes.object.isRequired,
};
