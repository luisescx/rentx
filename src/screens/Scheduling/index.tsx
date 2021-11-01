import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from "./styles";
import ArrowSvg from "../../../assets/arrow.svg";
import { Button } from "../../components/Button";
import Calendar from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";
import {
    NavigateEnum,
    ProfileScreenNavigationProp,
} from "../../common/interfaces";

export const Scheduling = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const theme = useTheme();

    const handleConfirmation = () => {
        navigation.navigate(NavigateEnum.schedulingDetails);
    };

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <BackButton onPress={() => {}} color={theme.colors.shape} />

                <Title>
                    Escolha uma {"\n"}
                    data de inicio e {"\n"}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={true}>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmation} />
            </Footer>
        </Container>
    );
};
