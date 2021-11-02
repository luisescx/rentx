import React from "react";
import {
    Calendar as CustomCalendar,
    DateCallbackHandler,
    MarkedDateProps,
    LocaleConfig,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { ptBr } from "./localeConfig";

LocaleConfig.locales["pt-br"] = ptBr;
LocaleConfig.defaultLocale = "pt-br";

interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: DateCallbackHandler;
}

const Calendar = ({ markedDates, onDayPress }: CalendarProps) => {
    const theme = useTheme();

    return (
        <CustomCalendar
            renderArrow={(direction) => (
                <Feather
                    size={24}
                    color={theme.colors.text}
                    name={
                        direction === "left" ? "chevron-left" : "chevron-right"
                    }
                />
            )}
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
            }}
            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontFamily: theme.fonts.secondary_600,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15,
                },
            }}
            firstDay={1}
            minDate={new Date()}
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    );
};

export default Calendar;
