const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(durations) {
    const startTime = Date.now();
    while(Date.now() - startTime < durations) {

    }
}
app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
})

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`....delaying ${process.pid}`)
})
const PORT = process.env.PORT || 5000;

console.log('running server.js')
if(cluster.isMaster) {
    console.log(`Master has been started: ${process.pid}`)
    cluster.fork();
    const NUM_NUMBERS = os.cpus().length;
    for (let i = 0; i < NUM_NUMBERS; i++) {
        cluster.fork();
    }
} else {
    console.log('workerr started...')
    app.listen(PORT, console.log(`server starter ${PORT}`));
}

