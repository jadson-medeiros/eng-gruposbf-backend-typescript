import { app } from './app';
import { env } from './config/env';

app.listen({
    host: '0.0.0.0',
    port: env.PORT ? Number(env.PORT) : 3333,
}, function (err, address) {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
});