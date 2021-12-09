import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { CarDTO } from "../../common/interfaces";
import { getFuelIcon } from "../../utils/AppUtil";
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
    onPress?: () => void;
}

export const Car = ({ data, onPress }: Props) => {
    const MotorIcon = getFuelIcon(data.fuel_type);

    return (
        <Container onPress={onPress}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${data.price}`}</Price>
                    </Rent>

                    {MotorIcon && (
                        <Type>
                            <MotorIcon />
                        </Type>
                    )}
                </About>
            </Details>

            <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
        </Container>
    );
};
