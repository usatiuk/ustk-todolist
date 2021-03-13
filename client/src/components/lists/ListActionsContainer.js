import { connect } from "react-redux";
import ListActions from "./ListActions";
import {
    startCreateList,
    startEditList,
    removeList,
    stopCreateList,
    stopEditList,
} from "../../actions/lists";

function mapStateToProps(state) {
    return {
        list: state.lists.list,
        creating: state.lists.creating,
        editing: state.lists.editing,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        startCreateList: () => dispatch(startCreateList()),
        startEditList: () => dispatch(startEditList()),
        stopCreateList: () => dispatch(stopCreateList()),
        stopEditList: () => dispatch(stopEditList()),
        removeList: () => dispatch(removeList()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListActions);
