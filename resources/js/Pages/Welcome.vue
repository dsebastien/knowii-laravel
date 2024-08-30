<script lang="ts" setup>
import {Head, Link} from '@inertiajs/vue3';
import Rating from "primevue/rating";

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
  <Head title="Knowii - Welcome"/>
  <div class="bg-gray-50 text-black/50">
    <header class="">
      <nav v-if="canLogin" class="-mx-3 flex flex-1 justify-end">
        <Link
          v-if="$page.props.auth.user"
          :href="route('dashboard')"
          class=""
        >
          Dashboard
        </Link>

        <template v-else>
          <Link
            :href="route('login')"
            class=""
          >
            Log in
          </Link>

          <Link
            v-if="canRegister"
            :href="route('register')"
            class=""
          >
            Register
          </Link>
        </template>
      </nav>
    </header>

    <main class="mt-6">
      Content
      <Rating></Rating>
    </main>

    <footer class="">
      Footer
    </footer>
  </div>
</template>
