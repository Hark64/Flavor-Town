import { Router } from 'express';
import { Follower } from '../entities/follower';
import { User } from '../entities/user';

export default (DataSource) => {
    const router = Router();
    const followerRepo = DataSource.getRepository(Follower);
    const userRepo = DataSource.getRepository(User);

    router.post('/follow', async (request, response) => {
        const {userBeingFollowedID, userWhoIsFollowingID} = request.body;

        const alreadyExists = await followerRepo.findOne({
            where: {
              userBeingFollowed: { id: userBeingFollowedID },
              userWhoIsFollowing: { id: userWhoIsFollowingID }
            }
        });

        if (!alreadyExists) {
        
            const userBeingFollowed = await userRepo.findOne({ where: { id: userBeingFollowedID}});
            const userWhoIsFollowing = await userRepo.findOne({ where: { id: userWhoIsFollowingID}});

            const follower = new Follower();

            follower.userBeingFollowed = userBeingFollowed;
            follower.userWhoIsFollowing = userWhoIsFollowing;

            followerRepo.save(follower).then((result) => {
                response.send(result);
            });
        }
    });


    router.get('/user/:id/followers', (req, res) => {
        followerRepo.find({where: {
            userBeingFollowed: {id: req.params.id}},
            relations: ['userWhoIsFollowing']
        }).then(
            (follows) => {
                res.send({follows})
            }, 
            () => res.send({follows: []})
        );
    });

    router.get('/user/:id/following', (req, res) => {
        followerRepo.find({where: {
            userWhoIsFollowing: {id: req.params.id}},
            relations: ['userBeingFollowed']
        }).then(
            (follows) => {
                res.send({follows})
            }, 
            () => res.send({follows: []})
        );
    });

    return router;
}
   