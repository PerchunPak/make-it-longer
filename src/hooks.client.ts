import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://5342a8d00e7f666a3f975b8674b42de3@o4504254006689792.ingest.sentry.io/4505988593549312',
	tracesSampleRate: 1.0
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
