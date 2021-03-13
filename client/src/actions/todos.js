import {
    REQUEST_TODOS,
    RECIEVE_TODOS,
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    EDIT_TODO,
    INVALIDATE_LISTS,
} from "./defs";

import { API_ROOT, getToken, mongoObjectId } from "./util";

export function fetchTodos() {
    return async (dispatch) => {
        dispatch({ type: REQUEST_TODOS });
        const response = await fetch(`${API_ROOT}/todos`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const json = await response.json();
        const todos = json.data;
        dispatch({ type: RECIEVE_TODOS, todos });
    };
}

export function addTodo(text) {
    return async (dispatch, getState) => {
        const state = getState();
        const { list } = state.lists;
        const id = mongoObjectId();
        if (list) {
            dispatch({
                type: ADD_TODO,
                todo: {
                    text,
                    id,
                    completed: false,
                },
                meta: {
                    offline: {
                        effect: {
                            url: `${API_ROOT}/lists/${list}/todos`,
                            body: JSON.stringify({ text, id }),
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                "content-type": "application/json",
                            },
                            method: "POST",
                        },
                        rollback: {
                            type: INVALIDATE_LISTS,
                        },
                    },
                },
            });
        }
    };
}

export function removeTodo(id) {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_TODO,
            id,
            meta: {
                offline: {
                    effect: {
                        url: `${API_ROOT}/todos/${id}`,
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            "content-type": "application/json",
                        },
                        method: "DELETE",
                    },
                    rollback: {
                        type: INVALIDATE_LISTS,
                    },
                },
            },
        });
    };
}

export function toggleTodo(id) {
    return async (dispatch, getState) => {
        const state = getState();
        const todoObj = state.todos.todos[id];
        const completed = !todoObj.completed;
        dispatch({
            type: TOGGLE_TODO,
            id,
            meta: {
                offline: {
                    effect: {
                        url: `${API_ROOT}/todos/${id}`,
                        body: JSON.stringify({ completed }),
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            "content-type": "application/json",
                        },
                        method: "PATCH",
                    },
                    rollback: {
                        type: INVALIDATE_LISTS,
                    },
                },
            },
        });
    };
}

export function editTodo(id, text) {
    return async (dispatch) => {
        dispatch({
            type: EDIT_TODO,
            id,
            text,
            meta: {
                offline: {
                    effect: {
                        url: `${API_ROOT}/todos/${id}`,
                        body: JSON.stringify({ text }),
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            "content-type": "application/json",
                        },
                        method: "PATCH",
                    },
                    rollback: {
                        type: INVALIDATE_LISTS,
                    },
                },
            },
        });
    };
}
