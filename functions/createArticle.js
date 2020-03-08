const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')
const ObjectID = require('bson').ObjectID

export const handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const headers = event.headers

    const action = 'put'
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        pid: (new ObjectID()).toString(),
        uid: headers['x-uid'],
        sid: body.category,
        dtype: 'ARTICLE',
        data: {
          title: body.title,
          content: body.content,
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
