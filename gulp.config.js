module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = '*.*';
    var temp = './.tmp/';


    var config = {
       
        alljs: [
            './**/*.js',
            './*.js',
            './services/auth/*.js',
            '!' + './spec/*.spec.js'
        ],

        server: server,
       
        /**
         * Node settings
         */
        defaultPort: 8080,

    };
   
    return config;
};
