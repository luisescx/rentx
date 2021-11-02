import { AccessoryType, FuelType } from "../common/enum";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import EnergySvg from "../../assets/energy.svg";
import HybridSvg from "../../assets/hybrid.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

import { addDays } from "date-fns";
import { Platform } from "react-native";

export function getAccessoryIcon(type: AccessoryType) {
    switch (type) {
        case AccessoryType.speed:
            return SpeedSvg;
        case AccessoryType.acceleration:
            return AccelerationSvg;
        case AccessoryType.turning_diameter:
            return ForceSvg;
        case AccessoryType.gasoline_motor:
            return GasolineSvg;
        case AccessoryType.electric_motor:
            return EnergySvg;
        case AccessoryType.hybrid_motor:
            return HybridSvg;
        case AccessoryType.exchange:
            return ExchangeSvg;
        case AccessoryType.seats:
            return PeopleSvg;
        default:
            break;
    }
}

export function getFuelIcon(type: FuelType) {
    switch (type) {
        case FuelType.gasoline_motor:
            return GasolineSvg;
        case FuelType.electric_motor:
            return EnergySvg;
        case FuelType.hybrid_motor:
            return HybridSvg;
        default:
            break;
    }
}

export function getPlatformDate(date: Date) {
    // if (Platform.OS === "ios") {
    //     console.log("ios");
    // return addDays(date, 1);
    // }

    return addDays(date, 1);
    // return date;
}
