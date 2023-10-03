<script lang="ts">
	import { onMount } from 'svelte';

	const result: { redirects: string[] } = { redirects: [] };

	async function subscribe() {
    const response = await fetch('/result');
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      result.redirects.push(value)
	    result.redirects = result.redirects
    }
	}

	onMount(subscribe);
</script>

<div class="w-2/3">
	<p class="text-lg pb-3">Redirects history:</p>
	<div class="join join-vertical w-full bg-base-200">
		{#each result.redirects as redirect (redirect)}
			<div class="collapse collapse-arrow join-item border border-base-300">
				<input type="radio" name="my-accordion-4" />
				<div class="collapse-title font-medium">
					{redirect}
				</div>
				<div class="collapse-content">
					<div class="mockup-browser border bg-base-300">
						<div class="mockup-browser-toolbar">
							<div class="input">{redirect}</div>
						</div>
						<div class="flex justify-center p-2 border-t border-base-300">
							<img src="/screenshot" alt="Screenshot of the page" />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
