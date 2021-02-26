const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const {
    id,
    available,
    menuName,
    category,
    description,
    price,
    special,
    image,
  } = JSON.parse(event.body);

  const params = {
    TableName: "Menus",
    Key: {
      MenuId: id,
    },
    UpdateExpression:
      "set Available = :a, MenuName = :n, Category = :c, Description = :d, Price = :p, Special = :s, Image = :i",
    ExpressionAttributeValues: {
      ":a": available,
      ":n": menuName,
      ":c": category,
      ":d": description,
      ":p": price,
      ":s": special,
      ":i": image,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await docClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (error) {
    responseBody = `Unable to update menu: ${error}`;
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
