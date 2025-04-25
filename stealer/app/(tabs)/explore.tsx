import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import { Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/Pedometer';

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  //const [baseline, setBaseline] = useState<{ x: number; y: number; z: number } | null>(null);
  const [isAlarmActive, setIsAlarmActive] = useState(false); // Track if the alarm is active
  const [sensitivity, setSensitivity] = useState(0.1); // Default sensitivity
  const [time, setTime] = useState(10); // Default sensitivity

 // Use refs to persist the latest values and alarm status
 const alarmTriggeredRef = useRef(alarmTriggered);
 alarmTriggeredRef.current = alarmTriggered;
 const baselineRef = useRef<{ x: number; y: number; z: number } | null>(null);
 const latestAccelRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

 const _subscribe = () => {
   const sub = Accelerometer.addListener(({ x: newX, y: newY, z: newZ }) => {
     // Update the accelerometer values both in state and ref
     setData({ x: newX, y: newY, z: newZ });
     latestAccelRef.current = { x: newX, y: newY, z: newZ };

     if (baselineRef.current && !alarmTriggeredRef.current) {
       // Check if the change in x, y, or z exceeds the threshold
       if (
         Math.abs(baselineRef.current.x - newX) >= sensitivity ||
         Math.abs(baselineRef.current.y - newY) >= sensitivity ||
         Math.abs(baselineRef.current.z - newZ) >= sensitivity
       ) {
         console.log(baselineRef.current.x);
         console.log(baselineRef.current.y);
         console.log(baselineRef.current.z);
         setAlarmTriggered(true); // Update state
         alarmTriggeredRef.current = true; // Update ref synchronously
         Alert.alert('Alarm!', 'Your phone has been moved!');
       }
     }
   });

   setSubscription(sub);
 };

  const _unsubscribe = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const toggleAlarm = () => {
    if (isAlarmActive) {
      // Stop the alarm
      _unsubscribe();
      setAlarmTriggered(false);
      alarmTriggeredRef.current = false;
      baselineRef.current = null; // Reset baseline
      setIsAlarmActive(false);
      Alert.alert('Alarm Stopped', 'The alarm has been turned off.');
    } else {
      // Start the alarm
      setAlarmTriggered(false);
      alarmTriggeredRef.current = false;
      _subscribe();
      setIsAlarmActive(true);
      Alert.alert(`${time} sec timer`);
      setTimeout(() => {
        // Use the latest accelerometer values from the ref, not state
        baselineRef.current = { ...latestAccelRef.current };
        Alert.alert('Alarm Activated');
      }, time * 1000); // Delay for 10 seconds
    }
  };

  const resetAlarm = () => {
    if (isAlarmActive) {
      // Reset the alarm state and update the baseline
      setAlarmTriggered(false);
      alarmTriggeredRef.current = false;
      Alert.alert(`${time} sec timer`);
      setTimeout(() => {
        // Use the latest accelerometer values from the ref, not state
        baselineRef.current = { ...latestAccelRef.current };
        Alert.alert('Alarm Activated');
      }, time * 1000);
    } else {
      Alert.alert('Error', 'The alarm is not active. Start the alarm first.');
    }
  };

  useEffect(() => {
    if (isAlarmActive) {
      _subscribe();
    }
    return () => {
      if (subscription) {
        _unsubscribe();
      }
    };
  }, [isAlarmActive]); // Re-run when isAlarmActive changes

  return (
    <View style={styles.container}>
      <Text style={styles.text}>x: {x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {z.toFixed(2)}</Text>
      <Text style={styles.text}>Alarm: {isAlarmActive ? 'ON' : 'OFF'}</Text>
      <Text style={styles.text}>Sensitivity: {sensitivity.toFixed(2)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.01}
        maximumValue={1.0}
        step={0.01}
        value = {0.1}
        onValueChange={(value) => setSensitivity(value)}
      />

      <Text style={styles.text}>Timer: {time.toFixed(0)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={30}
        step={1}
        value = {10}
        onValueChange={(value) => setTime(value)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleAlarm} style={styles.button}>
          <Text>{isAlarmActive ? 'Stop Alarm' : 'Start Alarm'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetAlarm} style={styles.button}>
          <Text>Reset Alarm</Text>
        </TouchableOpacity>
      </View>
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