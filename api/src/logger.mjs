import bunyan from 'bunyan';
import bformat from 'bunyan-format';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, '..', 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const formatOut = bformat({ outputMode: 'short' });

const logger = bunyan.createLogger({
  name: 'movies-api',
  streams: [
    {
      level: 'info',
      stream: formatOut
    },
    {
      level: 'error',
      path: path.join(logsDir, 'error.log')
    }
  ]
});

export default logger; 