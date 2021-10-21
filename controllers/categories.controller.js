const Categories = require("../models/Categories.model");

const createCategory = async (req, res) => {
  try {
    const newCategory = await Categories.create({ label: req.body.label });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    await Categories.findByIdAndRemove(categoryId, { new: true });
    res.status(200).json({ message: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allCategories = async (req, res) => {
  try {
    const categoriesFind = await Categories.find({});
    res.status(200).json(categoriesFind);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  allCategories,
};
