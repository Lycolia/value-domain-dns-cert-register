import axios from 'axios';
import { Logger } from '../Logger';
import { VdDnsUpdateRequest } from '../../types/VdDnsAPI';
import {
  GetDnsRecordsError,
  UpdateDnsRecordsError,
} from '../../resources/ErrorDefines';
import { reThrowOrExit } from '../ReThrowOrExit';

const baseUrl = 'https://api.value-domain.com/v1';

export const requestGetRecords = async (
  rootDomain: string,
  apiToken: string
) => {
  try {
    const { data } = await axios.get(`${baseUrl}/domains/${rootDomain}/dns`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    Logger.info('Got DNS records', JSON.stringify(data.results));
    return data.results;
  } catch (err) {
    reThrowOrExit(GetDnsRecordsError.message, GetDnsRecordsError.code, err);
  }
};

export const requestUpdateRecords = async (
  rootDomain: string,
  apiToken: string,
  updateRecords: VdDnsUpdateRequest
) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/domains/${rootDomain}/dns`,
      updateRecords,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    Logger.info('Updated DNS records', JSON.stringify(data.results));
    return data.results;
  } catch (err) {
    reThrowOrExit(
      UpdateDnsRecordsError.message,
      UpdateDnsRecordsError.code,
      err
    );
  }
};
