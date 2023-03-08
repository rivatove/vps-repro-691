import { onServerPrefetch, onMounted, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { defineStore, storeToRefs } from "pinia";
import { u as useTodos } from "../chunks/a94e9af9.js";
const useCounter = defineStore("counter", {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  }
});
const _sfc_main = {
  __name: "index.page",
  __ssrInlineRender: true,
  setup(__props) {
    const counterStore = useCounter();
    const { count } = storeToRefs(counterStore);
    const todosStore = useTodos();
    const { todoList } = storeToRefs(todosStore);
    const loadTodos = async () => {
      await todosStore.fetchTodoList();
    };
    onServerPrefetch(loadTodos);
    onMounted(loadTodos);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>Pinia Example</h1><span>Counter that keeps its state on navigation</span>: <button type="button">Counter ${ssrInterpolate(unref(count))}</button><h2>To-do List</h2><ul><!--[-->`);
      ssrRenderList(unref(todoList), (item) => {
        _push(`<li><a${ssrRenderAttr("href", `/todos/${item.id}`)}>${ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
