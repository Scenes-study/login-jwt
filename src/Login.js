import { memo, useState } from "react";
import styles from "./Login.module.scss";
import { message } from "antd";


export default memo(() => {
    const [userName, setUserName] = useState();
    const [passWord, setPassWord] = useState();

    const login = () => {
        if (!userName) {
            message.warning("请输入用户名");
            return;
        }
        if (!passWord) {
            message.warning("请输入密码");
            return;
        }
        fetch('http://localhost:3200/login', {
            method: 'POST',
            body: JSON.stringify({
                userName,
                passWord
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' // no-cors, cors, *same-origin
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (res) {
                // 获取到Token,将Token放在localStorage
                document.cookie = `token=${res.data}`;
                localStorage.setItem('token', res.data);
                localStorage.setItem('token_exp', new Date().getTime());
                console.log('本地测试', res);
                message.success(res.msg);
            })
            .catch(err => {
                console.error('本地测试错误', err);
            });
    }

    return (
        <div className={styles.Login}>
            <h1>个人项目管理平台</h1>
            <div className={styles.loginWrap}>
                <div className={styles.loginBg}></div>
                <div className={styles.form}>
                    <h3>登录</h3>
                    <div className="input-wrap">
                        <span className="iconfont icon-ren"></span>
                        <input
                            placeholder="请输入用户名"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="input-wrap">
                        <span className="iconfont icon-suo"></span>
                        <input
                            placeholder="请输入密码"
                            type="password"
                            value={passWord}
                            onChange={e => setPassWord(e.target.value)}
                        />
                    </div>
                    <div className="login-btn" onClick={login}>立即登录</div>
                </div>
            </div>
        </div>
    );
});
