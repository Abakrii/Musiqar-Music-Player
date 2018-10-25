import React from 'react';
import { StyleSheet, TouchableOpacity, Text ,Image} from 'react-native';
import {ListItem} from 'react-native-elements'
/**********
 *@param props to Tracks ListItem In Search
 */
const listItem = (props) => (
    <ListItem
         containerStyle={{ borderBottomWidth: 0 }}
        hideChevron ={true}
        subtitle={
            <TouchableOpacity  activeOpacity={-10} onPress={props.onItemPressed}>
              <Image source={{uri:props.artImage}} style={styles.itemContainer}/>
                    <Text style={styles.itemName}>{props.musicTitle}</Text>
                 <Text style={styles.itemName}>{props.id}</Text>
            </TouchableOpacity>
        }
    />
);
const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 2,
        paddingTop: 5,
         height: 60,

    },
    itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
      textAlign: 'center',
      paddingTop: 10
  },
});
export default listItem;