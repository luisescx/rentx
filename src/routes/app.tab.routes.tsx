import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../common/interfaces";
import MyCars from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import HomeSvg from "../../assets/home.svg";
import CarSvg from "../../assets/car.svg";
import PeopleSvg from "../../assets/people.svg";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator<RootParamList>();

export function AppTabRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: theme.colors.text_detail,
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    paddingVertical: Platform.OS === "ios" ? 20 : 0,
                    height: 72,
                    backgroundColor: theme.colors.background_primary,
                },
            }}
        >
            <Screen
                name="HomeTab"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ),
                }}
            />
            <Screen
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    ),
                }}
            />
            <Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ),
                }}
            />
        </Navigator>
    );
}
