import "react-native-calendars";

declare module "react-native-calendars" {
    interface DateObject {
        day: number;
        dateString: string;
        month: number;
        timestamp: number;
        year: number;
    }

    export type DateCallbackHandler = (date: DateObject) => void;

    export interface MarkedDateProps {
        [date: string]: {
            color: string;
            textColor: string;
            disabled?: boolean;
            disableTouchEvent?: boolean;
        };
    }
}
