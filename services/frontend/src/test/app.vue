<script setup lang="ts">
import { onBeforeMount } from "vue";
import { redirectToLoginIfNecessary } from "./auth";

// import { ... } from "../index";  // Import your ui component here

onBeforeMount(async () => await redirectToLoginIfNecessary());
</script>
<template>
  <!-- Add your service ui components here -->
</template>
