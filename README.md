# Stealer

# Phone Movement Alarm App (React Native)

This mobile app uses your phone's built-in accelerometer (via gyroscope) to detect movement. If the phone is moved after a set delay, the app will trigger an **alarm alert**. It's perfect for anti-theft scenarios or simple movement detection experiments.

This project was developed by me with the assistance of AI tools

---
An example video of this app can be found through this link:
https://youtu.be/kgkKxWN8_UM

## Features

- Built with **React Native** + **Expo**
- Uses the phone's **accelerometer** to detect motion
- Customizable **activation timer**
- Adjustable **sensitivity** threshold
- Triggers an **alert** if movement is detected
- Allows resetting of the alarm without restarting the app

---

## How It Works

1. Press **"Start Alarm"** to begin the motion monitoring sequence.
2. Wait for the countdown (customizable, default is 10 seconds).
3. Once the alarm is active, if the phone is moved beyond the set sensitivity threshold, an **alarm alert** will pop up.
4. You can:
   - Press **"Stop Alarm"** to turn off the motion monitoring.
   - Press **"Reset Alarm"** to reset the baseline (current position).

---

## Adjustable Parameters

- **Sensitivity Slider**  
  Adjusts how sensitive the movement detection is (0.01 - 1.0).
  
- **Timer Slider**  
  Sets how long to wait (in seconds) before the alarm becomes active (1 - 30 seconds).

---

## Installation & Running

1. Make sure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

2. Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/gyro-alarm-app.git
cd gyro-alarm-app
npm install
```

3. Run the app:

```bash
npx expo start
```

4. Scan the QR code using the **Expo Go app** on your Android/iOS device.

---

## File Overview
- the main file for the logic is loctaed in `stealer/app/(tabs)/explore.tsx`
- `explore.tsx` — Main app logic using `expo-sensors`, React hooks, sliders, and alerts.

---

## Dependencies

- `react-native`
- `expo`
- `expo-sensors`
- `@react-native-community/slider`

---

## Use Cases

- Anti-theft table alarm
- Alert system for moved items
- Tech demo for using accelerometer data
- Educational motion detection projects
