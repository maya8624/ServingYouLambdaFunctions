const AWS = require("aws-sdk");
const dbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  var params = {
    TableName: "Members",
    Key: {
      Email: id,
    },
    ProjectionExpression: "Email, Password, FirstName",
  };

  try {
    const data = await dbClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get a member: ${error}`;
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
