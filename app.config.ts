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
      backendUrl: isDev ? 'http://localhost:4000' : 'http://localhost:4000',
      useMock: isDev,
    },
  };
};
