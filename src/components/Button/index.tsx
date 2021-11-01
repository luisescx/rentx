import React from "react";

import { Container, Title } from "./styles";

interface Props {
    title: string;
    color?: string;
    onPress: () => void;
}

export const Button = ({ title, color, onPress }: Props) => {
    return (
        <Container onPress={onPress} color={color}>
            <Title>{title}</Title>
        </Container>
    );
};
