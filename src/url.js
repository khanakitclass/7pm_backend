const url = require("url");

console.log(url.parse("https://www.flipkart.com/noise-crew-go-1-39-display-bt-calling-metal-strap-7-days-battery-life-smartwatch/p/itm0e03c14e438f7?pid=SMWGZW3CCRQGAWW7&lid=LSTSMWGZW3CCRQGAWW7EFOBHP&marketplace=FLIPKART&store=ajy&srno=b_1_1&otracker=browse&fm=organic&iid=en_91SGSHxRYUKlAqDnAL37NG4KJYk3io13jCEJnYZu6Z-DLLd30JOdlzE2ZE9xD6yeJGQCJ9l8xDMpvsZdv9GxAw%3D%3D&ppt=browse&ppn=browse&ssid=d2mop9y77k0000001737515596190", true).query.pid);

const obj = {
    protocol: 'https:',
    hostname: 'www.abc.com',
    query: {
        pid: 123
    }
}

console.log(url.format(obj));

console.log(url.resolve("https://www.abc.com/", "/products/123"));


