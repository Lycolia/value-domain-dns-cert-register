import axios from 'axios';
import { Logger } from '../Logger';
import { VdDnsAPIResponse, VdDnsUpdateRequest } from '../../types/VdDnsAPI';
import {
  GetDnsRecordsError,
  UpdateDnsRecordsError
} from '../../resources/ErrorDefines';
import { reThrow } from '../ReThrow';

const baseUrl = 'https://api.value-domain.com/v1';

/**
 *
 * {
 * domainid: number, domainname: string, ns_type: string, records: string, ttl: string
 * }
 */
export const requestGetDnsConf = async (
  rootDomain: string,
  apiToken: string
) => {
  try {
    const { data } = await axios.get<VdDnsAPIResponse>(
      `${baseUrl}/domains/${rootDomain}/dns`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      }
    );

    Logger.info('Got DNS records', JSON.stringify(data.results));
    return data.results;
  } catch (err) {
    reThrow(GetDnsRecordsError.message, GetDnsRecordsError.code, err);
  }
};

export const requestUpdateDnsConf = async (
  rootDomain: string,
  apiToken: string,
  updateRecords: VdDnsUpdateRequest
) => {
  Logger.info('Request updating DNS records', JSON.stringify(updateRecords));

  try {
    const { data } = await axios.put(
      `${baseUrl}/domains/${rootDomain}/dns`,
      updateRecords,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      }
    );

    Logger.info('Updated DNS records', JSON.stringify(data.results));
    return data.results;
  } catch (err) {
    reThrow(UpdateDnsRecordsError.message, UpdateDnsRecordsError.code, err);
  }
};
