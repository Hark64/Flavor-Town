import { Router } from 'express';
import { Recipe } from '../entities/recipe';
import isAuthenticated from '../middleware/isAuthenticated';

export default (DataSource) => {
    const router = Router();
    const recipeResource = DataSource.getRepository(Recipe);

    //make all requests for this to be authenticate
    router.use('/recipes', isAuthenticated);

    router.get('/recipes', (request, response) => {
        recipeResource.find({where: {
            user: request.user
        }}).then(
            (recipes) => {
                response.send({recipes})
            }, 
            () => response.send({recipes: []})
        );
    })

    router.post('/recipes', (request, response) => {
        const { title, description, imageURL } = request.body;
        const recipe = recipeResource.create({
            title,
            description,
            imageURL, 
            user: request.user
        });
        recipeResource.save(recipe).then((result) => {
            response.send(result);
        });
    });

    router.param('id', (req, res, next, id) => {
        const recipe = recipeResource.findOne({
            where: {
                id,
                user: req.user
            }
        }).then((recipe) => {
            if (recipe) {
                req.recipe = recipe;
                next();
            } else {
                res.send(404);
            }
        });
    });


    router.put('/recipes/:id', (req, res) => {
        const { title, description, imageURL } = req.body;
        recipeResource.save({ ...req.recipe, title, description, imageURL}).then((result) => {
            res.send(result);
        });
    });

    router.delete('/recipes/:id', (req, res) => {
        recipeResource.delete(req.recipe.id).then((result) => {
            res.send(result);
        });
    });
}