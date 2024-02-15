import dotenv from 'dotenv';
import http from 'http';
import { routeFn, routes } from './router';
import { EventEmitter } from 'events';
import { checkId } from './helpers/urlId';
import { sendAns } from './helpers/sendAns';

dotenv.config();

const PORT = process.env.PORT || 4000;

export class App {
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private eventEmiter: EventEmitter;

  constructor() {
    this.eventEmiter = new EventEmitter();
    this.server = this.createServer();
  }

  public start() {
    this.server.listen(PORT, () => console.log(`Server start on PORT=${PORT}`));
  }

  public init() {
    this.addRoutes();
  }

  private addRoutes() {
    Object.keys(routes).map((route) => {
      const endpoint = routes[route];

      if (endpoint) {
        Object.keys(endpoint).map((metod) => {
          this.eventEmiter.on(
            `${route}:${metod}`,
            (
              req: http.IncomingMessage,
              res: http.ServerResponse,
              data: string
            ) => {
              const handler: routeFn = endpoint.metod;
              handler(req, res, data);
            }
          );
        });
      }
    });
  }

  private createServer() {
    return http.createServer((req, res) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        const event = this.eventEmiter.emit(
          `${checkId(req.url)}:${req.method}`,
          req,
          res,
          data
        );
        console.log(`${checkId(req.url)}:${req.method}`);
        if (!event) sendAns(res, `Route: ${req.url} - Not found!`, 404);
      });
    });
  }
}
