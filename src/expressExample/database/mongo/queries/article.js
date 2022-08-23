const { ArticleModel } = require('../models')

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String} article.price
 * @param {String} article.image
 * @param {String} article.description
 * @param {String} article.name
 * @returns saved article
 */
const saveArticle = async article => {
  const savedArticle = new ArticleModel(article)

  await savedArticle.save()

  return savedArticle
}

/**
 * @param {String} id
 * @returns found article
 */
const getOneArticle = async id => {
  const users = await ArticleModel.find({ id })

  return article[0]
}

/**
 * @returns found articles
 */
const getAllArticles = async () => {
  const articles = await ArticleModel.find()

  return articles
}

/**
 * @param {String} id
 * @returns remove article
 */
const removeOneArticle = async id => {
  const article = await ArticleModel.findOneAndRemove({ id })

  return article
}

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String|undefined} article.price
 * @param {String|undefined} article.image
 * @param {String|undefined} article.description
 * @param {String|undefined} article.name
 * @returns updated article
 */
const updateOneArticle = async article => {
  const { id, price, image, description, name } = article
  const articleUpdated = await ArticleModel.findOneAndUpdate(
    { id },
    { price, image, description, name },
    { new: true }
  )

  return articleUpdated
}

module.exports = {
  saveArticle,
  getOneArticle,
  getAllArticles,
  removeOneArticle,
  updateOneArticle
}
