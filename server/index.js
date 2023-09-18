import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { SERVER_PORT } from './env.js';
import { api } from './api/api.js';

const app = express();

const corsOptions = { 
    credentials: true,
    origin: 'http://localhost:3000',
};
const helmetOptions = {
    crossOriginResourcePolicy: false,
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(express.static('public'));

app.use('/api', api);

app.get('*', (_req, res) => {
    return res.status(200).json({ msg: 'What are you looking for? 👀' });
});

// custom 404
app.use((_req, res, _next) => {
    return res.status(404).json({ msg: "Sorry can't find that!" });
});

// custom error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    return res.status(500).json({ msg: 'Something broke!' });
});

app.listen(SERVER_PORT); 