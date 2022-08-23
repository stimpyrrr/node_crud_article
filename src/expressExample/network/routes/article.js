const { Router } = require('express')
const { nanoid } = require('nanoid')

const { mongo: { queries } } = require('../../database')
const response = require('./response')

const ArticleRouter = Router()
const {
  article: {
    getAllArticles,
    saveArticle,
    removeOneArticle,
    updateOneArticle,
    getOneArticle
  }
} = queries

ArticleRouter.route('/article')
  .get(async (req, res) => {
    try {
      const articles = await getAllArticles()

      response({ error: false, message: articles, res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })
  .post(async (req, res) => {
    try {
      const { body: { price, image, description, name } } = req

      await saveArticle({
        id: nanoid(),
        price,
        image,
        description,
        name
      })
      response({ error: false, message: await getAllArticles(), res, status: 201 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })

ArticleRouter.route('/article/:id')
  .get(async (req, res) => {
    try {
      const { params: { id } } = req
      const article = await getOneArticle(id)

      response({ error: false, message: article, res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })
  .delete(async (req, res) => {
    try {
      const { params: { id } } = req

      await removeOneArticle(id)
      response({ error: false, message: await getAllArticles(), res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })
  .patch(async (req, res) => {
    const {
      body: { price, image, description, name  },
      params: { id }
    } = req

    try {
      await updateOneArticle({ id, price, image, description, name })
      response({ error: false, message: await getAllArticles(), res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })

module.exports = ArticleRouter

// JSON - DIC - BSON