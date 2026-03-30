# Application Dashboard

A Docker-based dashboard application that displays thumbnails and links to configured applications.

## Features

- 🎨 Beautiful, responsive dashboard interface
- 🖼️ Live thumbnail previews of applications (using iframes)
- 🔗 Click-to-redirect functionality
- ⚙️ Easy configuration via `.env` file
- 🐳 Docker Compose for simple deployment
- 🚀 Runs on port 80

## Prerequisites

- Docker
- Docker Compose

## Configuration

Edit the `docker-compose.yml` file to configure your applications. Update the `environment` section:

```yaml
environment:
  - APP1=http://9.60.247.25:8002/
  - APP2=http://9.60.247.25:8003/
  - APP3=http://9.60.247.25:8001/
  - DASHBOARD_PORT=80
```

You can add more applications by adding more `APP` entries:

```yaml
environment:
  - APP1=http://9.60.247.25:8002/
  - APP2=http://9.60.247.25:8003/
  - APP3=http://9.60.247.25:8001/
  - APP4=http://example.com:8004/
  - APP5=http://example.com:8005/
  - DASHBOARD_PORT=80
```

## Usage

### Start the Dashboard

```bash
docker-compose up -d
```

### Stop the Dashboard

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

### Rebuild After Changes

```bash
docker-compose up -d --build
```

## Access

Once running, access the dashboard at:

```
http://localhost
```

Or from another machine on the network:

```
http://<your-server-ip>
```

## How It Works

1. The dashboard reads application URLs from the `.env` file
2. For each configured application, it creates a card with:
   - A live thumbnail preview (iframe)
   - Application name and URL
   - A clickable link to open the application
3. Clicking anywhere on the card opens the application in a new tab

## Troubleshooting

### Thumbnails Not Loading

Some applications may block iframe embedding due to security policies (X-Frame-Options or CSP headers). In such cases, you'll see a "Preview unavailable" message, but the link will still work.

### Port 80 Already in Use

If port 80 is already in use, you can change it in the `docker-compose.yml` file:

```yaml
environment:
  - DASHBOARD_PORT=8080
```

And update the port mapping:

```yaml
ports:
  - "8080:80"
```

### Permission Issues on Port 80

On Linux, port 80 requires root privileges. Either:
- Run with sudo: `sudo docker-compose up -d`
- Use a different port (e.g., 8080)

## Project Structure

```
.
├── docker-compose.yml    # Docker Compose configuration (includes app URLs)
├── Dockerfile           # Docker image definition
├── package.json         # Node.js dependencies
├── server.js            # Express server
├── index.html           # Dashboard HTML
└── README.md            # This file
```

## Customization

### Styling

Edit the `<style>` section in `index.html` to customize colors, layout, and appearance.

### Grid Layout

The dashboard uses CSS Grid with responsive columns. Modify the grid settings in `index.html`:

```css
.dashboard-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}
```

## License

MIT