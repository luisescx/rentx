import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageSourcePropType } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

import GasolineSvg from "../../../assets/gasoline.svg";
import { CarDTO } from "../../common/interfaces";

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from "./styles";

interface Props extends RectButtonProps {
    data: CarDTO;
    onPress: () => void;
}

export const Car = ({ data, onPress }: Props) => {
    return (
        <Container onPress={onPress}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Details>

            <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
        </Container>
    );
};
