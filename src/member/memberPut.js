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
    Item: {
      FirstName: firstName,
      LastName: lastName,
      Mobile: mobile,
      Email: email,
      Password: password,
    },
  };

  try {
    const data = await docClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (error) {
    responseBody = `Unable to put member: ${error}`;
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
