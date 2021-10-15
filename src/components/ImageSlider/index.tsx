import React from "react";
import { ImageSourcePropType } from "react-native";

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from "./styles";

interface Props {
    imageUrl: string[];
}

const ImageSlider = ({ imageUrl }: Props) => {
    const activeImage = imageUrl[0] as ImageSourcePropType;

    return (
        <Container>
            <ImageIndexes>
                <ImageIndex active={true} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
            </ImageIndexes>

            <CarImageWrapper>
                <CarImage source={activeImage} resizeMode="contain" />
            </CarImageWrapper>
        </Container>
    );
};

export default ImageSlider;
