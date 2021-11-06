import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { CarDTO } from "../../common/interfaces";
import api from "../../services/api";

import { Container } from "./styles";

const MyCars = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [myCars, setMyCars] = useState<CarDTO[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/schedules_byuser?user_id=1");
                setMyCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
        </Container>
    );
};

export default MyCars;
