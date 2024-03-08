import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirname_ = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

console.log(`🎈Total CPUs ${cpuCount} with Process ID ${process.pid}🚀`);
cluster.setupPrimary({
  exec: _dirname_ + "/index.js",
});

for (let i = 0; i < 4; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`💥 Worker with Process ID ${process.pid} is killed💥`);
  console.log("Starting new worker");
  cluster.fork();
});
