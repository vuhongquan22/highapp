import React, { useState, useEffect } from "react"
import { SafeAreaView, Text, View, Keyboard } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { Icon } from "../../../shared/components/icon"
import { translate } from "../../../config/i18n"
import DrawerLeftStyles from "./drawer-left-style"
import { messages } from "./drawer-left-activity-messages"
import { useSelector, useDispatch } from "react-redux"
import { businessCardListSelector, listProductForSelectionSelector, customerFavoriteListSelector } from "./drawer-left-selector"
import {
  CustomersFavorite,
  drawerActivityActions,
  ItemResponse
} from "./drawer-left-activity-reducer"
import { TEXT_EMPTY, IconButton } from "../../../config/constants/constants"
import { StackScreen, SelectionListInDrawerType, TypeGetListActivities, SelectedTargetType } from "../constants"
import {
  getList,
  getCustomerList,
  getBusinessCardList
} from "./drawer-activity-repository"
import { useNavigation } from "@react-navigation/native"
import { GetActivitiesParams } from "../activity-repository"
import { SelectionListInDrawer } from "./selection-list"
import { Input } from "../../../shared/components/input/input"
import { theme } from "../../../config/constants"
import { useIsDrawerOpen } from "@react-navigation/drawer"
import { activityActions } from "../list/activity-list-reducer"
import { drawerListSelectedSelector } from "../list/activity-list-selector"
import { updateLongPressButton } from "../common/common-util"

interface Search {
  text: string
  customerFavoriteList: Array<CustomersFavorite>,
  businessCardList: Array<ItemResponse>,
  productListForSelection: Array<ItemResponse>,
}

/**
 * Left Drawer in activity screen
 */
export const DrawerLeftActivityContent = () => {
  const [searchText, setSearchText] = useState(false)
  const [showCustomersList, setShowCustomersList] = useState(true)
  const [showBusinessCardList, setShowBusinessCardList] = useState(true)
  const [showProductTradings, setShowProductTradings] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const businessCardListData = useSelector(businessCardListSelector)
  const productListForSelectionData = useSelector(listProductForSelectionSelector)
  const customerFavoriteListData = useSelector(customerFavoriteListSelector)
  const [isLongPressButton, setLongPressButton] = useState<Array<string>>(['']);
  const drawerListSelected = useSelector(drawerListSelectedSelector)

  const [search, setSearch] = useState<Search>({
    text: TEXT_EMPTY,
    customerFavoriteList: customerFavoriteListData || [],
    businessCardList: businessCardListData.listInfo || [],
    productListForSelection: productListForSelectionData.listInfo || [],
  })

  let txtSearch = TEXT_EMPTY

  const isDrawerOpen = useIsDrawerOpen();

  useEffect(() => {
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  /**
   * call API getList
   */
  const fetchProductListForSelection = async () => {
    try {
      const response = await getList({ mode: 1 })
      if (response && response.status === 200) {
        dispatch(drawerActivityActions.setProductListForSelection(response?.data))
      }
    } catch (e) {
    }
  }

  /**
   * call API getBusinessCardList 
   */
  const fetchBusinessCardList = async () => {
    try {
      const response = await getBusinessCardList({ mode: 1 })
      if (response && response.status === 200) {
        dispatch(drawerActivityActions.setBusinessCardList(response?.data))
      }
    } catch (e) {
    }
  }

  
  /**
   * Call API getCustomerList
   */
  async function getDataCustomerList() {
    try {
      const customerListResponse = await getCustomerList({ isFavourite: true })
      if (customerListResponse?.status === 200) {
        dispatch(drawerActivityActions.setCustomers(customerListResponse?.data))
      }
    }
    catch (error) {
    }
  }

  useEffect(() => {
    fetchBusinessCardList()
    fetchProductListForSelection()
    getDataCustomerList()
  }, [])

  /**
   * handle Show CustomersList
   */
  const handleShowCustomersList = () => {
    setShowCustomersList(!showCustomersList)
  }

  /**
   * handle show BusinessCardsList
   */
  const handleShowBusinessCardList = () => {
    setShowBusinessCardList(!showBusinessCardList)
  }

  /**
   * handle show ProductTradingsList
   */
  const handleShowProductTradings = () => {
    setShowProductTradings(!showProductTradings)
  }

  useEffect(() => {
    setSearch({
      text: TEXT_EMPTY,
      customerFavoriteList: customerFavoriteListData || [],
      businessCardList: businessCardListData.listInfo || [],
      productListForSelection: productListForSelectionData.listInfo || [],
    })
  }, [businessCardListData, productListForSelectionData, customerFavoriteListData])

  /**
   * Search CustomersFavorite
   *
   * @param customerFavoriteList
   * @param inputSearch
   */
  const searchCustomersFavoriteInChild = (customerFavoriteList: Array<CustomersFavorite>, inputSearch: string) => {
    return customerFavoriteList.filter(customer => customer.listName.indexOf(inputSearch) !== -1)
  }

  /**
   * Search BusinessCard
   *
   * @param businessCardList
   * @param inputSearch
   */
  const searchBusinessCardInChild = (businessCardList: Array<ItemResponse>, inputSearch: string) => {
    return businessCardList.filter((businessCard) => businessCard.listName.indexOf(inputSearch) !== -1)
  }

  /**
   * Search ProductTradings
   *
   * @param productTradingList
   * @param inputSearch
   */
  const searchProductTradingsInChild = (productTradingList: Array<ItemResponse>, inputSearch: string) => {
    return productTradingList.filter((productTrading) => productTrading.listName.indexOf(inputSearch) !== -1)
  }

  /**
   * handle change search text input
   * @param text
   */
  const handleChangeSearch = (text: string) => {
    const filterResult = {
      text: TEXT_EMPTY,
      customerFavoriteList: customerFavoriteListData,
      businessCardList: businessCardListData?.listInfo,
      productListForSelection: productListForSelectionData?.listInfo
    }

    if (text.trim() === undefined || text.trim() === TEXT_EMPTY) {
      setSearchText(false)
    } else {
      setSearchText(true)
      filterResult.customerFavoriteList = searchCustomersFavoriteInChild(customerFavoriteListData, text)
      filterResult.businessCardList = searchBusinessCardInChild(businessCardListData?.listInfo, text)
      filterResult.productListForSelection = searchProductTradingsInChild(productListForSelectionData?.listInfo, text)
    }
    setSearch({ ...filterResult, text })
  }

  const onNavigate = (getListActivitiesParams: GetActivitiesParams) => {
    dispatch(
      activityActions.saveDrawerListSelected({
        selectedTargetType: getListActivitiesParams.selectedTargetType
      })
    )
    if (getListActivitiesParams.isDraft) {
      delete getListActivitiesParams.selectedTargetType
    }
    navigation.navigate(StackScreen.ACTIVITY_LIST, {
      filterListParams: getListActivitiesParams
    })
  }

  const renderActivitiesSelection = (activityType: string, selectedTargetType: number,  onSelectAndNavigate: () => void) => {
    return (
      <TouchableOpacity
        onPress={onSelectAndNavigate}>
        <View style={[DrawerLeftStyles.boxHeader,drawerListSelected.selectedTargetType === selectedTargetType && DrawerLeftStyles.hasSelected]}>
          <Text style={[DrawerLeftStyles.textHeader, DrawerLeftStyles.textFontSize, drawerListSelected.selectedTargetType === selectedTargetType && DrawerLeftStyles.hasSelected]}>
            {translate(messages[`${activityType}`])}
          </Text>
        </View>
      </TouchableOpacity>)
  }

  return (
    <SafeAreaView style={DrawerLeftStyles.container}>
      <ScrollView>
        <View style={DrawerLeftStyles.container}>
          <View style={DrawerLeftStyles.content}>
            <View style={DrawerLeftStyles.contentHeader}>
              <View style={DrawerLeftStyles.boxHeader}>
                <Text style={DrawerLeftStyles.textHeader}>
                  {`${translate(messages.activityMenu)}`}
                </Text>
              </View>
              {
                renderActivitiesSelection(
                  TypeGetListActivities.MY_ACTIVITY,
                  SelectedTargetType.EMPLOYEE_TYPE,
                  () => {onNavigate({
                    selectedTargetType: SelectedTargetType.EMPLOYEE_TYPE,
                    selectedTargetId: 0,
                    offset: 0,
                    limit:30
                  })
                })
              }
              {
                renderActivitiesSelection(
                  TypeGetListActivities.ALL_ACTIVITY,
                  SelectedTargetType.ALL_TYPE,
                  () => {onNavigate({
                    selectedTargetType: SelectedTargetType.ALL_TYPE,
                    selectedTargetId: 0,
                    offset: 0,
                    limit:30
                  })
                })
              }
              {
                renderActivitiesSelection(
                  TypeGetListActivities.DRAFT_ACTIVITY,
                  SelectedTargetType.DRAFT_TYPE,
                  () => {onNavigate({
                    selectedTargetType: SelectedTargetType.DRAFT_TYPE,
                    isDraft: true,
                    limit: 30, 
                    offset: 0 
                  })
                })
              }
              <View style={[DrawerLeftStyles.boxHeaderSearch, DrawerLeftStyles.mrTopK]}>
                <Text style={[DrawerLeftStyles.textHeader, DrawerLeftStyles.textFontSize, DrawerLeftStyles.padBot]}>
                  {`${translate(messages.boxSearchActivity)}`}
                </Text>
                <View style={[DrawerLeftStyles.search]}>
                <TouchableOpacity
                  hitSlop={DrawerLeftStyles.hitSlop}
                  onPress={() => handleChangeSearch(txtSearch)}
                >
                  <Icon name="search" />
                </TouchableOpacity>
                  <Input
                    value={search.text}
                    onChangeText={(text) => {
                      txtSearch = text;
                      handleChangeSearch(text)}}
                    style={[
                      DrawerLeftStyles.inputStyle,
                      DrawerLeftStyles.inputSearch
                    ]}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    placeholder={translate(messages.textSearchPlaceholder)}
                    placeholderColor={theme.colors.gray}
                  />
                  {searchText && (
                    <TouchableOpacity
                      onPress={() => handleChangeSearch(TEXT_EMPTY)}
                      style={[ DrawerLeftStyles.buttonNormal, isLongPressButton.indexOf(IconButton.CLOSE) !== -1 && DrawerLeftStyles.buttonOnPress]}
                      activeOpacity={1}
                      onPressIn={() => setLongPressButton([IconButton.CLOSE])}
                      onPressOut={() => setLongPressButton(updateLongPressButton(isLongPressButton, IconButton.CLOSE))}
                    >
                      <Icon name="close" style={[DrawerLeftStyles.generalIcon, isLongPressButton.indexOf(IconButton.CLOSE) !== -1 && DrawerLeftStyles.iconOnPress]} />
                    </TouchableOpacity>
                  )}

                </View>
              </View>
              <SelectionListInDrawer
                selectedTargetType = {SelectedTargetType.CUSTOMER_TYPE}
                menuTitle={SelectionListInDrawerType.CUSTOMER}
                listItem={search.customerFavoriteList}
                handleShowList={handleShowCustomersList}
                isShow={showCustomersList}
              />
              <SelectionListInDrawer
                selectedTargetType = {SelectedTargetType.BUSINESS_CARD_TYPE}
                menuTitle={SelectionListInDrawerType.BUSINESS_CARD}
                listItem={search.businessCardList}
                handleShowList={handleShowBusinessCardList}
                isShow={showBusinessCardList}
              />
              <SelectionListInDrawer
                selectedTargetType = {SelectedTargetType.PRODUCT_TRADING_TYPE}
                menuTitle={SelectionListInDrawerType.PRODUCT_TRADING}
                listItem={search.productListForSelection}
                handleShowList={handleShowProductTradings}
                isShow={showProductTradings}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
