import AWS from 'aws-sdk'

export function exec (action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  return dynamoDb[action](params).promise()
}
