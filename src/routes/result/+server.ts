import { faker } from '@faker-js/faker';
import { processUrl } from '$lib/server/processUrl.ts';

function delay(ms: number): Promise<void> {
	return new Promise((res) => setTimeout(res, ms));
}

export function GET() {
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			const send = (data: object) => {
				controller.enqueue(encoder.encode(JSON.stringify(data)));
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
