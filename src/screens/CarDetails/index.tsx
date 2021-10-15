import React from "react";

import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";
import { Container, Header, CarImages } from "./styles";

export const CarDetails = () => {
    return (
        <Container>
            <Header>
                <BackButton />
            </Header>

            <CarImages>
                <ImageSlider
                    imageUrl={[require("../../../assets/carsImages/Audi.png")]}
                />
            </CarImages>
        </Container>
    );
};
