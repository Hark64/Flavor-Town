import { Router } from 'express';
import { Recipe } from '../entities/recipe';
import isAuthenticated from '../middleware/isAuthenticated';

export default (DataSource) => {
    const router = Router();
    // const multer = require('multer');
    const recipeResource = DataSource.getRepository(Recipe);
    // const upload = multer({ dest: 'uploads'});

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

    // router.post('/recipes', upload.single('uploaded_file'), (request, response) => {
    //     const { title, description } = request.body;
    //     const path = request.file;
    //     const recipe = recipeResource.create({
    //         title,
    //         description,
    //         path, 
    //         user: request.user
    //     });
    //     recipeResource.save(recipe).then((result) => {
    //         response.send(result);
    //     });
    // });

    router.post('/recipes', (request, response) => {
        const { title, description } = request.body;
        const recipe = recipeResource.create({
            title,
            description,
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