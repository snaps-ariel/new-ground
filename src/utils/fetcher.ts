import Cookies from 'js-cookie';
interface IRequestOptions {
  method?: string;
  headers?: Headers;
  mode?: string;
  cache?: string;
  body?: Record<string, any> | string;
}

interface IInterceptors {
  request: (args: IRequestOptions) => void;
}

interface IDefaultOptions {
  baseURL: string | undefined;
  headers: {
    'Content-type': string;
    'X-SNAPS-CHANNEL': string;
  };
  mode: string;
  interceptors: IInterceptors;
}

const defaultOptions: IDefaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'X-SNAPS-CHANNEL': 'DA_WEB',
  },
  mode: 'cors',
  interceptors: {
    request: (args: IRequestOptions) => {
      const token = Cookies.get('OH_PRINT_ME_GROUND_USER_TOKEN');

      if (!token) return;

      if (token) {
        if (!args.headers) {
          args.headers = new Headers();
        }
        args.headers.set('X-SNAPS-TOKEN', token);
      }
    },
  },
};

const fetcher =
  (defaultOptions: IDefaultOptions) =>
  async (url: string, options: IRequestOptions = {}) => {
    const requestOptions: IRequestOptions = {
      method: options.method || 'GET',
      headers: new Headers(defaultOptions.headers),
      mode: defaultOptions.mode,
      ...options,
    };

    defaultOptions.interceptors.request(requestOptions);

    const fullURL = defaultOptions.baseURL + url;

    if (requestOptions.method === 'POST' && requestOptions.body !== undefined) {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }

    console.log('fullURL', fullURL);

    try {
      const response = await fetch(fullURL, requestOptions);
      console.log('response', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const customFetcher = fetcher(defaultOptions);
