
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
interface ItemWardsProps { 
    data: any
}
export const ItemWards : React.FC<ItemWardsProps> = ({
data
}) => {
    const navigation: Navigation = useNavigation()
    // const dispatch = useDispatch()

  /**
   * goToItemsDetailWards
   * @param districtId Id of district
   */
  const goToItemsDetailWards = (district: any) => {
    console.log('idDistrict',district);
    
    navigation.navigate('Detail', {
      district: district,
    });
  }

    return (
      <>
      <View style={Style.district}>
            <TouchableOpacity 
                style={Style.district2}
                onPress={() => goToItemsDetailWards(data)}
            >
                <Text style={Style.titleDistrict}>{data.wardsName}</Text>
                <View style={{flexDirection:"row",marginTop:4}}>
                    <Text style={Style.space}></Text>
                </View>
            </TouchableOpacity>
      </View>
    </>
    )
  }