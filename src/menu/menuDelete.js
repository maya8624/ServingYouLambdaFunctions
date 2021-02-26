const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  const params = {
    TableName: "Menus",
    Key: {
      MenuId: id,
    },
  };

  try {
    const data = await docClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (error) {
    responseBody = `Unable to delete menu: ${error} - ${id}`;
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
