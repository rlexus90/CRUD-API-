import dotenv from 'dotenv';
import http from 'http';
import os from 'os';
import cluster from 'cluster';
import users, { User } from './data_base/users';
import DataBase from './data_base/dataBase';
import { routeFn, routes } from './router';
import { EventEmitter } from 'events';
import { checkId } from './helpers/urlId';
import { sendAns } from './helpers/sendAns';

dotenv.config();

const PORT = process.env.PORT || 4000;
const withBalanser = process.argv.includes('--multi');

export class App {
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private eventEmiter: EventEmitter;

  constructor() {
    this.eventEmiter = new EventEmitter();
    this.addRoutes();
  }

  public start() {
    if (!withBalanser) {
      this.server = this.createServer();
      this.server.listen(PORT, () =>
        console.log(`Server start on PORT=${PORT}`)
      );
      DataBase.users = users;
    } else {
      this.runWithloadBalenser();
    }
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
              const handler: routeFn = endpoint[metod];
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

      try {
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

          if (!event) sendAns(req, res, `Route: ${req.url} - Not found!`, 404);
          // if (!cluster.isPrimary) {
          //   process.send(JSON.stringify(DataBase.users));
          // }
        });
      } catch {
        sendAns(req, res, `Somesing went bad`, 500);
      }
    });
  }

  runWithloadBalenser() {
    const CPU = os.availableParallelism();
    // const CPU = 2;
    const ports: number[] = [];
    const workerInfo = new Map<number, number>();
    let workerPortInd = 0;

    if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);

      for (let i = 1; i < CPU; i++) {
        const port = +PORT + i;
        ports.push(port);
        const worker = cluster.fork({ PORT: port });
        workerInfo.set(worker.process.pid, port);
      } // emit Workers

      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} is dead`);
        const port = workerInfo.get(worker.process.pid);
        cluster.fork({ PORT: port }); //emit new Worker
      });

      cluster.on('message', (worker, msg) => DataBase.push(JSON.parse(msg)));

      http
        .createServer((req, res) => {
          const reReq = http.request(
            {
              hostname: 'localhost',
              port: ports[workerPortInd],
              path: req.url,
              method: req.method,
              headers: req.headers,
            },
            (request) => {
              res.writeHead(request.statusCode, {
                'Content-Type': 'application/json',
              });
              request.pipe(res, { end: true });
            }
          );

          req.pipe(reReq, { end: true }); // resend request
          workerPortInd = (workerPortInd + 1) % ports.length;
        })
        .listen(PORT, () => console.log(`Server start on PORT=${PORT}`));
    } else {
      const port = process.env.PORT;
      this.server = this.createServer();

      process.on('message', (msg) => (DataBase.users = msg as User[]));
      
      this.server.listen(port, () =>
        console.log(`Worker start on \x1b[32mPORT=${port}\x1b[37m`)
      );
      this.server.on('request', () =>
        console.log(`\x1b[32mPORT=${port}\x1b[37m`)
      );
    }
  }
}
