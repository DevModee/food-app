import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

type DatePickerInputProps = {
  date: Date;
  setDate: (date: Date) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({ date, setDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Selecciona una fecha:</Text>
      <Button title={`📅 ${date.toLocaleDateString()}`} onPress={showDatePicker} />
      <Modal visible={isDatePickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            maximumDate={new Date()}
            mode="date"
          />
          <Button title="Cerrar" onPress={hideDatePicker} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DatePickerInput;
