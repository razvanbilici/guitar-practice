<template>
  <div class="m-0 p-0 min-h-screen bg-linear-to-b from-[#030523] to-[#030523]">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"; // <-- path must be correct



export default {
  components: {
    Navbar,
  },
};
</script>
