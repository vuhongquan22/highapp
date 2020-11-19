import * as React from 'react';
import { useState } from "react"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {View,Text,Image,TextInput, FlatList} from 'react-native';
import {Style} from '../components/style/style'
import {DISTRICT} from '../components/dummy/district'
import {Item} from "../components/list/item"
import {
  LineChart
} from "react-native-chart-kit";
interface Search {
  text: string
  districtList: Array<any>,
}
import DropDownPicker from 'react-native-dropdown-picker';
export default function TabOneScreen() {
  const [districtData, setDistrictData] = useState<any>()
  const [districtDataSearch, setDistrictDataSearch] = useState<any>()
  const [searchText, setSearchText] = useState(false)
  
  let txtSearch = ''

  /** 
   * Call API
   */
  React.useEffect(() => {
    callApiGetDistrict()
  }, [])
  /**
   * callApiGetDistrict
   * @param params 
   */
  const callApiGetDistrict = async () => {
  // try {
    //     const response = await getDistrict()
    //     setDistrictData(response?.data)
    //   } catch (e) {
    // }
    setDistrictData(DISTRICT)
    setDistrictDataSearch(DISTRICT)
}
const [search, setSearch] = useState<Search>({
  text: '',
  districtList: districtData || [],
})

 /**
   * handle change search text input
   * @param text
   */
  const handleChangeSearch = (text: string) => {
    const filterResult = {
      text: '',
      districtList: districtData,
    }
    if (text.trim() === undefined || text.trim() === '') {
      setSearchText(false)
    } else {
      setSearchText(true)
      filterResult.districtList = searchdistrictDataInChild(districtData, text)
    }
    setSearch({ ...filterResult, text })
  }

  /**
   *  searchdistrictDataInChild
   *
   * @param districtList
   * @param inputSearch
   */
  const searchdistrictDataInChild = (districtList: Array<any>, inputSearch: string) => {
    setDistrictDataSearch(districtList.filter(item => item.districtName.includes(inputSearch)))
  }

  return (
    <ScrollView style={Style.title}>
      {/* <Text style={Style.textTitle2}>APP</Text> */}
      <View style={Style.searchOfList}>
        <TextInput
          value={search.text}
          placeholder="Bạn muốn tìm kiếm gì?"
          placeholderTextColor="#B0B0B0"
          style={Style.textInputSearchOfList}
          onChangeText={(text) => {
            txtSearch = text;
            handleChangeSearch(text)}}
        />
    </View>
    <Text style={Style.titleList}>Danh sách các Quận ở Hà Nội</Text>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={districtDataSearch}
      renderItem={({ item, index }: any) => {
        return (
          <>
          <Item 
            data={item}
            index= {index}
          />
          </>
        )
      }}
     />
     <Text style={Style.titleList}>Danh sách các Quận ở Dà nẵng</Text>
    </ScrollView>
  );
}

