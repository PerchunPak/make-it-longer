import { processUrl } from '$lib/server/processUrl.ts';

function validateUrl(url: string | null): boolean {
	if (url === null) return false;

	try {
		new URL(url);
	} catch (_) {
		return false;
	}
	return true;
}

export function GET(event) {
	const url = event.url.searchParams.get('l');
	if (!validateUrl(url)) {
		return new Response('Invalid URL (must be provided and be parsable)', { status: 400 });
	}

	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			const send = (data: string) => {
				controller.enqueue(encoder.encode(data));
			};

			await processUrl(url, send);

			controller.close();
		}
	});

	return new Response(readable, {
		headers: {
			'content-type': 'text/event-stream'
		}
	});
}
