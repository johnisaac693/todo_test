import { createApp } from 'vue'
import {SnackbarService, Vue3Snackbar} from "vue3-snackbar";
import "vue3-snackbar/styles";
//import App from './App.vue'
import TodoOptionsVersion from './todo_options_ver.vue'
import TodoCSSVersion from './components/css version do not touch.vue'

const app = createApp(TodoCSSVersion);
app.use(SnackbarService);
app.component("vue3-snackbar", Vue3Snackbar);
app.mount('#app');
