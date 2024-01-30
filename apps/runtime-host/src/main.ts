import express, { Request, Response } from 'express';
import { AppConfiguration } from '@angular-environment-variables/app-configuration';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

const config: AppConfiguration = {
  angularEnvironment: process.env['ANGULAR_ENVIRONMENT'] === 'DEVELOPMENT' ? 'development' : 'production',
  apiUrl: process.env['API_URL'] ?? null,
  backgroundColor: process.env['BACKGROUND_COLOR'] ?? null
}

// If not found, doesn't throw an error.
app.use(express.static(`${__dirname}/client/`, {}));

// Provide configuration on /config
app.get('/config', (_request: Request, res: Response) => {
  res.json(config);
});

// Other requests should be redirected to our Angular client
app.use('*', (_req: Request, res: Response) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
