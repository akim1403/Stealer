import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Slider from '@react-native-community/slider';


export default function HomeScreen() {
  const [movementDetected, setMovementDetected] = useState(false);
  const [sensitivity, setSensitivity] = useState(0); // Default sensitivity
  const [value, setValue] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Sensitivity: {sensitivity.toFixed(2)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={sensitivity}
              onValueChange={(value) => setSensitivity(value)}
            />
            <Text style={styles.text}>{value && +value.toFixed(3)}</Text>
            <Text style={styles.text}>Sensitivity: {value.toFixed(2)}</Text>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={0.5}
        style={styles.slider}
        value={value}
        //onValueChange={setValue}
        onValueChange={(value) => setValue(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  slider: {
    width: '80%',
    marginTop: 20,
  },
});

