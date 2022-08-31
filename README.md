#### HOW TO USE

install the packages

```
npm install
```

run the server application

```bash
node server.js
```

run the client with streaming

```
MODE=stream NAME=mhdhussein node client.js
```

run another client with polling

```
MODE=poll NAME=alex node client.js
```

BOT

```
(for i in `seq 1 10000`; do sleep 1; echo $i; done) | NAME=Bot node client.js
```
