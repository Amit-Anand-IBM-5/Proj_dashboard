const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.DASHBOARD_PORT || 80;

// Parse environment variables for apps
function getAppConfig() {
    const config = {};
    Object.keys(process.env).forEach(key => {
        if (key.startsWith('APP') && key !== 'APP') {
            const value = process.env[key];
            // Check if value contains GROUP___NAME___URL format
            const parts = value.split('___');
            
            if (parts.length === 3) {
                // New format: GROUP___NAME___URL
                config[key] = {
                    group: parts[0].trim(),
                    name: parts[1].trim(),
                    url: parts[2].trim()
                };
            } else if (parts.length === 2) {
                // Old format: NAME___URL
                config[key] = {
                    group: 'Other',
                    name: parts[0].trim(),
                    url: parts[1].trim()
                };
            } else {
                // Fallback to simple URL
                config[key] = {
                    group: 'Other',
                    name: key,
                    url: value
                };
            }
        }
    });
    return config;
}

// Main route - inject app configuration
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    const appConfig = getAppConfig();
    const configScript = `
    <script>
        window.APP_CONFIG = ${JSON.stringify(appConfig)};
    </script>
    `;
    
    // Inject config before closing head tag
    html = html.replace('</head>', `${configScript}</head>`);
    
    res.send(html);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dashboard server running on port ${PORT}`);
    console.log('Configured applications:');
    const config = getAppConfig();
    Object.entries(config).forEach(([key, app]) => {
        console.log(`  ${key}: [${app.group}] ${app.name} - ${app.url}`);
    });
});
