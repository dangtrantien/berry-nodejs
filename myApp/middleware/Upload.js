//Tải file/image dựa vào mã code base64
const upload = async (base64String) => {
  var matches = base64String.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.name = base64String.name;
  response.data = new Buffer.from(matches[2], "base64");

  return response;
};

module.exports = upload;
