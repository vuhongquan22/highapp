import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        backgroundColor:"#F8F8F8",
        paddingHorizontal:20,
    },
    textTitle1: {
        color:"#00BFFF",
        marginTop:40
    },
    textTitle2: {
        fontSize:18,
        marginTop:13,
        fontWeight: 'bold',
    },
    searchOfList: {
        backgroundColor:"#FFF",
        borderRadius:20,
        padding:5,
        flexDirection:"row",
        alignItems:"center",
        marginTop:20,
        height:40
    },
    textInputSearchOfList: {
        paddingHorizontal:20,
        fontWeight: 'bold',
    },
    viewSearchOfList: {
        backgroundColor:"#00BFFF",
        width:30,
        height:30,
        borderRadius:8,
        marginLeft:110,
        alignItems:"center",
        justifyContent:"center"
    },
    titleList: {
        marginTop:20,
        fontSize:15,
        color:"#00BFFF",
        fontWeight: 'bold',
    },
    district: {
        backgroundColor:"#FFF",
        height:50,
        width:150,
        borderRadius:20,
        marginTop:35,
        marginHorizontal:15,
    },
    district2 : {
        backgroundColor:"#FFF",
        height:60,
        borderRadius:20,
        marginTop:-10,
        paddingHorizontal:8,
        paddingVertical:8
    },
    titleDistrict: {
        color:"#000",
        fontWeight: 'bold',
        fontSize:13,
        marginVertical: 15
    },
    district3: {
        backgroundColor:"#3E3C3C",
        paddingHorizontal:5,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5
    },
    price: {
        color:"#B0B0B0",
        fontSize:13
    },
    space: {
        color:"#B0B0B0",
        fontSize:13,
        marginLeft:25
    },
    district4: {
        backgroundColor:"#FFF",
        height:200,
        width:150,
        borderRadius:20,
        marginTop:35,
        marginHorizontal:15
    },
    detailTop: {
        backgroundColor:"#f8f8f8",
        height:"100%",
        paddingHorizontal:20
    },
    detailTopImage: {
        marginLeft:50, 
        width:"100%",
        height:110
    },
    detailTopView: {
        backgroundColor:"#000",
        height:30,
        width:40,
        marginLeft:-50,
        marginTop:70,
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
    },
    head: { 
        height: 30, 
        backgroundColor: '#FFF' 
    },
    text: { 
        margin: 1 
    },
    styleImageOfDistrict: {
        width:150,
        height:150,
        borderRadius:20,
    },
    footer: {
        backgroundColor:"#FFF",
        marginTop:10,
        flexDirection:"row",
        borderRadius:10,
        height:60,
        alignItems:"center",
        paddingHorizontal:20
    },
    footer2: {
        backgroundColor:"#DFDFDF",
        borderRadius:5,
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:"center"
    },
    footer3: { 
        backgroundColor:"#DFDFDF",
        borderRadius:5,
        width:70,
        alignItems:"center",
        marginVertical:5
    },
    viewTopdetail1 : {
        backgroundColor:"#FFF",
        padding:10,
        borderRadius:15
    },
    viewTopDetail2: {
        flexDirection:"row",
        alignItems:"center",
    },
    textTopDetail1: {
        fontSize:18
    },
    textTopDetail3: {
        fontSize:16,
        color:"#00BFFF"
    },
    textTopDetail2: {
        fontSize:18,
        color:"#00BFFF",
    },
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    floatingButton:{
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    containerTabView: {
        flex:1,
        backgroundColor: '#F5F5F5'
    },
  });