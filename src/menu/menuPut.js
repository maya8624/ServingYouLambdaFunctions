const AWS = require("aws-sdk");
const dbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const {
    id,
    available,
    category,
    description,
    image,
    menuName,
    price,
    special,
  } = JSON.parse(event.body);

  const params = {
    TableName: "Menus",
    Item: {
      MenuId: id,
      Available: available,
      Category: category,
      Description: description,
      Image: image,
      MenuName: menuName,
      Price: price,
      Special: special,
    },
  };

  try {
    const data = await dbClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (error) {
    responseBody = `Unable to put menu: ${error}`;
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
