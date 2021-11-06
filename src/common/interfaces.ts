import { CompositeNavigationProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

export interface RouteParams {
    car: CarDTO;
    dates: string[];
}

export interface RentalPeriod {
    start?: number;
    startFormatted: string;
    end?: number;
    endFormatted: string;
}

export type RootParamList = {
    Home: undefined;
    CarDetails: { car: CarDTO; dates?: string[] };
    Scheduling: { car: CarDTO; dates?: string[] };
    SchedulingDetails: { car: CarDTO; dates?: string[] };
    SchedulingComplete: undefined;
    MyCars: undefined;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootParamList>,
    NativeStackNavigationProp<RootParamList>
>;
