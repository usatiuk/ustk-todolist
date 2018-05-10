import { ADD_ITEM, REMOVE_ITEM, TOGGLE_ITEM } from "../actions";

export default function items(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 100),
          text: action.text,
          completed: false
        }
      ];
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.id);
    case TOGGLE_ITEM: {
      const itemsArray = [...state];
      itemsArray.some((item, i) => {
        if (item.id === action.id) {
          const newItem = { ...item };
          newItem.completed = !item.completed;
          itemsArray[i] = newItem;
          return true;
        }
        return false;
      });
      return itemsArray;
    }
    default:
      return state;
  }
}
