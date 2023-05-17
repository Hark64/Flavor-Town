import { Router } from 'express';
import { Recipe } from '../entities/recipe';

export default (DataSource) => {
    const router = Router();
    const recipeResource = DataSource.getRepository(Recipe);
   
    const multer = require('multer');
    // const upload = multer({ dest: 'uploads/' })

    const storage = multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.originalname + '-' + uniqueSuffix);
        },
      });
      
    const upload = multer({ storage: storage });


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


    router.post('/recipes', upload.single('uploaded_file'), (request, response) => {
        const {title, description, videoLink} = request.body;
        const fileName = request.file.filename;
        const recipe = recipeResource.create({
            title,
            description,
            videoLink,
            fileName,
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
    return router;
}