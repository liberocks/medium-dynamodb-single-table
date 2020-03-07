const dynamo = require('../libs/dynamo')
const { success, fail, notFound } = require('../libs/response')

export const handler = async (event, context) => {
  try {
    const path = event.pathParameters

    const action = 'get'
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        pid: path.commentId,
        dtype: 'COMMENT'
      }
    }

    const comment = await dynamo.exec(action, params)
    if (!comment.Item) return notFound({ message: 'Comment is not found' })

    return success(comment.Item)
  } catch (error) {
    console.error(error)
    return fail({ message: error.message })
  }
}
