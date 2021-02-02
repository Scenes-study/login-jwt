const Koa = require("koa");
const app = new Koa();
const route = require('koa-route');
var bodyParser = require('koa-bodyparser');
const jwt = require('jwt-simple');
const cors = require('@koa/cors');

const secret = 'your_secret_string'; // 加密用的SECRET字符串，可随意更改
app.use(bodyParser()); // 处理post请求的参数


// JSON Web Tokens由dot（.）分隔的三个部分组成，它们是：
// =============Header（头部）=============
// {
//     "alg": "HS256", // 表示签名的算法，默认是 HMAC SHA256（写成 HS256）
//     "typ": "JWT"  // 表示Token的类型，JWT 令牌统一写为JWT
//  }
// =============Payload（负载）=============
// {
//     // 7个官方字段
//     "iss": "a.com", // issuer：签发人
//     "exp": "1d", // expiration time： 过期时间
//     "sub": "test", // subject: 主题
//     "aud": "xxx", // audience： 受众
//     "nbf": "xxx", // Not Before：生效时间
//     "iat": "xxx", // Issued At： 签发时间
//     "jti": "1111", // JWT ID：编号
//     // 可以定义私有字段
//     "name": "John Doe",
//     "admin": true
// }
// =============Signature（签名）=============
//HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
const login = ctx => {
    const req = ctx.request.body;
    const userName = req.userName;
    const expires = Date.now() + 3600000; // 设置超时时间为一小时后
    
    var payload = { 
        iss: userName,
        exp: expires
    };
    const Token = jwt.encode(payload, secret);
    ctx.response.body = {
        data: Token,
        msg: '登陆成功'
    };
}
const getUserName = ctx => {
    const reqHeader = ctx.request.headers;
   
    const token = reqHeader.authorization.split(" ")[1];
    var decoded = jwt.decode(token, secret);
    ctx.response.body = {
        data: {
            username: decoded.iss,
        },
        msg: '获取用户名成功'
    };
}
app.use(cors());
app.use(route.post('/login', login));
app.use(route.get('/getUsername', getUserName));
app.listen(3200, () => {
    console.log('启动成功');
});