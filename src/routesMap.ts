export const routesMap = {
  HOME: "/",
  ABOUT: "/about",
  ENTITY: {
    path: "/entities/:slug",
    thunk: async (dispatch, getState) => {
      const { slug } = getState().location.payload;
      const data = await fetch(`/api/entity/${slug}`);
      const entity = await data.json();
      const action = { type: "ENTITY_FOUND", payload: { entity } }; // you handle this action type

      dispatch(action);
    },
  },
};
