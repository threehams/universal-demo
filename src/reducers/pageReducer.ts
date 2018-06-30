const PAGES = {
  HOME: "Home",
  ABOUT: "About",
  NOT_FOUND: "NotFound",
};

export const pageReducer = (state = PAGES.NOT_FOUND, action) => {
  return PAGES[action.type] || PAGES.NOT_FOUND;
};
