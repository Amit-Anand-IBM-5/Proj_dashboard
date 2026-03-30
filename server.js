const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.DASHBOARD_PORT || 80;

// Parse environment variables for apps
function getAppConfig() {
    const config = {};
    Object.keys(process.env).forEach(key => {
        if (key.startsWith('APP')) {
            config[key] = process.env[key];
        }
    });
    return config;
}

// Serve static files
app.use(express.static('.'));

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
    Object.entries(config).forEach(([name, url]) => {
        console.log(`  ${name}: ${url}`);
    });
});

// Made with Bob
