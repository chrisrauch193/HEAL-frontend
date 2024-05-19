import 'dotenv/config';

interface AppConfig {
  extra: {
    backendUrl: string;
    useMock: boolean;
    eas: {
      projectId: string;
    }
  };
  updates?: {
    url: string;
  };
  runtimeVersion?: {
    policy: string;
  };
  android?: {
    package: string;
    userInterfaceStyle?: string;
  };
  ios?: {
    bundleIdentifier: string;
    userInterfaceStyle?: string;
  };
}

export default ({ config }): AppConfig => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    ...config,
    extra: {
      backendUrl: isDev ? 'http://127.0.0.1:8888' : 'http://13.208.164.92:8888',
      useMock: isDev,
      eas: {
        projectId: "eba95232-91ba-4791-b166-42dbd7e8803d"
      }
    },
    updates: {
      url: "https://u.expo.dev/eba95232-91ba-4791-b166-42dbd7e8803d"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    android: {
      package: "com.chrisrauch193.heal",
      userInterfaceStyle: "automatic" // Enable user interface style for Android
    },
    ios: {
      bundleIdentifier: "com.chrisrauch193.heal",
      userInterfaceStyle: "automatic" // Enable user interface style for iOS
    }
  };
};
