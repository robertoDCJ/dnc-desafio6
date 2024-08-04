import { createClient } from "redis";

const redisClient = createClient({
  password: "wyCfJNs2GVmPqkjox3qz8bffj2vZZnzE",
  socket: {
    host: "redis-15074.c98.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 15074,
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export { redisClient };
