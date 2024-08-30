<script lang="ts" setup>
import {Head, Link} from '@inertiajs/vue3';
import ApplicationLogo from "@/Components/ApplicationLogo.vue";

defineProps({
  canLogin: {
    type: Boolean,
  },
  canRegister: {
    type: Boolean,
  },
  laravelVersion: {
    type: String,
    required: true,
  },
  phpVersion: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <Head title="Welcome"/>
  <div class="bg-gray-50 text-black/80 full-page">
    <header className="p-4 md:p-6 lg:p-12 bg-gray-800 flex flex-col md:flex-row flex-wrap items-center justify-between">
      <ApplicationLogo class="min-h-full"/>
      <div v-if="canLogin" class="mt-8 flex flex-row">
        <Button v-if="$page.props.auth.user" class="text-3xl font-mono font-bold px-8">
          <Link
            :href="route('dashboard')"
            class=""
          >
            Dashboard
          </Link>
        </Button>
        <template v-else>
          <div class="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button class="text-3xl font-mono">
              <Link
                :href="route('login')"
                class=""
              >Login
              </Link>
            </Button>

            <Button class="text-3xl font-mono font-bold px-8">
              <Link
                v-if="canRegister"
                :href="route('register')"
                class=""
              >
                Register
              </Link>
            </Button>
          </div>
        </template>
      </div>
    </header>

    <main class="mt-8 md:mt-12 lg:mt-16">
      <div className="block flex flex-col items-center">
        <h1 className="text-primary-500">Welcome&nbsp;👋</h1>
        <h2 className="mt-4">Know<span class="text-primary-500">ii</span> is a place for your community's Knowledge,
          Ideas and Inspiration.</h2>
      </div>

      <div class="mt-16 flex flex-row justify-center text-5xl font-bold">
        Coming soon...
      </div>
    </main>
    <footer class="">
      <!-- TODO -->
    </footer>
  </div>
</template>
