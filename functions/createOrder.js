const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')
const ObjectID = require('bson').ObjectID

export const handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const path = event.pathParameters
    const id = (new ObjectID()).toString()

    const action = 'put'
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        pk: `USER#${path.userId}`,
        sk: `ORDER#${id}`,
        data: {
          orderId: id,
          username: body.username,
          status: body.status,
          createdAt: body.createdAt,
          addresses: body.addresses
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
