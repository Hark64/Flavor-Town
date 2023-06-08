import { Router } from 'express';
import { Recipe } from '../entities/recipe';
import { User } from '../entities/user';


export default (DataSource) => {
    const router = Router();
    const recipeResource = DataSource.getRepository(Recipe);
    const userResource = DataSource.getRepository(User);
   
    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: '../webapp2/uploads',
        filename: (req, file, cb) => {
            const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniquePrefix + '-' + file.originalname);
        },
      });
      
    const upload = multer({ storage: storage });


    

    router.get('/recipes', (request, response) => {
        recipeResource.createQueryBuilder("recipe")
        .leftJoin("recipe.ratings", "rating")
        .addSelect("AVG(rating.score)", "avgScore")
        .where("recipe.user = :userID", { userID: request.user.id })
        .groupBy("recipe.id")
        .getRawMany()
        .then(
            (recipes) => {
                response.send({recipes});
            }, 
            () => {
                response.send({recipes: []});
            }
        );
    });

    router.get('/recipes/:id', (request, response) => {
        recipeResource.createQueryBuilder("recipe")
        .leftJoin("recipe.ratings", "rating")
        .addSelect("AVG(rating.score)", "avgScore")
        .where("recipe.id = :recipeID", { recipeID: request.params.id})
        .getRawOne()
        .then(
            (recipe) => {
                response.send({recipe: recipe});
            }, 
            () => {
                response.send();
            }
        );
    });


    router.get('/search', (request, response) => {
        let myQuery = recipeResource.createQueryBuilder("recipes")
            .leftJoinAndSelect("recipes.user", "user")
        
        if (request.query.showZip) {
            const zip = request.query.zip;
            myQuery.where("user.zipCode = :zip", { zip });
        }

        if (request.query.count) {
            myQuery.limit(request.query.count);
        }
            
        //myQuery.orderBy("recipes.score", "DESC").getMany()
        myQuery.getMany()
            .then(
                (recipes) => {
                    response.send({recipes})
                }, 
                () => response.send({recipes: []})
            );
    });

                 //.where("recipes.zipcode = :zip", { zip: "idk how to get this from frontend search.js store" })
             //put after leftjoin

    router.post('/recipes', upload.single('uploaded_file'), (request, response) => {
        const {title, description, videoLink} = request.body;
        const fileName = "../../uploads/" + request.file.filename;
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
                id//,
                //user: req.user
            }
        }).then((recipe) => {
            if (recipe) {
                //TODO PLEASE FOR THE LOVE OF GOD HELP ME LOAD USER
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