<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { slide, blur } from 'svelte/transition';

	const url = $page.url.searchParams.get('l');

	const result: { redirects: string[]; screenshot?: string; areRedirectsEnded: boolean } = {
		redirects: [],
		areRedirectsEnded: false
	};

	if (url !== null) {
		onMount(async () => {
			const response = await fetch(`/result?l=${encodeURIComponent(url)}`);
			const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				if (value.startsWith('data:image/png;base64,')) result.areRedirectsEnded = true;
				if (result.areRedirectsEnded)
					result.screenshot = `${result.screenshot !== undefined ? result.screenshot : ''}${value}`;
				else {
					result.redirects.push(value);
					result.redirects = result.redirects;
				}
			}
		});
	}
</script>

<div class="w-2/3">
	{#if url !== null}
		<div class="grid grid-cols-2">
			<div>
				<p class="text-lg py-3">Redirects history:</p>
				<ol class="list-disc">
					{#each result.redirects as redirectedTo}
						<li class="ml-4" transition:slide>
							<a href={redirectedTo} class="link link-primary">{redirectedTo}</a>
						</li>
					{/each}
				</ol>
				{#if !result.areRedirectsEnded}
					<div class="flex mt-5">
						<span class="loading loading-spinner loading-lg m-auto" transition:slide />
					</div>
				{/if}
			</div>
			<div>
				<p class="text-lg py-3">Screenshot of the destination:</p>
				<div class="flex h-full">
					{#if result.screenshot === undefined}
						<span class="loading loading-spinner loading-lg m-auto" />
					{:else}
						<img
							src={result.screenshot}
							class="m-auto"
							alt="Screenshot of the destination"
							transition:blur
						/>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="flex">
			<h1 class="text-xl pb-3 m-auto">
				No URL was specified, please return to <a href="/" class="link link-primary"
					>the main page</a
				> and enter a link.
			</h1>
		</div>
	{/if}
</div>
