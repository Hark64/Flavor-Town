import { Router } from 'express';
import { Rating } from '../entities/rating';

export default (DataSource) => {
    const router = Router();
    const ratingResource = DataSource.getRepository(Rating);
   


    router.get('/ratings', (request, response) => {
        recipeResource.find({where: {
            recipe: request.user.recipe
        }}).then(
            (ratings) => {
                response.send({ratings})
            }, 
            () => response.send({ratings: []})
        );
    });




    router.post('/recipes/:recipeID/ratings', (request, response) => {
        const {score, description, recipeID} = request.body;
        const rating = ratingResource.create({
            score,
            description,
            recipe: recipeID,
            user: request.user
        });
        ratingResource.save(rating).then((result) => {
            response.send(result);
        });
    });

    router.get('recipes/:recipeID/score', (request, response) => {
        const recipeID = request.body;
        let sumScore = 0;

        ratingResource.find({where: {
            recipe: recipeID
        }}).then(
            ratings => {
                ratings.foreach((rating) => {
                    sumScore += rating.score;
                });

                recipeResource.findOne({where: {
                    id: recipeID
                }}).then(
                    (recipe) => {
                        if (ratings.length > 0) {
                            recipe.score = sumScore / ratings.length;
                        }
                        else {
                            recipe.score = 0;
                        }
                        recipeResource.save(recipe).then(() => {
                            response.send(recipe.score);
                        });
                    }
                );
                () => response.send({score: 0});
            },
        );

    });

    router.get('/recipes', (request, response) => {
        recipeResource.find({where: {
            user: request.user
        }}).then(
            (recipes) => {
                response.send({recipes})
            }, 
            () => response.send({recipes: []})
        );
    });


    return router;
}