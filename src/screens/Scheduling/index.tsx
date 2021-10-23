import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";

import { Container, Header, Title } from "./styles";

export const Scheduling = () => {
    const theme = useTheme();

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
            </Header>
        </Container>
    );
};
