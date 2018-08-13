var fs = require('fs');
const path = require('path')
var htmlPaht = path.join(__dirname, '../dist/index.html')
fs.readFile( htmlPaht, 'utf8', (err, data) => {
    if (!err) {
        var dataStr = data.toString(),
        timestamp = (new Date()).getTime();
    
        dataStr = dataStr
                    .replace('<!-- dll -->', '<script src="./dist/vendor.dll.js?v='+ timestamp +'"></script>');

        fs.writeFile(htmlPaht, dataStr, (error) => {
            if (!error) {
                console.log('HTML file copy successfully');
            } else {
                console.log(error);
            }
        });
    } else {
        console.log(err);
    }
});