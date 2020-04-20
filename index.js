const server = require("./server");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

module.exports = server;
