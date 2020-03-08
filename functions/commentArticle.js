const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')
const ObjectID = require('bson').ObjectID

export const handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const headers = event.headers
    const path = event.pathParameters

    const action = 'put'
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        pid: (new ObjectID()).toString(),
        sid: path.articleId,
        uid: headers['x-uid'],
        dtype: 'COMMENT',
        data: {
          comment: body.comment,
          isEdited: false
        }
      }
    }
    await dynamo.exec(action, params)
    return success(params.Item)
  } catch (error) {
    console.error(error)
    return fail({ message: error.message })
  }
}
