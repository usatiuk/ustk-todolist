import { SET_VISIBILITY_FILTER } from "./defs";

export default function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter };
}
