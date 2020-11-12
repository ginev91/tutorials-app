module.exports = {
    development: {
        port: process.env.PORT || 4000,
        privateKey: 'SOFT-UNI-EXAM',
        databaseUrl: `mongodb+srv://alex:415263@cluster0.kjp2a.mongodb.net/exam1?retryWrites=true&w=majority`
    },
    production: {}
};