import { KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";

export const Container = styled(KeyboardAvoidingView)`
    flex: 1;

    margin-top: ${getStatusBarHeight()}px;
`;
