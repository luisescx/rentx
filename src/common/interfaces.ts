import { CompositeNavigationProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";
import { AccessoryType, FuelType } from "./enum";

export interface Accessory {
    type: AccessoryType;
    name: string;
}

export interface CarDTO {
    id: string;
    brand: string;
    name: string;
    about: string;
    rent: {
        period: string;
        price: number;
    };
    fuel_type: FuelType;
    thumbnail: string;
    accessories: Accessory[];
    photos: string[];
}

export type RootParamList = {
    Home: undefined;
    CarDetails: { car: CarDTO };
    Scheduling: undefined;
    SchedulingDetails: undefined;
    SchedulingComplete: undefined;
};

export interface RouteParams {
    car: CarDTO;
}

export type ProfileScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootParamList>,
    NativeStackNavigationProp<RootParamList>
>;
