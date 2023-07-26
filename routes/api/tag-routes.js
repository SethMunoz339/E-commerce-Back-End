const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
  console.log(tagData)
    return res.json(tagData);}
    catch(err){
      console.log(err)
      return res.json(err)
    }
  });
// get one tag
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findOne(
      {
        include: { model: Product },
        where: {
          id: req.params.id
        }
      }
    ).then((tagData) => {
      console.log(tagData);
     return res.json(tagData)});}
     catch(err){
        console.log(err)
        return res.json(err)
      }
    });

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
  
    res.status(200).json(tagData);
  } catch (err) {
  
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const tagData = await Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(tagData);
});

router.delete('/:id', async (req, res) => {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(tagData);
});

module.exports = router;
