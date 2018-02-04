export interface EditorAddView {
  type: "EDITOR_ADD_VIEW";
  payload: {
    id: string;
  };
}
export interface EditorHistoryClear {
  type: "EDITOR_HISTORY_CLEAR";
}
export interface EditorRemoveView {
  type: "EDITOR_REMOVE_VIEW";
  payload: {
    id: string;
  };
}
export interface EditorSetActiveView {
  type: "EDITOR_SET_ACTIVE_VIEW";
  payload: {
    id: string;
  };
}

export const setActiveView = (id: string): EditorSetActiveView => ({
  payload: {
    id
  },
  type: "EDITOR_SET_ACTIVE_VIEW"
});

export const addView = (id: string): EditorAddView => ({
  payload: {
    id
  },
  type: "EDITOR_ADD_VIEW"
});

export const removeView = (id: string): EditorRemoveView => ({
  payload: {
    id
  },
  type: "EDITOR_REMOVE_VIEW"
});

export const clear = (): EditorHistoryClear => ({
  type: "EDITOR_HISTORY_CLEAR"
});
