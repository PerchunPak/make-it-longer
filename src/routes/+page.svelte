<script lang="ts">
	import { goto } from '$app/navigation';

	let inputValue: string;

	function redirect() {
		goto(`/result?l=${encodeURIComponent(inputValue)}`);
	}
</script>

<h1 class="text-3xl font-bold">Make it longer</h1>
<p class="mt-3 text-center">Unshorts shorten links (like bit.ly) and shows history of redirects.</p>

<div class="inline-flex items-center mt-10 w-full sm:w-2/3 xl:w-2/5">
	<div class="form-control w-full">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text">URL to unshort</span>
		</label>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			class="input input-bordered"
			autofocus
			bind:value={inputValue}
			on:submit|preventDefault={redirect}
			on:keypress={(e) => e.key === 'Enter' && inputValue !== '' && redirect()}
		/>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
			<span class="label-text-alt">
				Try
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span
					class="link"
					role="button"
					tabindex="0"
					on:click={() => (inputValue = 'https://s.perchun.it/mil-example')}
					>https://s.perchun.it/mil-example</span
				>.
			</span>
		</label>
	</div>
	<button class="btn btn-primary ml-5" disabled={inputValue === ''} on:click={redirect}>
		Unshort
	</button>
</div>
