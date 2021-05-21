import Pagination from './pagination.vue';

const components = [
  Pagination,
];

const install = (Vue) => {
  components.map(component => Vue.component(component.name, component));
};

export default {
  install,
  Pagination,
};