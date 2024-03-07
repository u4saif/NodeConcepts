import { parentPort } from "worker_threads";

const BigDataComputaion = ()=>{
    let result = 0;
    for(let i=0; i< 30_000_000_00;i++){
        result+=1;
    } 
    return result;
}
 
parentPort.postMessage(BigDataComputaion());