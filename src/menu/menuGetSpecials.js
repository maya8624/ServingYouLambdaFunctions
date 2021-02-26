const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Menus",
    ProjectionExpression: "Category, Image, MenuId, MenuName, Price",
    FilterExpression: "Available = :a And Special = :s",
    ExpressionAttributeValues: {
      ":s": true,
      ":a": true,
    },
  };

  try {
    const data = await docClient.scan(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get specials: ${error}`;
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
