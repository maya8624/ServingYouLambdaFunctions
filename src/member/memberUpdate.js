const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  const { firstName, lastName, mobile, email, password } = JSON.parse(
    event.body
  );

  const params = {
    TableName: "Members",
    Key: {
      Email: email,
    },
    UpdateExpression: "set FirstName = :f, LastName = :l, Mobile = :m",
    ExpressionAttributeValues: {
      ":f": firstName,
      ":l": lastName,
      ":m": mobile,
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
