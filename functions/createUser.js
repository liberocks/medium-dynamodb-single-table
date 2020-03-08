const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')
const ObjectID = require('bson').ObjectID

export const handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const id = (new ObjectID()).toString()

    const action = 'put'
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        pk: `USER#${id}`,
        sk: `PROFILE#${id}`,
        data: {
          username: body.username,
          fullname: body.fullname,
          email: body.email,
          createdAt: body.createdAt,
          address: body.address
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
