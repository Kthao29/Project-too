const router = require('express').Router();
const { Category, Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/category', withAuth, async (req, res) => {
    const { category } = req.params.name;
  
    try {
      const categoryData = await Category.findOne({
        where: { name: category },
      });
  
      // Extract the category name
      const categoryName = categoryData ? categoryData.name : 'Default Category';
  
      // Retrieve projects for the category (you may need to adjust this part)
      const projects = await Project.findAll({
        include: [
          {
            model: Category,
            where: { name: category },
          },
        ],
      });
  
      // Render the 'category' template and pass the category name
      res.render('category', {
        projects,
        category: categoryName,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;