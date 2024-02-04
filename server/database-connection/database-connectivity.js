var mysql = require("mysql");

var con = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6680418",
  password: "yF98QDqxH5",
  database: "sql6680418",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

const addUserDetails = (data) => {
  var sql = `INSERT INTO user_details(first_name, last_name, email, mobile) VALUES('${data.firstName}', '${data.lastName}', '${data.email}' , '${data.mobile}' )`;

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

  console.log("SQL :: ", sql);

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

const add = () => {
  return "KKK";
};
module.exports.add = add;
module.exports.addUserDetails = addUserDetails;
module.exports.fetchUserDetails = fetchUserDetails;
