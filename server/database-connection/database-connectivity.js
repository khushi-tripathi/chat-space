var mysql = require("mysql2");
const { deleteFromCloudinary } = require("../utils/cloudinary.js");
require('dotenv').config()

var con = mysql.createConnection({
  host: process.env?.DATABASE_HOST,
  user: process.env?.DATABASE_USER,
  password: process.env?.DATABASE_PASSWORD,
  database: process.env?.DATABASE,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

const addUserDetails = (data) => {
  var sql = `INSERT INTO user_details(first_name, last_name, email, mobile , password , profile_image , image_public_id) VALUES('${data.firstName}', '${data.lastName}', '${data.email}' , '${data.mobile}'  , '${data.password}' , '${data.profile}' , '${data.image_public_id}')`;

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
  });
};

const fetchUserDetails = (response = '') => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM user_details`;
    console.log("1")
    //yha pr issue h
    con.query(sql, async function (err, result, fields) {
      if (err) throw err;
      console.log("2")
      let res = await JSON.parse(JSON.stringify(result || {}));
      console.log("3")
      if (typeof (response) !== 'string') {
        console.log("4")
        response.json({
          data: res,
        });
        resolve()
      } else {

        console.log("else part 5")
        // return res;
        resolve(res)
      }
      console.log("6")
    });
  })

};

const getUuid = (response) => {
  var sql = `SELECT * FROM uuid`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    let res = JSON.parse(JSON.stringify(result || {}));
    response.json({
      data: res,
    });
  });
};

const getGroupInfo = async (response = '') => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT * FROM group_chat`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      let res = JSON.parse(JSON.stringify(result || {}));
      if (typeof (response) !== 'string') {

        response.json({
          data: res,
        });
        resolve()
      } else {
        resolve(res);
      }
    });
  })
};

const getChatFromUuid = (request, response) => {
  let data = [];
  for (let i = 0; i < request?.length; i++) {
    const uuid = request[i]?.uuid
    var sql = `SELECT * FROM  manage_chat WHERE uuid='${uuid}'`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      let finalData = result[0]
      finalData['chat'] = JSON.parse(finalData?.chat || '[]') || []
      data[i] = finalData;
      if (i === request?.length - 1) {
        response.json({
          data,
        });
      }
    })
  }
};

const addNewChat = (request, response) => {
  const chat = JSON?.stringify(request?.chat || {})
  var sql = `INSERT INTO manage_chat(uuid, primary_user, chat) VALUES('${request.uuid}', '${request.primary_user}', '${chat}')`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record inserted",
    });
  });
};

const removeImagesFromCloudinary = async (table) => {
  let data = [];
  if (table === 'user_details') {
    data = await fetchUserDetails()
  } else if (table === 'group_chat') {
    data = await getGroupInfo()
  }
  data?.map(async (item, idx) => {
    console.log(item?.image_public_id)
    const res = await deleteFromCloudinary(item?.image_public_id)
    // if res is false that means after five attempt, profile still not get deleted. so handling that we can make one of the table and move image id there so that we have record that how many files are not in use and still belongs to cloudinary.
    console.log("resss : ", res)
    if (idx === data.length - 1) {
      console.log("this is last index", item, data?.length)
      return true
    }
  })
}

const submitAdminInfo = async (request, response) => {

  for (let i = 0; i < request?.tables?.length; i++) {
    const table = request?.tables[i]
    var sql = `DELETE FROM ${table}`;

    // do {
    console.log(table)
    console.log("after await")
    if (table === 'user_details' || table === 'group_chat') {
      await removeImagesFromCloudinary(table)
      console.log("inside if")
    }

    // } while (condition);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (i === request?.tables?.length - 1) {
        console.log("Giving response")
        response.json({
          message: "Selected table data is deleted!! ",
        });
      }
    })
  }
  // response.json({
  //   message: "Selected table data is deleted!! ",
  // });

}

const addNewGroup = (request, response) => {
  const group_member = JSON?.stringify(request?.group_member || {})
  const admin = JSON?.stringify(request?.admin || {})

  var sql = `INSERT INTO group_chat(uuid, primary_user, group_member, admin , group_name , group_picture , image_public_id) VALUES('${request.uuid}', '${request.primary_user}', '${group_member}', '${admin}' , '${request.group_name}' , '${request?.group_picture}' , '${request?.image_public_id}' )`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record inserted in group table",
    });
  });
};

const updateChat = (request, response) => {
  const chat = JSON?.stringify(request?.chat || {})
  var sql = `UPDATE manage_chat SET chat='${chat}' WHERE uuid='${request?.uuid}'`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record Updated",
    });
  });
};

const updateGroupInfo = (request, response) => {
  const group_member = JSON?.stringify(request?.group_member || {})
  const admin = JSON?.stringify(request?.admin || {})

  var sql = `UPDATE group_chat SET group_member='${group_member}', admin='${admin}', group_name='${request?.group_name}', group_picture='${request?.group_picture}', image_public_id='${request?.image_public_id}'  WHERE uuid='${request?.uuid}'`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.json({
      data: "Record Updated",
    });
  });
};

const addUuid = (request, response) => {
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
module.exports.getGroupInfo = getGroupInfo;
module.exports.getChatFromUuid = getChatFromUuid;
module.exports.updateChat = updateChat;
module.exports.updateGroupInfo = updateGroupInfo;
module.exports.addNewChat = addNewChat;
module.exports.addNewGroup = addNewGroup;
module.exports.submitAdminInfo = submitAdminInfo;
module.exports.addUuid = addUuid;
