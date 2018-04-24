const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['IE 10', 'IE 11', 'firefox 20', 'ios_saf 8.4', 'android 4.3']
            // browsers : ['> 5%']
        })
    ]
}
