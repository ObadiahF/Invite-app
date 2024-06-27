import * as cheerio from 'cheerio';
import 'dotenv/config';


export const getGateWay = async (number) => {
    //console.log(process.env.LOOKUPCOOKIE)
    try {
        const res = await fetch("https://freecarrierlookup.com/getcarrier_free.php", {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Opera GX\";v=\"109\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": process.env.LOOKUPCOOKIE,
                "Referer": "https://freecarrierlookup.com/index.php",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `test=456Tabo&cc=1&phonenum=${number}&sessionlogin=1`,
            "method": "POST"
        })

        console.log(res);
        const info = await res.json();
        console.log(info);
        const $ = cheerio.load(info.html);
        return ($('a').attr('href')).replace("mailto:", "");
    } catch (e) {
        console.log(e);
        return null;
    }
};

getGateWay("3606678831").then(console.log)
