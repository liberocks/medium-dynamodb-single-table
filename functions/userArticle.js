const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')

export const handler = async (event, context) => {
  try {
    const path = event.pathParameters

    const params = {
      TableName: process.env.TABLE_NAME,
      IndexName: 'ownership',
      KeyConditionExpression: 'uid = :u AND dtype = :t',
      ExpressionAttributeValues: {
        ':u': path.userId,
        ':t': 'ARTICLE'
      }
    }

    if (event.queryStringParameters && 'limit' in event.queryStringParameters) {
      params.Limit = event.queryStringParameters.limit
    } else {
      params.Limit = 10
    }

    if (event.queryStringParameters && 'LastEvaluatedKey' in event.queryStringParameters) {
      params.ExclusiveStartKey = {
        pid: event.queryStringParameters.LastEvaluatedKey,
        uid: path.userId,
        dtype: 'ARTICLE'
      }
    }

    const articles = await dynamo.exec('query', params)
    return success({
      documents: articles.Items,
      length: articles.Items.length,
      hasNext: 'LastEvaluatedKey' in articles,
      LastEvaluatedKey: 'LastEvaluatedKey' in articles ? articles.LastEvaluatedKey : {}
    })
  } catch (error) {
    console.error(error)
    return fail({ message: error.message })
  }
}
