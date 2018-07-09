import React from 'react';
import PropTypes from 'prop-types';

import ListActionsContainer from '../containers/ListActionsContainer';
import SelectorContainer from '../containers/SelectorContainer';

export default function Lists({ userLoaded, listsLoaded }) {
  return (
    <div id="lists-header">
      {userLoaded &&
        listsLoaded && (
          <div id="lists">
            <ListActionsContainer />
            <SelectorContainer />
          </div>
        )}
      {!userLoaded && <span className="loading">loading.</span>}
      {userLoaded && !listsLoaded && <span className="loading">loading..</span>}
    </div>
  );
}

Lists.propTypes = {
  userLoaded: PropTypes.bool.isRequired,
  listsLoaded: PropTypes.bool.isRequired,
};
