<template>
  <nav class="relative flex items-center h-[76px] px-8 bg-[#111113]"
       style="box-shadow: 0 1px 0 rgba(251,191,36,0.15), 0 2px 12px rgba(0,0,0,0.6);">

    <div class="absolute bottom-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />

    <!-- Logo -->
    <RouterLink
      to="/"
      class="font-pcb text-[22px] tracking-widest uppercase text-amber-400 select-none transition-all duration-200"
      style="text-shadow: 0 0 18px rgba(251,191,36,0.45), 0 0 4px rgba(251,191,36,0.2);"
    >
      Logo
    </RouterLink>

    <!-- Search bar -->
    <div class="absolute inset-0 flex justify-center items-center pointer-events-none">
      <div class="pointer-events-auto relative flex items-center">
        <!-- magnifier icon -->
        <svg class="absolute left-3 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          class="w-[260px] pl-9 pr-4 py-1.5 text-xs text-white/70 tracking-wide
                 bg-white/4 border border-white/[0.07] rounded-sm
                 placeholder:text-white/20
                 focus:outline-none focus:border-amber-400/35 focus:bg-white/6
                 transition-all duration-200"
          placeholder="Search songs, scales…"
        />
      </div>
    </div>

    <!-- Nav links -->
    <div class="flex flex-1 justify-end items-center gap-9">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link relative text-xs font-semibold tracking-[0.12em] uppercase text-white/35
               hover:text-amber-300 transition-colors duration-200 pb-[2px]"
        active-class="nav-link--active text-amber-400"
      >
        {{ link.label }}
      </RouterLink>
    </div>

  </nav>
</template>

<script setup>
const links = [
  { to: '/practice', label: 'Practice' },
  { to: '/theory',   label: 'Theory'   },
  { to: '/progress', label: 'Progress' },
]
</script>

<style scoped>
/* Animated pip under the active nav link */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 1.5px;
  background: #fbbf24;
  border-radius: 1px;
  transition: transform 0.2s ease;
  box-shadow: 0 0 6px rgba(251,191,36,0.6);
}
.nav-link:hover::after,
.nav-link--active::after {
  transform: translateX(-50%) scaleX(1);
}
</style>