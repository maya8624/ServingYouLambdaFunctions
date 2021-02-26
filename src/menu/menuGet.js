const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  AWS.config.update({ region: "ap-southeast-2" });

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
    const data = await docClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get menu: ${error}`;
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
