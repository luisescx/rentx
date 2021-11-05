import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { CarDTO } from "../../common/interfaces";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: flex-end;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFValue(32)}px ${RFValue(24)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;

export const CarsList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
    contentContainerStyle: {
        padding: 24,
    },
    showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;

    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.main};
    border-radius: 30px;
    position: absolute;
    bottom: 13px;
    right: 22px;
`;
