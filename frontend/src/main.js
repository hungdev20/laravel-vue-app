import { createApp } from "vue";
import App from "./layouts/App.vue";
import store from "./store";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSortUp, faSortDown, faXmark, faFilter);

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store);
app.use(router);
app.mount("#app");
