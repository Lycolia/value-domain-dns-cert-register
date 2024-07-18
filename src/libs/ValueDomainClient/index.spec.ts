import axios from 'axios';
import { requestGetDnsConf, requestUpdateDnsConf } from '.';
import * as ReThrow from '../ReThrow';
import {
  GetDnsRecordsError,
  UpdateDnsRecordsError,
} from '../../resources/ErrorDefines';

jest.mock('axios');
jest.mock('../ReThrow');

describe('requestGetDnsConf', () => {
  it('正しいURLとHeaderでリクエストされること', async () => {
    const spiedGet = jest.spyOn(axios, 'get');

    await requestGetDnsConf('example.com', 'XXXX');

    expect(spiedGet).toHaveBeenCalledWith(
      'https://api.value-domain.com/v1/domains/example.com/dns',
      {
        headers: {
          Authorization: 'Bearer XXXX',
        },
      }
    );
  });

  it('例外がスローされたとき、リスローが呼ばれること', async () => {
    const err = new Error('hoge');
    jest.spyOn(axios, 'get').mockRejectedValue(err);
    const spiedReThrow = jest.spyOn(ReThrow, 'reThrow');

    await requestGetDnsConf('example.com', 'XXXX');

    expect(spiedReThrow).toHaveBeenCalledWith(
      GetDnsRecordsError.message,
      GetDnsRecordsError.code,
      err
    );
  });
});

describe('requestUpdateDnsConf', () => {
  it('正しいURLとHeaderでリクエストされること', async () => {
    const spiedPut = jest.spyOn(axios, 'put');
    const payload = {
      domainid: 1234,
      ns_type: 'vd',
      records: 'aaaaaa',
      ttl: '60',
    };

    await requestUpdateDnsConf('example.com', 'XXXX', payload);

    expect(spiedPut).toHaveBeenCalledWith(
      'https://api.value-domain.com/v1/domains/example.com/dns',
      payload,
      {
        headers: {
          Authorization: 'Bearer XXXX',
        },
      }
    );
  });

  it('例外がスローされたとき、リスローが呼ばれること', async () => {
    const err = new Error('hoge');
    jest.spyOn(axios, 'put').mockRejectedValue(err);
    const spiedReThrow = jest.spyOn(ReThrow, 'reThrow');
    const payload = {
      domainid: 1234,
      ns_type: 'vd',
      records: 'aaaaaa',
      ttl: '60',
    };

    await requestUpdateDnsConf('example.com', 'XXXX', payload);

    expect(spiedReThrow).toHaveBeenCalledWith(
      UpdateDnsRecordsError.message,
      UpdateDnsRecordsError.code,
      err
    );
  });
});
