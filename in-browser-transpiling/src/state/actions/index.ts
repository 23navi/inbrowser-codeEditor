import type { CellType } from "../cell";
import { ActionType } from "../action-types";

interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellType;
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string; // The Id
}

export type Action =
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | MoveCellAction;
