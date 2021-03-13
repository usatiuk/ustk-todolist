import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    RECIEVE_TODOS,
    REQUEST_TODOS,
    INVALIDATE_TODOS,
    VALIDATE_TODOS,
    EDIT_TODO,
    REMOVE_LIST,
    LOGOUT,
} from "../actions/defs";

export default function todos(
    state = {
        dirty: true,
        fetching: false,
        todos: null,
    },
    action,
) {
    switch (action.type) {
        case LOGOUT:
            return {
                dirty: true,
                fetching: false,
                todos: null,
            };
        case RECIEVE_TODOS:
            return {
                ...state,
                dirty: false,
                fetching: false,
                todos: action.todos,
            };
        case ADD_TODO:
            return {
                ...state,
                todos: { [action.todo.id]: action.todo, ...state.todos },
            };
        case INVALIDATE_TODOS:
            return {
                ...state,
                dirty: true,
            };
        case VALIDATE_TODOS:
            return {
                ...state,
                dirty: false,
            };
        case EDIT_TODO:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.id]: {
                        ...state.todos[action.id],
                        text: action.text,
                    },
                },
            };
        case REQUEST_TODOS:
            return {
                ...state,
                fetching: true,
            };
        case REMOVE_TODO: {
            const newTodos = { ...state.todos };
            delete newTodos[action.id];
            return {
                ...state,
                todos: newTodos,
            };
        }
        case REMOVE_LIST: {
            const newTodos = { ...state.todos };
            Object.keys(newTodos).forEach((todoId) => {
                if (newTodos[todoId].list === action.list) {
                    delete newTodos[todoId];
                }
            });
            return {
                ...state,
                todos: newTodos,
            };
        }
        case TOGGLE_TODO: {
            return {
                ...state,
                todos: {
                    ...state.todos,
                    [action.id]: {
                        ...state.todos[action.id],
                        completed: !state.todos[action.id].completed,
                    },
                },
            };
        }
        default:
            return state;
    }
}
