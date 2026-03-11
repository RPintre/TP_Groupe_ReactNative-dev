import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
};
LocaleConfig.defaultLocale = 'fr';

interface CustomCalendarProps {
  markedDates: any;
  onDayPress: (day: any) => void;
}

export const CustomCalendar = ({ markedDates, onDayPress }: CustomCalendarProps) => {
  return (
    <Calendar
      markedDates={markedDates}
      onDayPress={onDayPress}
      theme={{
        todayTextColor: '#00adf5',
        selectedDayBackgroundColor: '#00adf5',
        arrowColor: '#00adf5',
        dotColor: 'red',
      }}
    />
  );
};