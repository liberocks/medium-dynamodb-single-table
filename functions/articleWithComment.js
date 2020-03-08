const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')

export const handler = async (event, context) => {
  try {
    const path = event.pathParameters

    const params = {
      TableName: process.env.TABLE_NAME,
      IndexName: 'relationship',
      KeyConditionExpression: 'sid = :s',
      ExpressionAttributeValues: {
        ':s': path.articleId
      }
    }
    params.Limit = 4

    const articleWithComments = await dynamo.exec('query', params)
    return success({
      documents: articleWithComments.Items,
      length: articleWithComments.Items.length
    })
  } catch (error) {
    console.error(error)
    return fail({ message: error.message })
  }
}
