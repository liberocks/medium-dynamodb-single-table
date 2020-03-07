const dynamo = require('../libs/dynamo')
const { success, fail, notFound } = require('../libs/response')

export const handler = async (event, context) => {
  try {
    const path = event.pathParameters

    const action = 'get'
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        pid: path.articleId,
        dtype: 'ARTICLE'
      }
    }

    const article = await dynamo.exec(action, params)
    if (!article.Item) return notFound({ message: 'Article is not found' })

    return success(article.Item)
  } catch (error) {
    console.error(error)
    return fail({ message: error.message })
  }
}
