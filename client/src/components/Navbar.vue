<template>
  <nav id="nav"
      class="relative flex items-center h-[10vh] max-w-full 
      bg-blue-950/10
      rounded-b shadow-2xl px-4 text-[7vh] overflow-hidden text-yellow-500 border-b-[0.1px]"> 
                   
    <RouterLink id="logo"
                to="/" class="font-pcb ml-3 text-red-800 
                hover:text-red-600 transition-all duration-200 
                hover:scale-110 cursor-pointer text-outline">
      Logo
    </RouterLink>
    <div class="absolute inset-0 flex justify-center items-center pointer-events-none">
  <input class="text-yellow-500 text-[4vh] border-2 rounded-3xl px-3 pointer-events-auto">
</div>

    <div id="nav-links" class="flex flex-1 justify-end space-x-[4vw] text-outline font-pcb">
      <RouterLink to="/practice" class="hover:scale-110 transition-transform hover:text-yellow-600 cursor-pointer ">Practice</RouterLink>

      <RouterLink to="/theory" class="hover:scale-110 hover:text-yellow-600 transition-transform cursor-pointer">Theory</RouterLink>

      <RouterLink to="/progress" class="hover:scale-110 transition-transform cursor-pointer hover:text-yellow-600">Progress</RouterLink>
    </div>
    
  </nav>
</template>

<script>

</script>