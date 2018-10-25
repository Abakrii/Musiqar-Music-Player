import React, {Component} from 'react';
import {connect} from 'react-redux';
import MusicList from '../../components/MusicList/MusicList';
import {getTracks, getOneTrack} from "../../store/actions/index";

import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Sound from 'react-native-sound'
class SearchMusicDataScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    }
    static navigatorStyle = {
        navBarButtonColor: "#000000",

    };
    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onLoadTracks();
        }

        }

// to show the sideDrawer
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    itemSelectedHandler = key => {
            console.log(key);
            this.props.navigator.push({
                screen: "Musiqar.MusicDataDetailsScreen",
                title: `${key.title}`,
                passProps: {
                    selectedMusic: key
                },

            });
              const track = new Sound(`https://www.musiqar.com/uploads/tracks/${key.name}`, null, (e) => {
                  if (e) {
                 console.log('error loading track:', e)
             } else {
                 track.play()
                 }
              });
                 console.log(key.name)

        };
    render() {
           if (this.props.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            );
        }

        let viewButton = (
            <View>
                <MusicList
                    navigator={this.props.navigator}
                    tracks={this.props.tracks}
                    onItemSelected={this.itemSelectedHandler}
                                  />
            </View>
        );

        return (

     <View>
    {viewButton}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
});
const mapStateToProps = state => {
    return {
        tracks: state.musicProfile.tracks,
        isLoading: state.ui.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onLoadTracks: () => dispatch(getTracks()),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchMusicDataScreen);



