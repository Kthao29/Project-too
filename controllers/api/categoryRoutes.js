// const router = require('express').Router();
// const { Category, Project } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.get('/category', withAuth, async (req, res) => {
//     const { category } = req.params.name;
  
//     try {
//       const categoryData = await Category.findOne({
//         where: { name: category },
//       });
  

//       const categoryName = categoryData ? categoryData.name : 'Default Category';
  
//       const projects = await Project.findAll({
//         include: [
//           {
//             model: Category,
//             where: { name: category },
//           },
//         ],
//       });
  
//       res.render('category', {
//         projects,
//         category: categoryName,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


// module.exports = router;