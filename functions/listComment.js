const dynamo = require('../libs/dynamo')
const { success, fail } = require('../libs/response')

export const handler = async (event, context) => {
  try {
    const path = event.pathParameters

    const params = {
      TableName: process.env.TABLE_NAME,
      IndexName: 'relationship',
      KeyConditionExpression: 'sid = :s AND dtype = :t',
      ExpressionAttributeValues: {
        ':s': path.articleId,
        ':t': 'COMMENT'
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
        sid: path.articleId,
        dtype: 'COMMENT'
      }
    }

    const comments = await dynamo.exec('query', params)
    return success({
      documents: comments.Items,
      length: comments.Items.length,
      hasNext: 'LastEvaluatedKey' in comments,
      LastEvaluatedKey: 'LastEvaluatedKey' in comments ? comments.LastEvaluatedKey : {}
    })
  } catch (error) {
    console.error(error)
    return fail({ message: error.message })
  }
}
