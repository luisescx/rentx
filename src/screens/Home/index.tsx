import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    Header,
    HeaderContent,
    Title,
    CarsList,
    MyCarsButton,
} from "./styles";
import Logo from "../../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { CarDTO, ProfileScreenNavigationProp } from "../../common/interfaces";
import api from "../../services/api";
import { NavigateEnum } from "../../common/enum";
import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Home = () => {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setLoading] = useState(true);

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleCarPress = (car: CarDTO) => {
        navigation.navigate(NavigateEnum.carDetails, { car });
    };

    const handleMyCars = () => {
        navigation.navigate(NavigateEnum.myCars);
    };

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get("/cars");
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    <Title>{`Total de ${cars.length} carros`}</Title>
                </HeaderContent>
            </Header>

            {isLoading ? (
                <Loading />
            ) : (
                <CarsList
                    data={cars}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Car data={item} onPress={() => handleCarPress(item)} />
                    )}
                />
            )}

            <MyCarsButton>
                <Ionicons
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                    onPress={handleMyCars}
                />
            </MyCarsButton>
        </Container>
    );
};
