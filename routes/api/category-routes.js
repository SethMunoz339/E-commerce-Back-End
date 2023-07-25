const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/categories', async (req, res) => {
  try{
    const categoriesData = await Category.findAll();
  console.log(categoriesData)
    return res.json(categoriesData);}
    catch(err){
      console.log(err)
      return res.json(err)
    }
  });

router.get('/categories:id', async (req, res) => {
  const categoryData = await Category.findOne(
    {
      where: {
        id: req.params.id
      }
    }
  ).then((categoryData) => {
    console.log(categoryData);
   return res.json(categoryData);
  });

});

  
router.post('/', async (req, res) => {
  const categoryData = await Category.create(req.body);

  return res.json(categoryData);
});

router.put('/:category_id', async (req, res) => {
  const categoryData = await Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(categoryData);
});

router.delete('/categories:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(categoryData);
});

module.exports = router;
