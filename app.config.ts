import 'dotenv/config';

interface AppConfig {
  extra: {
    backendUrl: string;
    useMock: boolean;
  };
}

export default ({ config }): AppConfig => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    ...config,
    extra: {
      backendUrl: isDev ? 'http://192.168.0.5:4000' : 'http://192.168.0.5:4000',
      useMock: isDev,
    },
  };
};
