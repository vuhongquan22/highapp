
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
interface ItemProps { 
    data: any
    index: number;
}
export const Item : React.FC<ItemProps> = ({
data, index
}) => {
    const navigation: Navigation = useNavigation()
    // const dispatch = useDispatch()

  /**
   * goToItemsDetail
   * @param districtId Id of district
   */
  const goToItemsDetail = (district: any, index: number) => {
    navigation.navigate('Detail', {
      district: district,
      index: index
    });
  }
    return (
      <>
      <View style={Style.district}>
            <TouchableOpacity 
                style={Style.district2}
                onPress={() => goToItemsDetail(data, index)}
            >
                <Text style={Style.titleDistrict}>{data.districtName}</Text>
            </TouchableOpacity>
      </View>
    </>
    )
  }