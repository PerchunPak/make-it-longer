import puppeteer from 'puppeteer';

export async function processUrl(url: string, send: (event: string) => void): Promise<void> {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();
	await page.setViewport({ width: 1024, height: 576 });

	const client = await page.target().createCDPSession();
	await client.send('Network.enable');
	client.on('Network.requestWillBeSent', async (e) => {
		if (e.type !== 'Document') {
			return;
		}
		send(e.documentURL);
	});

	await page.goto(url, { waitUntil: 'networkidle2' });

	const screenshot = await page.screenshot({
		fullPage: true,
		encoding: 'base64',
		type: 'webp',
		quality: 80
	});
	send(`data:image/png;base64,${screenshot}`);

	await browser.close();
}
