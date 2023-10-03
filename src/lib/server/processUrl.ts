import puppeteer from 'puppeteer';

export async function processUrl(
	url: string,
	send: (event: { to: string; screenshot: string }) => void
): Promise<void> {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();
	await page.setViewport({ width: 1024, height: 576 });

	const client = await page.target().createCDPSession();
	await client.send('Network.enable');
	client.on('Network.requestWillBeSent', async (e) => {
		if (e.type !== 'Document') {
			return;
		}
		const screenshot = await page.screenshot();
		send({ to: e.documentURL, screenshot: screenshot.toString('base64') });
	});

	await page.goto(url, { waitUntil: 'networkidle2' });
	await browser.close();
}
