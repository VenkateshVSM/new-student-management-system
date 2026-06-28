const { onRequest } = require("firebase-functions/v2/https");

// Import Express app from the copied server folder

const app = require("./server/app");

// Export Cloud Function

exports.api = onRequest(app);