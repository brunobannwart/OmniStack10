import axios from 'axios';
import User from '../models/User';
import parseStringAsArray from '../utils/parseStringAsArrray';

class UserController {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let user = await User.findOne({ github_username });

        if (!user) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const { name = login, avatar_url, bio } = response.data;

            const techs_array = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            user = await User.create({ 
                github_username, 
                name, 
                avatar_url, 
                bio, 
                techs: techs_array,
                location, 
            });
        }

        return res.json(user);
    }

    async index(req, res) {
        const users = await User.find();

        return res.json(users);
    }
}

export default new UserController();