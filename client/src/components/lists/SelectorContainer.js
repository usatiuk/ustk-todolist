import { connect } from "react-redux";
import Selector from "./Selector";
import { changeList, addList, editList } from "../../actions/lists";

function mapStateToProps(state) {
    return {
        lists: state.lists,
        list: state.lists.list,
        editing: state.lists.editing,
        creating: state.lists.creating,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (list) => dispatch(changeList(list)),
        addList: (name) => dispatch(addList(name)),
        editList: (name) => dispatch(editList(name)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
