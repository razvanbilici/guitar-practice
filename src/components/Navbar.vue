<template>
  <nav class="flex items-center h-[10vh] max-w-full 
              bg-linear-to-r from-gray-700 via-purple-800 to-gray-400 
              rounded-b shadow-2xl px-4 text-[clamp(3rem,8vh,5rem)] overflow-hidden"> 
                   
    <RouterLink to="/" class="font-pcb ml-3 text-red-800 
                hover:text-red-600 transition-all duration-200 
                hover:scale-110 cursor-pointer text-outline">
      Logo
    </RouterLink>

    <div class="flex flex-1 justify-end space-x-[4vw] text-outline font-pcb 
                 text-white">
      <RouterLink to="/songs" class="hover:scale-110 transition-transform cursor-pointer">Songs</RouterLink>
      <RouterLink to="/theory" class="hover:scale-110 transition-transform cursor-pointer">Theory</RouterLink>
      <RouterLink to="/progress" class="hover:scale-110 transition-transform cursor-pointer">Progress</RouterLink>
    </div>
  </nav>
</template>

<script>

</script>