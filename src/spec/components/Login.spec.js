/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import Sinon from 'sinon';
import $ from 'jquery';
import {shallow} from 'enzyme';
import Login from './../../components/Login';

expect.extend(expectJSX);

describe('Login Component', () => {
    let component;
    let sandbox;
    let event;
    let ajaxSuccessResponse;
    let error;
    beforeEach(()=> {
        error = false;
        sandbox = Sinon.sandbox.create();
        sandbox.spy(Login.prototype, "submit");
        sandbox.spy(Login.prototype, "setCookie");
        sandbox.spy(Login.prototype, "redirectHome");
        sandbox.spy(Login.prototype, "setLoginErrorMessage");
        event = {
            preventDefault : () => {
            }
        };
        sandbox.spy(event, 'preventDefault');
        ajaxSuccessResponse = {username : 'luz', id : 1};
        sandbox.stub($, 'ajax').returns({
            done : (callback) => {
                if (!error) {
                    callback(ajaxSuccessResponse);
                }
                return {
                    fail : (callback) => {
                        if (error) {
                            callback()
                        }
                    }
                }
            }
        });

        // let router = sinon.spy();
        // sandbox.stub(Login.prototype, "context").returns(router);
        // sandbox.stub(router, "push").returns({});

        component = shallow(<Login/>); //or mount(<Login/>);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe('render', () => {
        it('should render the login form', () => {
            expect(component.find('.panel').length).toEqual(1);
            expect(component.find('#username').length).toEqual(1);
            expect(component.find('#password').length).toEqual(1);
        });
    });

    describe('on submit', () => {
        let button;
        let form;
        beforeEach(()=> {
            button = component.find('#btn-login');
            form = component.find("form");
        });
        describe('password field is empty', () => {
            beforeEach(()=> {
                form.simulate('change', {target : {name : 'username', value : 'luz'}});
                button.simulate('click', event);
            });

            it('should not submit', () => {
                expect(Login.prototype.submit.calledOnce).toBe(false);
            });

            it('should set error class', () => {
                let passField = component.find("#password");
                expect(passField.parent().node.props.className).toInclude('has-error');
            });

            it('should show error message', () => {
                let passError = component.find("#password-error").node.props.children;
                expect(passError).toEqual("Password is required");
            });

            it('should remove error class and message after filling it', () => {
                form.simulate('change', {target : {name : 'password', value : 'p'}});
                let passField = component.find("#password");
                expect(passField.parent().node.props.className).toNotInclude('has-error');
                expect(component.find("#password-error").length).toEqual(0);

            });
        });

        describe('username field is empty', () => {
            beforeEach(()=> {
                form.simulate('change', {target : {name : 'password', value : 'pass'}});
                button.simulate('click', event);
            });

            it('should not submit', () => {
                expect(Login.prototype.submit.calledOnce).toBe(false);
            });

            it('should set error class', () => {
                let userField = component.find("#username");
                expect(userField.parent().node.props.className).toInclude('has-error');
            });

            it('should show error message', () => {
                let userError = component.find("#username-error").node.props.children;
                expect(userError).toEqual("Username is required");
            });

            it('should remove error class and message after filling it', () => {
                form.simulate('change', {target : {name : 'username', value : 'l'}});
                let userField = component.find("#username");
                expect(userField.parent().node.props.className).toNotInclude('has-error');
                expect(component.find("#username-error").length).toEqual(0);

            });
        });

        describe('both fields filled', () => {
            describe('submit form', () => {
                beforeEach(() => {
                    form.simulate('change', {target : {name : 'username', value : 'luz'}});
                    form.simulate('change', {target : {name : 'password', value : 'pass'}});
                    button.simulate('click', event);
                });

                it('should prevent default', () => {
                    expect(event.preventDefault.calledOnce).toBe(true);
                });

                it('should submit', () => {
                    expect(Login.prototype.submit.calledOnce).toBe(true);
                });

                it('should not have any elements with class has-error', () => {
                    let userField = component.find("#username");
                    let passField = component.find("#password");
                    expect(userField.parent().node.props.className).toNotInclude('has-error');
                    expect(passField.parent().node.props.className).toNotInclude('has-error');
                });
            });

            describe('with successful response', () => {
                beforeEach(() => {
                    form.simulate('change', {target : {name : 'username', value : 'luz'}});
                    form.simulate('change', {target : {name : 'password', value : 'pass'}});
                    button.simulate('click', event);
                });

                it('should set cookie', () => {
                    expect(Login.prototype.setCookie.calledOnce).toBe(true);
                    expect(Login.prototype.setCookie.getCall(0).args[0]).toEqual(ajaxSuccessResponse);
                });

                it('should redirect to home', () => {
                    expect(Login.prototype.redirectHome.calledOnce).toBe(true);
                });
            });

            describe('with error response', () => {
                beforeEach(() => {
                    error = true;
                    form.simulate('change', {target : {name : 'username', value : 'luz'}});
                    form.simulate('change', {target : {name : 'password', value : 'pass'}});
                    button.simulate('click', event);
                });
                it('should show error message', () => {
                    let loginErrorMessage = component.find("#login-error-message").node.props.children;
                    expect(loginErrorMessage).toEqual("An error has occurred and could not login");
                });

                it('should not set cookie', () => {
                    expect(Login.prototype.setCookie.calledOnce).toBe(false);
                });

                it('should not redirect', () => {
                    expect(Login.prototype.redirectHome.calledOnce).toBe(false);
                });
            });
        });
    });
});
