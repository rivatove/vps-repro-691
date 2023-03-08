import { renderToNodeStream } from "@vue/server-renderer";
import { escapeInject } from "vite-plugin-ssr";
import { createPinia } from "pinia";
import { createSSRApp, markRaw, h, reactive } from "vue";
import { s as setPageContext } from "../chunks/ce6aa611.js";
function createApp(pageContext) {
  let rootComponent;
  const app = createSSRApp({
    data: () => ({
      Page: markRaw(pageContext.Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    render() {
      return h(this.Page, this.pageProps);
    },
    created() {
      rootComponent = this;
    }
  });
  const store = createPinia();
  app.use(store);
  Object.assign(app, {
    changePage: (pageContext2) => {
      Object.assign(pageContextReactive, pageContext2);
      rootComponent.Page = markRaw(pageContext2.Page);
      rootComponent.pageProps = markRaw(pageContext2.pageProps || {});
    }
  });
  const pageContextReactive = reactive(pageContext);
  setPageContext(app, pageContextReactive);
  return { app, store };
}
const passToClient = ["initialStoreState", "pageProps", "routeParams"];
async function render(pageContext) {
  const { stream } = pageContext;
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`;
  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true
    }
  };
}
async function onBeforeRender(pageContext) {
  const { app, store } = createApp(pageContext);
  const stream = renderToNodeStream(app);
  const initialStoreState = store.state.value;
  return {
    pageContext: {
      initialStoreState,
      stream
    }
  };
}
export {
  onBeforeRender,
  passToClient,
  render
};
