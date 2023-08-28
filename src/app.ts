import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.ts';
import { connect, disconnect } from './configs/database-connection.ts';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express());
app.use(json());
app.use(routes);

app.get('/health', (_req, res) => res.send('OK!'));

const server = app.listen(3000, () => {
  connect();
  console.log('Servidor iniciado na porta 3000');
});
