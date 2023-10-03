import { faker } from "@faker-js/faker";

function delay(ms: number): Promise<void> {
	return new Promise((res) => setTimeout(res, ms));
}

export function GET() {
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			for (let i = 0; i < 20; i++) {
				controller.enqueue(encoder.encode(faker.internet.domainName()));
				await delay(1000)
			}
			controller.close()
		},
		cancel() {}
	});

	return new Response(readable, {
		headers: {
			'content-type': 'text/event-stream',
		}
	});
}
