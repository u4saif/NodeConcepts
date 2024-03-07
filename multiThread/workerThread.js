const { parentPort} = require("worker_threads");

const count = ()=>{
    let count=0;
    for(let i=0; i<=3000_000_000;i++){
        count++;
    }
    return count;
}

parentPort.postMessage(count());