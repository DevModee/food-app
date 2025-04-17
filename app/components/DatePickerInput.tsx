import React from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';

type DatePickerInputProps = {
  date: Date;
  setDate: (date: Date) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({ date, setDate }) => {
  const handleDateChange = (selectedDate: string) => {
    const parsedDate = new Date(selectedDate);
    setDate(parsedDate);
  }


  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Selecciona una fecha:</Text>
      <DatePicker
        date={date}
        onDateChange={handleDateChange}
        mode="date"
        placeholder="Selecciona una fecha"
        format="YYYY-MM-DD"
        confirmBtnText="Confirmar"
        CancelBtnText="Cancelar"
        androidVariant="nativeAndroid"
        style={{ width: '200' }}
        maxDate={new Date().toISOString().split('T')[0]}
      />
    </View>
  );
};

export default DatePickerInput;
