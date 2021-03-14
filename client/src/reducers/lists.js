import {
    CHANGE_LIST,
    INVALIDATE_LISTS,
    VALIDATE_LISTS,
    REQUEST_LISTS,
    RECEIVE_LISTS,
    ADD_LIST,
    REMOVE_LIST,
    EDIT_LIST_NAME,
    START_CREATE_LIST,
    START_EDIT_LIST,
    STOP_CREATE_LIST,
    STOP_EDIT_LIST,
    REMOVE_TODO,
    ADD_TODO,
    LOGOUT,
} from "../actions/defs";

export default function lists(
    state = {
        dirty: true,
        fetching: false,
        lists: null,
        loaded: false,
        creating: false,
        list: null,
        editing: false,
    },
    action,
) {
    switch (action.type) {
        case LOGOUT:
            return {
                dirty: true,
                fetching: false,
                lists: null,
                loaded: false,
                creating: false,
                list: null,
                editing: false,
            };
        case CHANGE_LIST:
            return { ...state, list: action.list };
        case RECEIVE_LISTS: {
            const newLists = Object.values(action.lists);
            let { list } = state;
            if (newLists.length !== 0) {
                if (!newLists.some((curList) => curList.id === list)) {
                    list = newLists[0].id || null;
                }
            } else {
                list = null;
            }
            return {
                ...state,
                dirty: false,
                loaded: true,
                fetching: false,
                lists: action.lists,
                list,
            };
        }
        case START_CREATE_LIST:
            return {
                ...state,
                creating: true,
            };
        case STOP_CREATE_LIST:
            return {
                ...state,
                creating: false,
            };
        case ADD_LIST:
            return {
                ...state,
                creating: false,
                lists: { ...state.lists, [action.list.id]: action.list },
                list: action.list.id,
            };
        case REMOVE_LIST: {
            const newLists = { ...state.lists };
            delete newLists[action.list];
            const listsObjs = Object.values(newLists);
            const list = listsObjs.length
                ? listsObjs[listsObjs.length - 1].id
                : null;
            return {
                ...state,
                list,
                lists: newLists,
            };
        }
        case START_EDIT_LIST: {
            return {
                ...state,
                editing: true,
            };
        }
        case STOP_EDIT_LIST: {
            return {
                ...state,
                editing: false,
            };
        }
        case EDIT_LIST_NAME: {
            return {
                ...state,
                editing: false,
                lists: {
                    ...state.lists,
                    [action.list]: {
                        ...state.lists[action.list],
                        name: action.name,
                    },
                },
            };
        }
        case REMOVE_TODO: {
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [state.list]: {
                        ...state.lists[state.list],
                        todos: state.lists[state.list].todos.filter(
                            (todo) => todo !== action.id,
                        ),
                    },
                },
            };
        }
        case ADD_TODO: {
            return {
                ...state,
                lists: {
                    ...state.lists,
                    [state.list]: {
                        ...state.lists[state.list],
                        todos: [
                            action.todo.id,
                            ...state.lists[state.list].todos,
                        ],
                    },
                },
            };
        }
        case INVALIDATE_LISTS:
            return {
                ...state,
                dirty: true,
            };
        case VALIDATE_LISTS:
            return {
                ...state,
                dirty: false,
            };
        case REQUEST_LISTS:
            return {
                ...state,
                fetching: true,
            };
        default:
            return state;
    }
}
