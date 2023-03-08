import { computed, onServerPrefetch, onMounted, unref, useSSRContext } from "vue";
import { ssrInterpolate } from "vue/server-renderer";
import { u as usePageContext } from "../../chunks/ce6aa611.js";
import { u as useTodos } from "../../chunks/a94e9af9.js";
import "pinia";
const _sfc_main = {
  __name: "todo.page",
  __ssrInlineRender: true,
  setup(__props) {
    const pageContext = usePageContext();
    const todoId = parseInt(pageContext.routeParams.todoId);
    const todosStore = useTodos();
    const todo = computed(() => todosStore.todoById(todoId));
    const loadTodo = async () => {
      await todosStore.fetchTodoById(todoId);
    };
    onServerPrefetch(loadTodo);
    onMounted(loadTodo);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><h1>To-do</h1><span>${ssrInterpolate((_a = unref(todo)) == null ? void 0 : _a.text)}</span><br><a href="/">Back</a><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/todos/todo.page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
