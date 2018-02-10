export interface Ui {
  activeEditorView: string;
  activePlayerView: "inventory" | "character";
  alert: string | null;
  editorViews: string[];
  footerHeight: number;
  inventoryExpandedById: string[];
  player: string | null;
  selectedItems: string[];
  sidebarHeight: number;
  sidebarWidth: number;
  statusEffects: string[];
}
