export interface ResizePanel {
  payload: {
    property: string;
    size: number;
  };
  type: "RESIZE_PANEL";
}

export const resizePanel = (property: string, size: number): ResizePanel => ({
  payload: {
    property,
    size
  },
  type: "RESIZE_PANEL"
});
