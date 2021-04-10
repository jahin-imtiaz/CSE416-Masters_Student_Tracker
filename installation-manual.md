# Installation Manual

The application consists of a Vue.js frontend in `./npm-frontend` running at `http://localhost:8080` and a Node.js backend in `./backend` running at `http://localhost:4001`

Please make sure you have already installed:

1. Node.js and NPM: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Vue CLI: https://cli.vuejs.org/guide/installation.html
3. Deno: https://deno.land/manual/getting_started/installation

For starting the web server and database,

1. Go to project root directory
2. `cd backend`
3. `npm install`
4. `npm start`

The server should now be starting, and you should see log output in your terminal. The server is configured to connect to the database, and then you may interact with it through the built in api within `./backend/api` and `./backend/routes`. Or, if you would like to interact with the MongoDB document stores directly, use our `MONGO_URI=mongodb+srv://jahinimtiaz:jahin1234@final316.eoqts.mongodb.net/MAST416?retryWrites=true&w=majority` to access through MongoDB's services

For starting the frontend,

1. Go to project root directory
2. `cd npm-frontend`
3. `npm install`
4. `npm run serve`

The frontend should now be starting, and then you may go to `http://localhost:8080`. The backend should also be running to use frontend functionality.
