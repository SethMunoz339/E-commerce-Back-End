const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    });
    console.log(categoriesData)
    return res.json(categoriesData);
  }
  catch (err) {
    console.log(err)
    return res.json(err)
  }
});

// get one category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      include: { model: Product },
      where: {
        id: req.params.id,
      }
    }

    ).then((categoryData) => {
      console.log(categoryData);
      return res.json(categoryData)
    });
  }
  catch (err) {
  console.log(err)
  return res.json(err)
}
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(categoryData);
});

module.exports = router;
