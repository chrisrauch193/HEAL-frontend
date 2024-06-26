// src/styles/LoginScreenStyles.ts
import { StyleSheet, Platform } from 'react-native';
import GlobalStyles, { spacing, colors, fonts } from './GlobalStyles';

export const LoginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
        ...(Platform.OS === 'web' && {
            height: '100vh',
            overflowY: 'auto',
        }),
    },
    heading: {
        fontSize: fonts.title,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacing.medium,
        textAlign: 'center'
    },
    subheading: {
        fontSize: fonts.subtitle,  // フォントサイズを小さくする
        color: colors.text,  // 色を同じにする
        fontWeight: 'normal',  // フォントウェイトを通常にする
        marginBottom: spacing.small,  // マージンを調整する
        textAlign: 'center'  // テキストの位置を同じにする
    },
    input: {
        ...GlobalStyles.input,
        ...(Platform.OS === 'web' && {
            width: '100%',
        }),
    },
    button: {
        ...GlobalStyles.button,
    },
    buttonText: {
        ...GlobalStyles.buttonText,
    },
    registerLink: {
        color: colors.secondary,
        marginTop: spacing.small,
        textAlign: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
});

export default LoginScreenStyles;
