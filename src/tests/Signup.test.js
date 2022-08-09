import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { Signup } from '../components/Signup';

configure({ adapter: new Adapter() });
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('creates SIGNUP_SUCCESS when creating user', () => {
      const user = {
        firstName: 'hishamunda',
        lastname: 'heritier',
        username: 'hiheritier',
        role: 'requester',
        phoneNumber: '0789164181',
        gender: 'male',
        email: 'hishamunda221015883@gmail.com',
        password: 'heritier',
        repeat_password: 'heritier',
      };
    });

    it('creates SIGNUP_SUCCESS when creating user', () => {
        const user = {
          firstName: 'hishamunda',
          lastname: 'heritier',
          username: 'hiheritier',
          role: 'requester',
          phoneNumber: '0789164181',
          gender: 'male',
          email: 'hishamunda221015883@gmail.com',
          password: 'heritier',
          repeat_password: 'heritier',
        };
      });

      it('creates SIGNUP_SUCCESS when creating user', () => {
        const user = {
          firstName: 'hishamunda',
          lastname: 'heritier',
          username: 'hiheritier',
          role: 'requester',
          phoneNumber: '0789164181',
          gender: 'male',
          email: 'hishamunda221015883@gmail.com',
          password: 'heritier',
          repeat_password: 'heritier',
        };
      });

      it('check password', () => {
        const user = {
          password: 'heritier',
          repeat_password: 'heritier',
        };
      });
  });









