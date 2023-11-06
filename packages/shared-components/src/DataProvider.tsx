import qs from 'query-string';
import React, { useMemo, useState } from 'react';

const getLocationSearch = (self: any) => {
  const locationSearchStr = qs.parse(self?.location?.search || '')?._search as any;
  const parsedLocationSearch = JSON.parse(locationSearchStr || '{}');
  return parsedLocationSearch;
};

export interface DataProviderProps {
  render: (params: { [key: string]: any }) => JSX.Element;
  self: any;
  sdkInitFunc?: {
    enabled: boolean;
    func?: string;
    params?: object;
  };
  sdkSwrFuncs?: {
    func: string;
    params: object;
    enableLocationSearch?: boolean;
  }[];
}

const DataProvider: React.FC<DataProviderProps> = props => {
  const { render, sdkInitFunc, sdkSwrFuncs, self } = props;
  const sdk = useMemo(() => {
    if (sdkInitFunc?.enabled && sdkInitFunc?.func) {
      const _sdk = self.appHelper.utils[sdkInitFunc.func]?.(sdkInitFunc.params);
      if (_sdk) {
        return _sdk;
      }
    }
    return self.appHelper.utils.sdk || self.appHelper.utils.bff;
  }, []);

  const queryStateArray = sdkSwrFuncs?.map(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [query, setQuery] = useState<any>();
    return {
      query,
      setQuery,
    };
  });

  const resArray = sdkSwrFuncs?.map(({ func, params, enableLocationSearch }, index) => {
    const variables = Object.assign(
      {},
      params,
      enableLocationSearch ? getLocationSearch(self) : queryStateArray?.[index]?.query || {}
    );
    return sdk[func]?.(variables);
  });

  const renderParams = useMemo(() => {
    const params: { [key: string]: any } = {};
    sdkSwrFuncs?.forEach(({ func }, index) => {
      params[func] = resArray?.[index];
      if (params[func]) {
        params[func].fetch = (query: any) => {
          const assignQuery = Object.assign({}, queryStateArray?.[index]?.query, { [func]: query });
          queryStateArray?.[index]?.setQuery(assignQuery);
        };
      }
    });
    return params;
  }, [resArray]);
  return render(renderParams);
};

export default DataProvider;
