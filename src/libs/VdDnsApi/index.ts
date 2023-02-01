import axios from 'axios';
import { AppError } from 'src/libs/App/AppError';
import { Log } from 'src/libs/App/Log';
import { ErrorReason } from 'src/resorces/ErrorReason';
import {
  ValueDomainPayload,
  ValueDomainResultResponse,
} from 'src/types/ValueDomain';

const baseUrl = 'https://api.value-domain.com/v1';

const getDnsRecord = async (vd: ValueDomainPayload) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/domains/${vd.rootDomain}/dns`,
      {
        headers: {
          Authorization: `Bearer ${vd.accessToken}`,
        },
      }
    );

    Log.info('Got DNS records', JSON.stringify(data.results));
    return data.results as ValueDomainResultResponse;
  } catch (err) {
    return AppError.createError(ErrorReason.failGetDnsRecord, err);
  }
};

const setDnsRecord = async (
  vd: ValueDomainPayload,
  dnsRecords: ValueDomainResultResponse
) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/domains/${vd.rootDomain}/dns`,
      dnsRecords,
      {
        headers: {
          Authorization: `Bearer ${vd.accessToken}`,
        },
      }
    );

    Log.info('Updated DNS records', JSON.stringify(data.results));
    return data.results as ValueDomainResultResponse;
  } catch (err) {
    return AppError.createError(ErrorReason.failUpdateDnsRecord, err);
  }
};

export const VdDnsApi = {
  getDnsRecord,
  setDnsRecord,
};
