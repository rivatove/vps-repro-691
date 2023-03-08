import { inject } from "vue";
const key = Symbol();
function usePageContext() {
  const pageContext = inject(key);
  return pageContext;
}
function setPageContext(app, pageContext) {
  app.provide(key, pageContext);
}
export {
  setPageContext as s,
  usePageContext as u
};
