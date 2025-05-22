<template>
  <div class="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50 font-sans">
    <h1 class="text-center text-2xl font-semibold mb-4">To-Do List</h1>
    <!--Toast Message -->
    <div v-if="showToast" class="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">{{ toastMessage }}</div>

    <!--INPUT AREA-->
    <div class="flex mb-4">
      <input
          v-model="newTask"
          @keyup.enter="addTask"
          type="text"
          placeholder="Add a new task"
          class="flex-1 px-3 py-2 text-base border border-gray-400 rounded-l-md focus:outline-none"
      />
      <button
          @click="addTask"
          class="px-4 py-2 text-base bg-blue-600 text-white border border-blue-600 border-l-0 rounded-r-md hover:bg-blue-800"
      >
        Add
      </button>
    </div>

    <ul class="space-y-2">
      <li
          v-for="(task, index) in tasks"
          :key="index"
          class="cursor-pointer flex flex-wrap justify-between items-start bg-gray-200 p-2 rounded-md hover:bg-gray-300"
      >
        <div class="flex-1 break-words">
          <template v-if="task.editing">
            <input
                v-model="task.text"
                @keyup.enter="saveEdit(task)"
                @blur="saveEdit(task)"
                class="px-2 py-1 w-full text-sm border border-gray-400 rounded"
            />
          </template>
          <template v-else>
      <span :class="{ 'line-through text-gray-500': task.done }">
        {{ task.text }}
      </span>
          </template>
        </div>

        <div class="flex space-x-1 ml-2">
          <!-- Move Down -->
          <button
              @click.stop="moveTaskDown(index)"
              :disabled="index === tasks.length - 1"
              class="text-gray-600 hover:text-black w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4">
              <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Move Up -->
          <button
              @click.stop="moveTaskUp(index)"
              :disabled="index === 0"
              class="text-gray-600 hover:text-black w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4">
              <path d="M5 15l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Mark Done -->
          <button
              @click.stop="toggleDone(index)"
              class="text-green-800 hover:text-green-900 w-6 h-6 flex items-center justify-center rounded hover:bg-green-100"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4">
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Delete -->
          <button
              @click.stop="removeTask(index)"
              class="text-red-600 hover:text-red-900 w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-100 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Edit -->
          <button
              @click.stop="editTask(task)"
              class="text-blue-600 hover:text-blue-900 w-6 h-6 flex items-center justify-center rounded hover:bg-blue-100"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" stroke-width="2">
              <path d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </li>

    </ul>


    <p class="text-center text-base mt-4 p-2 bg-cyan-100 text-cyan-800 border border-cyan-200 rounded shadow-sm">
      Number of Tasks: {{ tasktotal }} | Completed Tasks: {{ completedCount }}
    </p>

    <!-- <p class="text-center text-base mt-4 p-2 bg-cyan-100 text-cyan-800 border border-cyan-200 rounded shadow-sm">-->
    <button
        v-if="tasks.length > 0"
        @click="confirmClearAll"
        class="block mx-auto mt-4 px-4 py-2 text-base bg-red-500 text-white border border-red-500 rounded hover:bg-red-700"
    >CLEAR ALL TASKS</button>

    <button
        @click="copyAllTasks"
        class="block mx-auto mt-4 px-4 py-2 text-base bg-green-500 text-white border border-green-500 rounded hover:bg-green-700"
    >
      Copy All Tasks
    </button>

  </div>
<vue3-snackbar bottom :limit = "1"></vue3-snackbar>
</template>

<script>
export default {
  name: "todo_options_ver",
  data() {
    return {
      toastMessage: '',
      showToast: false,
      newTask: '',
      tasks: (JSON.parse(localStorage.getItem("tasks")) || []).map(task => ({
        ...task,
        editing: false
      })),
    }
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      },
      deep: true
    }
  },
  methods: {
    showToastMessage(message){
      this.toastMessage = message;
      this.showToast = true;
     setTimeout(() => {
      this.showToast = false;
     }, 2000
     );
    },
    snackbarSuccessMessage(message){
      this.$snackbar.add(
          {
            type: 'success',
            text: message,
            bottom: true,
            duration: 2000,
            limit: 3
          }
      )
    },
    snackbarMessage(message, messageType){
      this.$snackbar.add(
          {
            type: messageType,
            text: message,
            bottom: true,
            duration: 2000,
          }
      )
    },
    addTask() {
      const trimmed = this.newTask.trim();
      if (trimmed === '') {
        this.snackbarMessage('Please enter a valid task', 'error');
      } else {
        this.snackbarMessage('Task Added!','success');
        this.tasks.push({text: trimmed, done: false});
        this.newTask = '';
      }
    },
    toggleDone(index) {
      this.tasks[index].done = !this.tasks[index].done;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.snackbarMessage('Task Removed!', 'success');
    },
    confirmClearAll() {
      const confirmed = window.confirm("Do you really want to clear all tasks?");
      if (confirmed) {
        this.clearAllTasks();
        this.snackbarMessage('All tasks have been deleted.', 'success');
      }
    },
    clearAllTasks() {
      this.tasks = [];
    },
    moveTaskUp(index) {
      if (index > 0) {
        const temp = this.tasks[index];
        this.tasks.splice(index, 1);
        this.tasks.splice(index - 1, 0, temp);
      }
    },

    moveTaskDown(index) {
      if (index < this.tasks.length - 1) {
          const temp = this.tasks[index];
          this.tasks.splice(index, 1);
          this.tasks.splice(index + 1, 0, temp);
        }
      },
    copyAllTasks() {
      const allTasksText = this.tasks.map(task => task.text).join('\n');
      navigator.clipboard.writeText(allTasksText).then(() => {
        this.snackbarMessage('All tasks copied to clipboard!', 'success');
      }).catch((err) => {
        console.error('Failed to copy tasks: ', err);
      });
    },
    editTask(task) {
      task.editing = true;
    },
    saveEdit(task) {
      if (task.text.trim() === "") {
        this.snackbarMessage("Task cannot be empty.", 'error');
        return;
      }
      task.text = task.text.trim();
      task.editing = false;
    }
  },


  computed: {
    tasktotal() {
      return this.tasks.length;
    },
    completedCount() {
      return this.tasks.filter((task) => task.done).length;
    }
  }
  //GIRL I SWEAR TO GOD IF THIS WORKS
}
</script>
<style>
@keyframes fade-in-out {
  0%{opacity: 0; transform: translateY(-10px);}
  10%, 90% {opacity: 1; transform: translateY(0);}
  100%{opacity: 0; transform: translateY(-10px);}
}
.animate-fade-in-out {
  animation: fade-in-out 3s ease-in-out forwards;
}
</style>