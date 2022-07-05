module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "password1",
    DB: "simplifyvmsdb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};