import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/health', (_req, res) => res.send('OK!'));

const server = app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
