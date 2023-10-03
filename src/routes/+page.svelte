<script lang="ts">
	import { goto } from '$app/navigation';

	let inputValue: string;

	function redirect() {
		goto(`/result?l=${encodeURIComponent(inputValue)}`);
	}
</script>

<h1 class="text-3xl font-bold">Make it longer</h1>
<p class="mt-3">Unshorts shorten links (like bit.ly) and shows history of redirects.</p>

<div class="inline-flex items-center mt-10 w-2/5">
	<div class="form-control w-full">
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
		<label class="label">
			<span class="label-text-alt">
				Try
				<a class="link" on:click={() => (inputValue = 'https://mil.perchun.it/example')}
					>https://mil.perchun.it/example</a
				>.
			</span>
		</label>
	</div>
	<button class="btn btn-primary ml-5" disabled={inputValue === ''} on:click={redirect}>
		Unshort
	</button>
</div>
