import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only load from .env.development if VITE_API_BASEURL is not already set
if (!process.env.VITE_API_BASEURL) {
    dotenv.config({ path: path.resolve(__dirname, '..', '.env.development') });
}

// Get the API base URL from environment variables
const API_BASE_URL = new URL(process.env.VITE_API_BASEURL);

// Get the list of parks from the venues API
async function getParks() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: API_BASE_URL.hostname,
            port: API_BASE_URL.port || (API_BASE_URL.protocol === 'https:' ? 443 : 80),
            path: '/api/venues/getAllVenues',
            method: 'GET',
            protocol: API_BASE_URL.protocol,
            rejectUnauthorized: false,
            headers: {
                'Accept': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData.map(park => park.curName));
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error('Error fetching parks:', error);
            reject(error);
        });

        req.end();
    });
}

// Read template files
function readTemplate(templatePath) {
    return fs.readFileSync(path.join(__dirname, '..', 'src', 'templates', templatePath), 'utf8');
}

// Replace placeholders in template
function replacePlaceholders(template, parkName) {
    return template.replace(/{{parkName}}/g, parkName);
}

// Write file to destination
function writeFile(content, destPath) {
    const fullPath = path.join(__dirname, '..', 'src', 'parks', destPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
}

// Generate files for a park
function generateParkFiles(parkName) {
    const urlFriendlyName = parkName.toLowerCase().replace(/\s+/g, '-');
    
    // Generate index.html
    const indexTemplate = readTemplate('park/index.html');
    const indexContent = replacePlaceholders(indexTemplate, parkName);
    writeFile(indexContent, `${urlFriendlyName}/index.html`);

    // Generate main.jsx
    const mainTemplate = readTemplate('park/main.jsx');
    const mainContent = replacePlaceholders(mainTemplate, parkName);
    writeFile(mainContent, `${urlFriendlyName}/main.jsx`);

    // Generate app.jsx
    const appTemplate = readTemplate('park/app.jsx');
    const appContent = replacePlaceholders(appTemplate, parkName);
    writeFile(appContent, `${urlFriendlyName}/app.jsx`);
}

// Main function
async function main() {
    try {
        const parks = await getParks();
        parks.forEach(park => {
            console.log(`Generating files for ${park}...`);
            generateParkFiles(park);
        });
        console.log('Park files generated successfully!');
    } catch (error) {
        console.error('Failed to generate park files:', error);
        process.exit(1);
    }
}

main().catch(console.error); 