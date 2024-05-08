import axios from 'axios';
import { requestGetRecords, requestUpdateRecords } from '.';
import * as ReThrowOrExit from '../ReThrowOrExit';
import {
  GetDnsRecordsError,
  UpdateDnsRecordsError,
} from '../../resources/ErrorDefines';

jest.mock('axios');
jest.mock('../ReThrowOrExit');

describe('requestGetRecords', () => {
  it('正しいURLとHeaderでリクエストされること', async () => {
    const spiedGet = jest.spyOn(axios, 'get');

    await requestGetRecords('example.com', 'XXXX');

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
    const spiedReThrowOrExit = jest.spyOn(ReThrowOrExit, 'reThrowOrExit');

    await requestGetRecords('example.com', 'XXXX');

    expect(spiedReThrowOrExit).toHaveBeenCalledWith(
      GetDnsRecordsError.message,
      GetDnsRecordsError.code,
      err
    );
  });
});

describe('requestUpdateRecords', () => {
  it('正しいURLとHeaderでリクエストされること', async () => {
    const spiedPut = jest.spyOn(axios, 'put');
    const payload = {
      domainid: 1234,
      ns_type: 'vd',
      records: 'aaaaaa',
      ttl: '60',
    };

    await requestUpdateRecords('example.com', 'XXXX', payload);

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
    const spiedReThrowOrExit = jest.spyOn(ReThrowOrExit, 'reThrowOrExit');
    const payload = {
      domainid: 1234,
      ns_type: 'vd',
      records: 'aaaaaa',
      ttl: '60',
    };

    await requestUpdateRecords('example.com', 'XXXX', payload);

    expect(spiedReThrowOrExit).toHaveBeenCalledWith(
      UpdateDnsRecordsError.message,
      UpdateDnsRecordsError.code,
      err
    );
  });
});
