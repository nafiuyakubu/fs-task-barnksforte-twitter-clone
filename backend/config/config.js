module.exports = {
  development: {
    username: "root",
    password: "rootpassword",
    database: "twitter_clone_db",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "rootpassword",
    database: "twitter_clone_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "rootpassword",
    database: "twitter_clone_prod",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
};
