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

    // if (loggedDeveloper.dislikes.includes(targetDeveloper._id)) {
    //   return;
    // }

    loggedDeveloper.dislikes.push(targetDeveloper._id);

    await loggedDeveloper.save();

    return response.json(loggedDeveloper);
  }
};
