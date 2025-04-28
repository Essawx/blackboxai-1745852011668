import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [sensorData, setSensorData] = useState({
    temperature: [],
    pH: [],
    waterLevel: [],
  });

  // Simulate fetching sensor data from cloud or MQTT
  useEffect(() => {
    // TODO: Replace with real data fetching logic
    const interval = setInterval(() => {
      setSensorData(prevData => ({
        temperature: [...prevData.temperature, Math.random() * 10 + 20].slice(-20),
        pH: [...prevData.pH, Math.random() * 2 + 6].slice(-20),
        waterLevel: [...prevData.waterLevel, Math.random() * 50 + 50].slice(-20),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Smart Aquarium Dashboard</Text>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Temperature (°C)</Text>
          <LineChart
            data={{
              labels: sensorData.temperature.map((_, i) => i.toString()),
              datasets: [{ data: sensorData.temperature }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisSuffix="°C"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>pH Level</Text>
          <LineChart
            data={{
              labels: sensorData.pH.map((_, i) => i.toString()),
              datasets: [{ data: sensorData.pH }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisSuffix=""
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Water Level (%)</Text>
          <LineChart
            data={{
              labels: sensorData.waterLevel.map((_, i) => i.toString()),
              datasets: [{ data: sensorData.waterLevel }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisSuffix="%"
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#e0f7fa',
  backgroundGradientTo: '#80deea',
  color: (opacity = 1) => `rgba(0, 77, 64, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 77, 64, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#004d40',
    textAlign: 'center',
  },
  chartContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#00796b',
  },
  chart: {
    borderRadius: 16,
  },
});
