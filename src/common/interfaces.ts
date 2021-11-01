import { CompositeNavigationProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface CarProps {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    };
    thumbnail: string;
}

export enum NavigateEnum {
    home = "Home",
    carDetails = "CarDetails",
    scheduling = "Scheduling",
    schedulingDetails = "SchedulingDetails",
    schedulingComplete = "SchedulingComplete",
}

export type RootParamList = {
    Home: undefined;
    CarDetails: undefined;
    Scheduling: undefined;
    SchedulingDetails: undefined;
    SchedulingComplete: undefined;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootParamList>,
    NativeStackNavigationProp<RootParamList>
>;
