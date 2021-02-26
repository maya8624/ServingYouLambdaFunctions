const AWS = require("aws-sdk");
const fs = require('fs');

const s3 = new AWS.S3();

exports.handler = async (event) => {
  let responseBody = "";
  let statusCode = 0;
  let response = "";

  //   exports.handler = async (event) => {
  //     // TODO implement
  //     const response = {
  //         statusCode: 200,
  //         body: JSON.stringify('Hello from Lambda!'),
  //     };
  //     return response;
  // };

  const body = JSON.parse(event.body);
  //const fileName = body.fileName;

  if (!body || !body.image || !body.mime) {
    return (response = "incorrect body on reques" + body);
  }
  const buffer = Buffer.from(body.image, "base64");
  const stre = fs.createReadStream(body)
  var params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: "servingyou",
    ContentType: "image/jpeg",
    Key: "static/media/berries2.jpg",
  };

  try {
    
    const result = await s3.putObject(params).promise();
    statusCode = 200;
    responseBody = "succeed";
    // 'headers': { "Content-Type": "image/png" },
    // 'statusCode': 200,
    // 'body': base64.b64encode(image).decode('utf-8'),
    // 'isBase64Encoded': True
  } catch (error) {
    responseBody = `Unable to upload a file: ${error}`;
    statusCode = 403;
  }

  // const response = {
  //   statusCode: statusCode,
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: responseBody,
  // };

  return response;
};
