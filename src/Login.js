import styles from "./Login.module.scss";
import { memo } from "react";

export default memo(() => {
    return (
        <div className={styles.Login}>
            <h1>个人项目管理平台</h1>
            <div className={styles.loginWrap}>
                <div className={styles.loginBg}></div>
                <div className={styles.form}>
                    <h3>登录</h3>
                    <div className="input-wrap"><span className="iconfont icon-ren"></span><input placeholder="请输入用户名"/></div>
                    <div className="input-wrap"><span className="iconfont icon-suo"></span><input placeholder="请输入密码" type="password"/></div>
                    <div className="login-btn">立即登录</div>
                </div>
            </div>
        </div>
    );
});
