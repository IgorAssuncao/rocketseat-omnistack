const developerModel = require("../models/developerModel");

module.exports = {
  async store(request, response) {
    const userId = request.headers.user;
    const devId = request.params.devId;

    const loggedDeveloper = await developerModel.findById(userId);
    const targetDeveloper = await developerModel.findById(devId);

    if (!targetDeveloper) {
      return response.status(400).json({ error: "Developer does not exists" });
    }

    if (targetDeveloper.likes.includes(loggedDeveloper._id)) {
      const loggedSocket = request.connectedUsers[userId];
      const targetSocket = request.connectedUsers[devId];

      if (loggedSocket) {
        request.io.to(loggedSocket).emit("match", targetDeveloper);
      }

      if (targetSocket) {
        request.io.to(targetSocket).emit("match", loggedDeveloper);
      }
    }

    loggedDeveloper.likes.push(targetDeveloper._id);

    await loggedDeveloper.save();

    return response.json(loggedDeveloper);
  }
};
