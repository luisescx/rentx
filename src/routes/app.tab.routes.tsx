import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { RootParamList } from "../common/interfaces";
import MyCars from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

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
            <Screen name="HomeTab" component={AppStackRoutes} />
            <Screen name="Profile" component={Home} />
            <Screen name="MyCars" component={MyCars} />
        </Navigator>
    );
}
