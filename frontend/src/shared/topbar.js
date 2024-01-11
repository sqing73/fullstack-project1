import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isLogin, bindURL } from './utils';
import { NormalButton } from './widget'

import { TopBarContainer, PanelContainer, PanelBoxContainer } from '../ui/topbar'
import { topbarLink, userMenuLink } from '../ui/link'
import { DEBUG, LOGIN } from "./config.js"

export default function TopBar() {
  const [state, setState] = useState({
    panel: false,
    focusText: 'Login',
    uid: -1,
    user: null,
  });

  const initTopbar = () => {
    if (DEBUG) {
        if (LOGIN) {
            var nickname = 'test';
            setState(prevState => ({
                ...prevState,
                uid: 114514,
                focusText: nickname,
                user: {
                    "uid": 114514,
                    "nickname": "test",
                    "avatar": "xxxxxxx.jpg",
                    "email": "11223344@qq.com",
                    "tel": "110",
                    "is_admin": 1,
                    "reg_time": "2018年 1月7日 21:51 UTC+8",
                    "selfintro": "Wizard of Legend"
                },
            }));
        }
    } else {
        if (isLogin()) {
            fetch(bindURL + '/api/users', {
                credentials: 'include',
            })
            .then(response => response.json())
            .then(json => {
            var nickname = json['nickname'];
            if (json['is_admin']) {
                nickname = '[Admin] ' + nickname;
            }
            setState(prevState => ({
                ...prevState,
                uid: json['uid'],
                focusText: nickname,
                user: json,
            }));
            })
            .catch(ex => {
            console.log('Init topbar failed', ex);
            });
        }
    }
  };

  const showPanel = () => {
    setState(prevState => ({
      ...prevState,
      panel: !prevState.panel,
    }));
  };

  useEffect(() => {
    initTopbar();
  }, []);

    return (
        <TopBarContainer>
            <div id="mainmenu">
                <div className="nav">
                    <div className="left">
                        <div className="ul">
                            <div className="li">
                                <Link href="/" className={`link ${topbarLink.className}`}>
                                    <img style={{ height: 50 + 'px' }} src="/img/auto-bbs.png" />
                                </Link>
                            </div>
                            <div className="li">
                                <Link href="/" className={`link ${topbarLink.className}`}>Home</Link>
                            </div>
                            <div className="li">
                                <Link href="/about" className={`link ${topbarLink.className}`}>About</Link>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="li">
                            <div
                                className="active link"
                                onClick={showPanel}>
                                {state.focusText}
                            </div>
                        </div>
                        <div>
                            {
                                isLogin()
                                    ?
                                    user
                                        ?
                                        <UserMenuPanel visible={state.panel} user={user} />
                                        :
                                        <div></div>
                                    :
                                    <LoginRegisterPanel visible={state.panel} />
                            }
                        </div>
                    </div>
                </div>
                {topbarLink.styles}
            </div>
        </TopBarContainer>
    );
};


const UserMenuPanel = ({ user, visible }) => {
    const [uid, setUid] = useState(user?.uid || null);
    const router = useRouter();
  
    const logout = async () => {
      try {
        const response = await fetch(`${bindURL}/api/login`, {
          method: 'DELETE',
          credentials: 'include',
        });
  
        if (response.status === 200) {
          console.log('Logout success.');
          document.cookie = 'isLogin=false; path=/;';
          router.reload(); // location.replace(location.href);
        } else {
          console.log('Logout failed.');
        }
      } catch (ex) {
        console.log('Logout error.', ex);
      }
    };
  
    return (
      <PanelContainer>
        <div className="um-panel-wrapper">
            {visible ? (
            <div className="lr-panel">
                <div className="um-panel-content">
                <Link href={`/users/${uid}`} passHref>
                    <a className={`menu ${userMenuLink.className}`}>Info</a>
                </Link>
                <Link href="/account" passHref>
                    <a className={`menu ${userMenuLink.className}`}>Setting</a>
                </Link>
                <div className="um-panel-menu" onClick={logout}>
                    Logout
                </div>
                </div>
            </div>
            ) : (
            <div></div>
            )}
            {userMenuLink.styles}
        </div>
      </PanelContainer>
    );
  };

const LoginRegisterPanel = ({ visible }) => {
    const [loginActive, setLoginActive] = useState(true);
  
    const showLoginBox = () => {
      setLoginActive(true);
    };
  
    const showRegisterBox = () => {
      setLoginActive(false);
    };
  
    return (
      <PanelContainer>
        <div className="lr-panel-wrapper">
            {visible ? (
            <div className="lr-panel">
                <div className="lr-panel-content">
                <div className="box-controller">
                    <div
                    className={`controller ${loginActive ? 'selected' : ''}`}
                    onClick={showLoginBox}
                    >
                    Login
                    </div>
                    <div
                    className={`controller ${loginActive ? '' : 'selected'}`}
                    onClick={showRegisterBox}
                    >
                    Register
                    </div>
                </div>
                <div>{loginActive ? <LoginBox /> : <RegisterBox />}</div>
                </div>
            </div>
            ) : (
            <div></div>
            )}
        </div>
      </PanelContainer>
    );
  };

const LoginBox = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const validateForm = () => {
    return formData.username.length > 0 && formData.password.length > 0;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    // WARNING!!: Delete DEBUG line after development, please.
    console.log('[l]: username: %s, password: %s', formData.username, formData.password);

    if (validateForm()) {
      fetch(bindURL + '/api/login', {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Login Success.');
            document.cookie = 'isLogin=true;path=/;';
            location.replace(location.href);
          } else {
            console.log('Login Failed.');
          }
        })
        .catch((ex) => {
          console.log('Login error.', ex);
        });
    }
  };

  return (
    <PanelBoxContainer>
    <div className="panel-box">
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={formData.username}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={formData.password}
      />
      <div className="panel-box-buttom">
      <NormalButton variant="contained" onClick={login}>Login</NormalButton>
      </div>
    </div>
    </PanelBoxContainer>
  );
};

const RegisterBox = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  
    const validateForm = () => {
      return formData.username.length > 0 && formData.password.length > 0;
    };
  
    const handleChange = (event) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
      }));
    };
  
    const register = (e) => {
      e.preventDefault();
  
      // WARNING!!: Delete DEBUG line after development, please.
      console.log(`[r]: username: ${formData.username}, password: ${formData.password}`);
  
      if (validateForm()) {
        fetch(bindURL + '/api/users', {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/json',
          }),
          mode: 'cors',
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Register Success.');
            } else {
              console.log('Register Failed.');
            }
          })
          .catch((error) => {
            console.error('Register error.', error);
          });
      }
    };
  
    return (
      <PanelBoxContainer>
        <div className="panel-box">
            <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            />
            <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            />
            <div className="panel-box-buttom">
            <NormalButton variant="contained" onClick={register}>Register</NormalButton>
            </div>
        </div>
      </PanelBoxContainer>
    );
  };

  