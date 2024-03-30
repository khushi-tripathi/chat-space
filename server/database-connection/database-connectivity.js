var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "chat",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

const addUserDetails = (data) => {
  var sql = `INSERT INTO user_details(first_name, last_name, email, mobile , password , profile_image) VALUES('${data.firstName}', '${data.lastName}', '${data.email}' , '${data.mobile}'  , '${data.password}' , '${data.profile}')`;

  //BOTH ARE CORRECT. WE CAN USE ANY OF THEM.

  // var sql =
  //   "INSERT INTO user_details(first_name, last_name, email, mobile) VALUES('" +
  //   data.firstName +
  //   "' , '" +
  //   data.lastName +
  //   "', '" +
  //   data.email +
  //   "' , '" +
  //   data.mobile +
  //   "')";

  // SQL ::  INSERT INTO user_details(first_name, last_name, email, mobile) VALUES('Khushi', 'Tripathi', 'kkkk12345678' , '123456789' )

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
};

const fetchUserDetails = (response) => {
  var sql = `SELECT * FROM user_details`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    let res = JSON.parse(JSON.stringify(result));
    response.json({
      data: res,
    });
  });
};


const getUuid = (response) => {
  var sql = `SELECT * FROM uuid`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    let res = JSON.parse(JSON.stringify(result));
    response.json({
      data: res,
    });
  });
};


const getChatFromUuid = (request, response) => {
  let data = [];
  // console.log("uuuuuu", request?.length)

  for (let i = 0; i < request?.length; i++) {
    console.log("request : ", request[i])
    const uuid = request[i]?.uuid
    var sql = `SELECT * FROM  manage_chat WHERE uuid='${uuid}'`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log("chattt ; ", result)
      let finalData = result[0]
      finalData['chat'] = JSON.parse(finalData?.chat)
      data[i] = finalData;
      if (i === request?.length - 1) {
        response.json({
          data,
        });
      }
    })
  }
  console.log("Data", data)

};



const addNewChat = (request, response) => {
  console.log(request)
  console.log(request.primary_user)
  const chat = JSON?.stringify(request?.chat)
  var sql = `INSERT INTO manage_chat(uuid, primary_user, chat) VALUES('${request.uuid}', '${request.primary_user}', '${chat}')`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record inserted",
    });
  });
};

const addNewGroup = (request, response) => {
  console.log("Khushi : ", request)
  console.log(request.primary_user)
  const group_member = JSON?.stringify(request?.group_member)


  // var sql = "INSERT INTO group_chat (uuid, primary_user, group_member, admin) VALUES ('Company Inc', 'Highway 37', 'Khsuhi', 'yes' )"
  var sql = `INSERT INTO group_chat(uuid, primary_user, group_member, admin) VALUES('${request.uuid}', '${request.primary_user}', '${group_member}', '${request.admin}')`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record inserted in group table",
    });
  });
};

const updateChat = (request, response) => {
  console.log(request)
  console.log(request.primary_user)
  const chat = JSON?.stringify(request?.chat)
  var sql = `UPDATE manage_chat SET chat='${chat}' WHERE uuid='${request?.uuid}'`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record Updated",
    });
  });
};

const addUuid = (request, response) => {
  console.log(request)
  console.log(request.primary_user)
  // const chat = JSON?.stringify(request?.chat)
  var sql = `INSERT INTO uuid(uuid, primary_user, other_user , isGroup) VALUES('${request.uuid}', '${request.primary_user}', '${request.other_user}'  , '${request.isGroup}')`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record inserted",
    });
  });
};


const add = () => {
  return "KKK";
};
module.exports.add = add;
module.exports.addUserDetails = addUserDetails;
module.exports.fetchUserDetails = fetchUserDetails;
module.exports.getUuid = getUuid;
module.exports.getChatFromUuid = getChatFromUuid;
module.exports.updateChat = updateChat;
module.exports.addNewChat = addNewChat;
module.exports.addNewGroup = addNewGroup;
module.exports.addUuid = addUuid;



