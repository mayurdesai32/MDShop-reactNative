import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { colors } from '../styles/style';
const screenWidth = Dimensions.get('window').width - 135;
const Chart = ({ inStock, outOfStock = 0 }) => {
  const data = [
    {
      name: 'Out Of stock',
      population: outOfStock,
      color: colors.color1_light,
      legendFontColor: colors.color2,
    },
    {
      name: 'In stock',
      population: inStock,
      color: colors.color1_light2,
      legendFontColor: colors.color2,
    },
  ];
  const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: '#08130D',
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false, // optional
  };
  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={colors.color3}
        absolute
      />
    </View>
  );
};

export default Chart;
