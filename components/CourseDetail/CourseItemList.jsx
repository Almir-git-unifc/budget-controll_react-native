import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Linking, Image} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../utils/Colors'
import { EvilIcons } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';

export default function CourseItemList({categoryData,setUpdateRecord}) {
    const [explandItem,setExpandItem]=useState();

    const onDeleteItem=async(id)=>{
        const {error}=await supabase.from('CategoryItems')
        .delete()
        .eq('id',id);

        ToastAndroid.show('Item Deleted!',ToastAndroid.SHORT);
        setUpdateRecord(true)
    }

    const openURL=(url)=>{
        if(url)
        {
            Linking.openURL(url);
        }
    }
  return (
    <View style={styles.containgera}>
      <Text style={styles.headtitle}>Item List</Text>

      <View style={{marginTop:15}}>
        {categoryData?.CategoryItems?.length>0?categoryData?.CategoryItems?.map((item,index)=>(
            <>
            <TouchableOpacity key={index} style={styles.itemContainer}
            onPress={()=>setExpandItem(index)}>
                <Image source={{uri:item.image}} style={styles.imageitem} />
                <View style={{flex:1,marginLeft:10}}> 
                    <Text style={styles.nameitem}>{item.name}</Text>
                    <Text style={styles.urlimageitem} numberOfLines={2} >{item.url}</Text>
                </View>
                <Text style={styles.custitem}>${item.cost}</Text>
            </TouchableOpacity>

            {explandItem==index&&
            <View style={styles.actionItemContainer}>
                <TouchableOpacity onPress={()=>onDeleteItem(item.index)}>
                    <EvilIcons name="trash" size={34} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                </TouchableOpacity>
            </View>
            }
           {categoryData?.CategoryItems.length-1!=index&&
            <View style={{borderWidth:0.5,marginTop:10,borderColor:Colors.GRAY}}></View>
           }
            </>
        )):
        <Text style={styles.noItemText}>No Item Found</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    containgera:{
        marginTop:20
    },
    headtitle:{
      fontWeight: 'bold',
        fontSize:20
    },
    imageitem:{
        width:80,
        height:80,
        borderRadius:15
    },
    itemContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
    },
    nameitem:{
        fontSize:20,
        fontWeight: 'bold',
    },
    urlimageitem:{
        color:Colors.GRAY
    },
    custitem:{
        fontSize:17,
        marginLeft:10,
        fontWeight: 'bold',
    },
    noItemText:{
      fontWeight: 'bold',
        fontSize:25,
        color:Colors.GRAY
    },
    actionItemContainer:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        justifyContent:'flex-end'
    }
})