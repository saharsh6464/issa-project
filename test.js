// Log response time
console.log("Request time: " + pm.response.responseTime + " ms");

// Save time into environment variable for later aggregation
let times = pm.environment.get("times") || "[]";
times = JSON.parse(times);
times.push(pm.response.responseTime);
pm.environment.set("times", JSON.stringify(times));
