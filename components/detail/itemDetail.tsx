
import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux'
import {View,Text,Image,TextInput, YellowBox} from 'react-native';
import {Style} from '../style/style'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as React from "react"
import {
  LineChart
} from "react-native-chart-kit";

interface Navigation {
    [navigation: string]: any;
}
interface ItemDetailProps { 
    data: any
}
  /**
   * findType
   * @param typeId 
   */
  const findType = (typeId: number) => {
    switch (typeId) {
      case 1:
        return (<Text>Chung cư</Text>);
      case 2:
        return (<Text>Nhà đất</Text>);
      case 3:
        return (<Text>Mặt đường</Text>);
      case 4:
        return (<Text>Hẻm</Text>);
      default:
        return null;
      }
    }
export const ItemDetail : React.FC<ItemDetailProps> = ({
data
}) => {
    const navigation: Navigation = useNavigation()
    // const dispatch = useDispatch()
    return (
      <>
      <Text style={Style.textTopDetail3}>{findType(data.type)}</Text>
      <LineChart
        data={{
        labels: [
            data.priceDistrict[0].label,
            data.priceDistrict[1].label,
            data.priceDistrict[2].label,
            data.priceDistrict[3].label,
            data.priceDistrict[4].label,
        ],
        datasets: [
            {
            data: [
                data.priceDistrict[0].value,
                data.priceDistrict[1].value,
                data.priceDistrict[2].value,
                data.priceDistrict[3].value,
                data.priceDistrict[4].value,
            ]
            }
        ]
        }}
        width={315} // from react-native
        height={250}
        yAxisLabel=""
        yAxisSuffix="$/m2"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "#F8F8FF",
        backgroundGradientFrom: "#F8F8FF",
        backgroundGradientTo: "#F8F8FF",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#556B2F"
        }
        }}
        bezier
        style={{
        marginVertical: 10,
        borderRadius: 5
        }}
        />
    </>
    )
  }