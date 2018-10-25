
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SearchMusicDataScreen from './src/screens/MusicData/MusicData'
import MusicDataDetailsScreen from './src/screens/MusicDataDetails/MusicDataDetails';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';
const store = configureStore();
//Register Screens
Navigation.registerComponent(
    "Musiqar.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "Musiqar.SearchMusicDataScreen",
    () => SearchMusicDataScreen,
    store,
    Provider
);

Navigation.registerComponent(
    "Musiqar.MusicDataDetailsScreen",
    () => MusicDataDetailsScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "Musiqar.SideDrawer",
    () => SideDrawer,
    store,
    Provider
);
//
//Start a App
export default () => Navigation.startSingleScreenApp({
    screen: {
        screen: "Musiqar.AuthScreen",
    },

});
