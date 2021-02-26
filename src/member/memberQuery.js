const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode = 0;

  const { email, id } = JSON.parse(event.body);
  //const { id } = event.pathParameters.id;

  const params = {
    TableName: "Members",
    ExpressionAttributeValues: {
      ":Email": email,
      ":Id": id,
    },
    KeyConditionExpression: "Email = :Email ",
    FilterExpression: "Id = :id",
    ProjectionExpression: "Email, Id",
  };

  try {
    const data = await docClient.query(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get member: ${error}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: responseBody,
  };

  return response;
};
