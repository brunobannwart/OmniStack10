import User from '../models/User';
import parseStringAsArray from '../utils/parseStringAsArrray';

class SearchController {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;

        const techs_array = parseStringAsArray(techs);
        
        const users = await User.find({
            techs: {
                $in: techs_array,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        
        return res.json({ users });
    }
}

export default new SearchController();