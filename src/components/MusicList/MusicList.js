import React, {Component} from 'react';
import {Animated,StyleSheet,ActivityIndicator} from 'react-native';
import ListItem from '../ListItem/ListItem';
import {createFilter} from 'react-native-search-filter';
import {Header, Item, Input, Icon} from 'native-base';
import { SuperGridSectionList} from 'react-native-super-grid';
class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KEYS_TO_FILTERS: ['title'],
            search: '',
            loading: true
        };
    }
    searchUpdated(term) {
        this.setState({search: term})
    }

    renderItem = ({  item }) => (
        <ListItem
            musicTitle={item.title}
                   artImage = {`https://www.musiqar.com/uploads/media/${item.art}`}
                   onItemPressed={() => this.props.onItemSelected(item)}
        />
    );
componentWillMount(){
        setTimeout(()=>{
                this.setState({
                    loading : false
                })
            },
            3000)
    }

    render() {
        return (
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Header searchBar rounded style={styles.SearchBar}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            onChangeText={(term)=>{this.searchUpdated(term)}}
                            placeholder="Search For Music " />
                        <Icon name="ios-people" />
                    </Item>
                </Header>
                <SuperGridSectionList
                    style={styles.gridView}
                 itemWidth={130}
                              sections={[
                {
                  data:
                   this.props.tracks.filter(createFilter(this.state.search, this.state.KEYS_TO_FILTERS))
                },
                      ]}
                renderItem={this.renderItem}
                    />


                {this.state.loading
                    ?<ActivityIndicator  />
                    :null
                }
            </Animated.ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    SearchBar: {
            backgroundColor: '#000000'},
    listContainer: {
        width: "100%"
    },
     gridView: {
    paddingTop: 25,
    flex: 1,
  },

});


export default MusicList;