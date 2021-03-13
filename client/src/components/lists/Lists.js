import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

import ListActionsContainer from "./ListActionsContainer";
import SelectorContainer from "./SelectorContainer";

function Lists({ userLoaded, listsLoaded }) {
    return (
        <div id="lists-header">
            {userLoaded && listsLoaded && (
                <div id="lists">
                    <ListActionsContainer />
                    <SelectorContainer />
                </div>
            )}
        </div>
    );
}

Lists.propTypes = {
    userLoaded: PropTypes.bool.isRequired,
    listsLoaded: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        userLoaded: state.user.loaded,
        listsLoaded: state.lists.loaded,
    };
}

export default connect(mapStateToProps)(Lists);
