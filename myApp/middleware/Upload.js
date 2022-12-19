//Tải file/image dựa vào mã code base64
const upload = async (base64String) => {
  var matches = base64String.data.split(";");
  response = {};

  if (matches.length !== 2) {
    return new Error("Invalid input string");
  }

  response.name = base64String.name;
  response.type = matches[0].split(":")[1];
  response.data = new Buffer.from(matches[1].split(",")[1], "base64");

  return response;
};

module.exports = { upload };
