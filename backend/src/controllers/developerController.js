const axios = require("axios");
const developerModel = require("../models/developerModel");

module.exports = {
  async index(request, response) {
    const { user } = request.headers;

    const loggedDeveloper = await developerModel.findById(user);

    const users = await developerModel.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDeveloper.likes } },
        { _id: { $nin: loggedDeveloper.dislikes } }
      ]
    });

    return response.json(users);
  },

  async store(request, response) {
    const { username } = request.body;

    const userExists = await developerModel.findOne({ user: username });

    if (userExists) {
      return response.json(userExists);
    }

    const userGitHubReq = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const userData = userGitHubReq.data;

    const { name, bio, avatar_url: avatar } = userData;

    const developer = await developerModel.create({
      name,
      user: username,
      bio,
      avatar
    });

    return response.json(developer);
  }
};
