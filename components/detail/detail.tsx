import { useNavigation } from "@react-navigation/native"
import {View,ImageBackground, Image, Text, FlatList, TextInput} from 'react-native';
import {Style} from'../style/style'
import {
    LineChart,
    ProgressChart,
} from "react-native-chart-kit";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from "react"
import { getDetailDistrict } from "../list/list-repository";
import { PRICE_DISTRICT } from "../dummy/priceDistrict";
import { ItemDetail } from "./itemDetail";
import { WARDS } from "../dummy/wards";
import { ItemWards } from "./itemWards";
interface Navigation {
    [navigation: string]: any;
}

export const DetailScreen = (props: any) => {
    console.log('props',props);
    
    const navigation: Navigation = useNavigation()
    const params = props.route?.params
    const [detailDistrictData, setDetailDistrictData] = useState<any>()
    const [wardsData, setWardsData] = useState<any>()

   /** 
   * Call API
   */
  React.useEffect(() => {
    callApigetDetailDistrict()
    callApigetWards()
  }, [])

  /**
   * findPricebyType
   * @param type 
   */
  const findPricebyType = (item: any) => {
    switch (item.type) {
        case 1:
          return (
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text style={{
                color:"#000",
                opacity:0.6,
                fontSize:14
            }}>Chung cư: </Text>
            <Text style={{
                fontSize:13,
                color:"#B8B8B8",
                marginLeft:25
            }}>{item.priceDistrict[2].value}
            </Text>
            </View>
          )
        case 2:
            return (
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{
                    color:"#000",
                    opacity:0.6,
                    fontSize:14
                }}>Nhà đất: </Text>
                <Text style={{
                    fontSize:13,
                    color:"#B8B8B8",
                    marginLeft:25
                }}>{item.priceDistrict[2].value}
                </Text>
                </View>
              )
        case 3:
            return (
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{
                    color:"#000",
                    opacity:0.6,
                    fontSize:14
                }}>Mặt đường: </Text>
                <Text style={{
                    fontSize:13,
                    color:"#B8B8B8",
                    marginLeft:25
                }}>{item.priceDistrict[2].value}
                </Text>
                </View>
              )
        case 4:
            return (
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{
                    color:"#000",
                    opacity:0.6,
                    fontSize:14
                }}>Hẻm: </Text>
                <Text style={{
                    fontSize:13,
                    color:"#B8B8B8",
                    marginLeft:25
                }}>{item.priceDistrict[2].value}
                </Text>
                </View>
              )
        default:
          return null;
        }
  }

  /**
   * callApigetDetailDistrict
   * @param params 
   */
  async function callApigetDetailDistrict() {
    // try {
    //     const responseData = await getDetailDistrict({ districtId: params?.district?.districtId })
    //     setDetailDistrictData(responseData?.data)
    //   } catch (e) {
    // }
    setDetailDistrictData(PRICE_DISTRICT)
}
  /**
   * callApigetDetailDistrict
   * @param params 
   */
  async function callApigetWards() {
    // try {
    //     const responseData = await getWards({ districtId: params?.district?.districtId })
    //     setWardsData(responseData?.data)
    //   } catch (e) {
    // }
    setWardsData(WARDS)
}
    return (
        <ScrollView >
            <View style={Style.detailTop}> 
                    <ImageBackground source={{}} style={Style.detailTopImage}>
                        <View style={Style.detailTopView}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <View style={Style.viewTopdetail1}>
                        <View style={Style.viewTopDetail2}>
                            <View>
                                <Text style={Style.textTopDetail2}> {params?.district?.districtName}</Text>
                                <Text style={Style.textTopDetail1}>Chi tiết loại nhà đất ( Giá trung bình )</Text>
                                <FlatList
                                    data={detailDistrictData}
                                    renderItem={({ item }: any) => {
                                        return (
                                        <>
                                            {findPricebyType(item)}
                                        </>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                <View style={{
                    backgroundColor:"#FFF",
                    padding:10,
                    borderRadius:15
                }}>
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        
                    }}>
                   <View>
                        <Text style={Style.textTopDetail1}>Biến động giá
                        </Text>
                        <FlatList
                            data={detailDistrictData}
                            renderItem={({ item }: any) => {
                            return (
                                <>
                                <ItemDetail data={item}/>
                                </>
                            )
                            }}
                        />
                    </View>
                </View>
            </View>
            <ScrollView >
            <View style={{
                backgroundColor:"#FFF",
                borderRadius:15,
                padding:20,
                marginTop:20,
                height:240

            }}>
                <Text style={{
                    fontSize:20,
                    marginBottom:10
                }}>Danh sách các phường</Text>
                     <View style={Style.searchOfList}>
                        <TextInput
                        // value={search.text}
                        placeholder="Bạn muốn tìm kiếm gì?"
                        placeholderTextColor="#B0B0B0"
                        style={Style.textInputSearchOfList}
                        // onChangeText={(text) => {
                        //     txtSearch = text;
                        //     handleChangeSearch(text)}}
                        />
                    </View>
               <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: 'center',
                    }}
                    data={wardsData}
                    renderItem={({ item }: any) => {
                        return (
                        <>
                        <ItemWards data={item}/>
                        </>
                        )
                    }}
                />
            </View>
            </ScrollView>
            </View>
        </ScrollView>
    )
}

