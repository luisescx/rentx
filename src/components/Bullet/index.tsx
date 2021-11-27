import React from "react";

import { Container } from "./styles";

interface Props {
    active: boolean;
}

const Bullet = ({ active }: Props) => {
    return <Container active={active} />;
};

export default Bullet;
