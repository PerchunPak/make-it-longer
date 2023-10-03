<script>
	import '../app.css';
	import { fade } from 'svelte/transition';

	export let data;
</script>

{#key data.pathname}
	<main
		class="flex flex-col items-center justify-center m-0 p-5 w-full min-h-screen"
		in:fade={{ duration: 300, delay: 400 }}
		out:fade={{ duration: 300 }}
	>
		<slot />
	</main>
{/key}
