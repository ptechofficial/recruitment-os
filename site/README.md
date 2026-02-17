# Recruitment OS - Site

This directory contains the web application files.

See the [main README](../README.md) for full project documentation.

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page (conversion-focused, single CTA) |
| `landing.css` | Landing page styles |
| `landing.js` | Landing page interactions (scroll, FAQ, animations) |
| `dashboard.html` | Interactive dashboard demo |
| `app.js` | Dashboard logic (Chart.js, Google Sheets, n8n webhooks) |
| `styles.css` | Dashboard styles |

## Run Locally

```bash
python3 -m http.server 8080
```

- Landing page: `http://localhost:8080`
- Dashboard: `http://localhost:8080/dashboard.html`

## Configuration

Update `app.js` CONFIG object with your webhook and Google Sheet URLs:

```javascript
const CONFIG = {
    webhookUrl: 'YOUR_N8N_WEBHOOK_URL',
    googleSheetUrl: 'YOUR_GOOGLE_SHEET_CSV_URL',
    emailWebhookUrl: 'YOUR_OUTREACH_WEBHOOK_URL',
    refreshInterval: 30000
};
```

## Security Note

Ensure your n8n webhook endpoints are configured to allow CORS requests from the domain where this dashboard is hosted.
