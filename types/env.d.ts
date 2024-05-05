declare module 'expo-constants' {
    export interface AppManifest {
        extra: {
            backendUrl: string;
            useMock: boolean;
        };
    }
}
