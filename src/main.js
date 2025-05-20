import { createApp } from 'vue'
import {SnackbarService, Vue3Snackbar} from "vue3-snackbar";
import "vue3-snackbar/styles";
//import App from './App.vue'
import TodoOptionsVersion from './todo_options_ver.vue'

const app = createApp(TodoOptionsVersion);
app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.mount('#app');
