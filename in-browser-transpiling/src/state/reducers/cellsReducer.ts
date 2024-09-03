import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[]; // Id of the cell on the page in some order, EG:[3,1,2,5,6,4,7]
  data: {
    [key: string]: Cell; // cell with the data and the id as the key.
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// What are reducers?
// When we create a state using useState, we get the state and the setState function, where we can call the useState however we like, reducers are also kind of state where the state updation logic is inside the reducer itself

const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    default:
      return state;
  }
};

export default reducer;
