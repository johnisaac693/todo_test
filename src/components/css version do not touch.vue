<!--<template>-->
<!--  <div class="todo-container">-->
<!--    <h1 class="todo-title">To-Do List</h1>-->
<!--    &lt;!&ndash;Toast Message &ndash;&gt;-->
<!--    -->

<!--    &lt;!&ndash;INPUT AREA&ndash;&gt;-->
<!--    <div class="input-area">-->
<!--      <input-->
<!--          v-model="newTask"-->
<!--          @keyup.enter="addTask"-->
<!--          type="text"-->
<!--          placeholder="Add a new task"-->
<!--          class="task-input"-->
<!--      />-->
<!--      <button @click="addTask" class="add-button">Add</button>-->
<!--    </div>-->

<!--    <transition-group name="task" tag="div" class="task-list">-->
<!--      <div-->
<!--          v-for="(task, index) in tasks"-->
<!--          :key="task.id"-->
<!--          class="task-item"-->
<!--      >-->
<!--        <div class="task-text">-->
<!--          <template v-if="task.editing">-->
<!--            <input-->
<!--                v-model="task.text"-->
<!--                @keyup.enter="saveEdit(task)"-->
<!--                @blur="saveEdit(task)"-->
<!--                class="edit-input"-->
<!--            />-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <span :class="{ done: task.done }">-->
<!--              {{ task.text }}-->
<!--            </span>-->
<!--          </template>-->
<!--        </div>-->

<!--        <div class="task-controls">-->
<!--          <button @click.stop="moveTaskDown(index)" :disabled="index === tasks.length - 1" class="control-button">&#x25BC;</button>-->
<!--          <button @click.stop="moveTaskUp(index)" :disabled="index === 0" class="control-button">&#x25B2;</button>-->
<!--          <button @click.stop="toggleDone(index)" class="control-button done-button">&#x2713;</button>-->
<!--          <button @click.stop="removeTask(index)" class="control-button delete-button">&#x2715;</button>-->
<!--          <button @click.stop="editTask(task)" class="control-button edit-button">&#x270E;</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition-group>-->

<!--    <p class="task-summary">-->
<!--      Number of Tasks: {{ tasktotal }} | Completed Tasks: {{ completedCount }}-->
<!--    </p>-->

<!--    <button v-if="tasks.length > 0" @click="confirmClearAll" class="clear-button">CLEAR ALL TASKS</button>-->
<!--    <button @click="copyAllTasks" class="copy-button">Copy All Tasks</button>-->
<!--  </div>-->
<!--  <vue3-snackbar bottom :limit="1"></vue3-snackbar>-->
<!--</template>-->
<!--<style>-->
<!--.todo-container {-->
<!--  max-width: 600px;-->
<!--  margin: 2rem auto;-->
<!--  padding: 1rem;-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 10px;-->
<!--  background-color: #f9f9f9;-->
<!--  font-family: sans-serif;-->
<!--}-->

<!--.todo-title {-->
<!--  text-align: center;-->
<!--  font-size: 1.75rem;-->
<!--  font-weight: 600;-->
<!--  margin-bottom: 1rem;-->
<!--}-->

<!--.toast {-->
<!--  position: fixed;-->
<!--  top: 1rem;-->
<!--  right: 1rem;-->
<!--  background-color: black;-->
<!--  color: white;-->
<!--  padding: 0.5rem 1rem;-->
<!--  border-radius: 5px;-->
<!--  z-index: 1000;-->
<!--  animation: fade-in-out 3s ease-in-out forwards;-->
<!--}-->

<!--.input-area {-->
<!--  display: flex;-->
<!--  margin-bottom: 1rem;-->
<!--}-->

<!--.task-input {-->
<!--  flex: 1;-->
<!--  padding: 0.5rem;-->
<!--  font-size: 1rem;-->
<!--  border: 1px solid #aaa;-->
<!--  border-radius: 4px 0 0 4px;-->
<!--}-->

<!--.add-button {-->
<!--  padding: 0.5rem 1rem;-->
<!--  background-color: #007bff;-->
<!--  color: white;-->
<!--  border: 1px solid #007bff;-->
<!--  border-left: none;-->
<!--  border-radius: 0 4px 4px 0;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.add-button:hover {-->
<!--  background-color: #0056b3;-->
<!--}-->

<!--.task-list {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 0.5rem;-->
<!--}-->

<!--.task-item {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  background-color: #ddd;-->
<!--  padding: 0.5rem;-->
<!--  border-radius: 5px;-->
<!--}-->

<!--.task-item:hover {-->
<!--  background-color: #ccc;-->
<!--}-->

<!--.task-text {-->
<!--  flex: 1;-->
<!--  word-break: break-word;-->
<!--}-->

<!--.edit-input {-->
<!--  width: 100%;-->
<!--  padding: 0.25rem;-->
<!--  font-size: 0.9rem;-->
<!--  border: 1px solid #888;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.task-controls {-->
<!--  display: flex;-->
<!--  gap: 0.25rem;-->
<!--  margin-left: 0.5rem;-->
<!--}-->

<!--.control-button {-->
<!--  width: 24px;-->
<!--  height: 24px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  border: none;-->
<!--  background: none;-->
<!--  cursor: pointer;-->
<!--  font-size: 0.9rem;-->
<!--  color: #333;-->
<!--}-->

<!--.control-button:hover {-->
<!--  background-color: #e0e0e0;-->
<!--  border-radius: 3px;-->
<!--}-->

<!--.done-button {-->
<!--  color: green;-->
<!--}-->

<!--.delete-button {-->
<!--  color: red;-->
<!--}-->

<!--.edit-button {-->
<!--  color: blue;-->
<!--}-->

<!--.task-summary {-->
<!--  text-align: center;-->
<!--  background-color: #e0f7fa;-->
<!--  color: #00796b;-->
<!--  border: 1px solid #b2ebf2;-->
<!--  padding: 0.5rem;-->
<!--  border-radius: 5px;-->
<!--  margin-top: 1rem;-->
<!--}-->

<!--.clear-button,-->
<!--.copy-button {-->
<!--  display: block;-->
<!--  margin: 1rem auto 0;-->
<!--  padding: 0.5rem 1rem;-->
<!--  font-size: 1rem;-->
<!--  border-radius: 5px;-->
<!--  cursor: pointer;-->
<!--  color: white;-->
<!--  border: none;-->
<!--}-->

<!--.clear-button {-->
<!--  background-color: #e53935;-->
<!--}-->

<!--.clear-button:hover {-->
<!--  background-color: #c62828;-->
<!--}-->

<!--.copy-button {-->
<!--  background-color: #43a047;-->
<!--}-->

<!--.copy-button:hover {-->
<!--  background-color: #2e7d32;-->
<!--}-->

<!--.done {-->
<!--  text-decoration: line-through;-->
<!--  color: #888;-->
<!--}-->

<!--@keyframes fade-in-out {-->
<!--  0% { opacity: 0; }-->
<!--  10% { opacity: 1; }-->
<!--  90% { opacity: 1; }-->
<!--  100% { opacity: 0; }-->
<!--}-->

<!--.task-move {-->
<!--  transition: transform 300ms ease;-->
<!--}-->

<!--.task-enter-active,-->
<!--.task-leave-active {-->
<!--  transition: opacity 0.3s ease;-->
<!--}-->

<!--.task-enter-from,-->
<!--.task-leave-to {-->
<!--  opacity: 0;-->
<!--}-->
<!--</style>-->
<!--<script setup lang="ts">-->
<!--</script>-->