import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';

export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
}

const Signup = () => {
    const dispatch = useDispatch();
    const { isSigningUp, me } = useSelector(state => state.user);

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState('');;
    const [termError, setTermError] = useState(false);;

    // 로그인을 했을 때 다른페이지로 이동하기 위함
    useEffect(() => {
        if (me) {
          alert('로그인했으니 메인페이지로 이동합니다.');
          // 링크 대신에 프로그래밍 적으로 페이지를 이동하는 것
          Router.push('/');
        }
    }, [me && me.id]); // undefined 일 수 있으니까 guard 한다.

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
              id,
              password,
              nick,
            },
        });
    }, [password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return <>
        <Form onSubmit={onSubmit} style={{ padding: 10 }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br/>
                <Input name="user-nick" value={nick} required onChange={onChangeNick} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호확인</label>
                <br/>
                <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            <div>
                <Checkbox name = "user-term" value={term} onChange={onChangeTerm}>내 말을 잘 들을 것을 동의합니다.</Checkbox>
                {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
            </div>
            <div style = {{ marginTop: 10 }}>
                <Button type="primary" htmlType="submit" loading={isSigningUp}> 가입하기 </Button>
            </div>
        </Form>
    </>
};

export default Signup;