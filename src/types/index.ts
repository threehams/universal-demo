export type Page = "Home" | "About" | "Entity";

export interface State {
  page: PageState;
}

export type PageState = Page;
