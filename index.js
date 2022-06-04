const Mailjs = require("@cemalgnlts/mailjs");
let {PythonShell} = require('python-shell');
let {green, red, magenta} = require('chalk');
var setTitle = require('console-title');
var fs = require('fs');
const mailjs = new Mailjs();
const log = console.log;

let count = 0;
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
const gen = async () => {
    mailjs.getDomains().then(res => {
        var maildomain = res.data[0].domain;
        var mailsignin = makeid(30);
        var mailpass = makeid(20);
        mailjs.register(`${mailsignin}@${maildomain}`, `${mailpass}`).then(function (response)  {
            var mail = response.data.address;
            var final = `${mail}:${mailpass}`
            fs.appendFileSync('acc.txt', final);
            count += 1;
            log(green(`[+] Account Created -> `) + red('Email:') + magenta(mail) + red('Password:') + magenta(mailpass) + red('Count:') + magenta(count))
            setTitle(`Email Account Creator | node.sell.app | Created: ${count}`)
            gen();
            })
        })
    })
}

setTitle('Email Account Creator | node.sell.app | Starting')
gen();

