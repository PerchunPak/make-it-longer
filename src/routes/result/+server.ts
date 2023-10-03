import { faker } from "@faker-js/faker";

function delay(ms: number): Promise<void> {
	return new Promise((res) => setTimeout(res, ms));
}

export function GET() {
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			const send = (data: object) => {controller.enqueue(encoder.encode(JSON.stringify(data)))};

			for (let i = 0; i < 20; i++) {
				send({to: faker.internet.domainName(), screenshot: '/screenshot'});
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
