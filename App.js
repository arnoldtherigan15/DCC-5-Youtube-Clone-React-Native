import React, { useEffect,useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import VideoItem from './components/VideoItem'
import axios from 'axios'

export default function App() {
  const [ videos, setVideos ] = useState([])
  // const [ video, setVideo ] = useState([])
  // const [ selectedVideo, setselectedVideo ] = useState(null)

  const onHandleSubmit = (searchTerm) => {
      axios({
          method: 'get',
          url: 'https://www.googleapis.com/youtube/v3/search',
          params: {
              part: 'snippet',
              key: 'your api key here',
              maxResults: 5,
              type: 'video',
              q: searchTerm
          }
        })
          .then(({data}) => {
            console.log(data.items[0])
            setVideos( data.items )
            setVideo(data.items[0])
            setselectedVideo(data.items[0])
            
          })
          .catch(err => {
            console.log(err,'-------');
            
          })
      }

    useEffect(() => {
        onHandleSubmit('spongebob')
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Image source={require('./assets/logo.png')} style={styles.logo}/>
                <View style={styles.rightNav}>
                    <TouchableOpacity>
                        <Icon style={styles.navItem} name="search" size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.navItem} name="account-circle" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
              <FlatList 
                data={videos} 
                renderItem={(video)=> <VideoItem video={video.item} />}
                keyExtractor={(item) => item.id.videoId}
                ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#F5F5F5' }}/>}
              />
            </View>
            <View style={styles.tabBar}>
              <TouchableOpacity style={styles.tabItem}>
                <Icon name="home" size={25} />
                <Text style={styles.tabText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Icon name="whatshot" size={25} />
                <Text style={styles.tabText}>Trending</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Icon name="subscriptions" size={25} />
                <Text style={styles.tabText}>Subscriptions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Icon name="folder" size={25} />
                <Text style={styles.tabText}>Library</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 98,
        height: 22
    },
    container: {
        flex: 1,
        // backgroundColor:'blue',
        paddingTop: StatusBar.currentHeight
    },
    navbar: {
        height: 55,
        backgroundColor: 'white',
        borderTopColor: 'white',
        // borderBottomColor: 'gray', borderBottomWidth: 1,
        elevation: 3,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body: {
      flex: 1
    },
    navItem: {
        marginLeft: 25
    },
    rightNav: {
        flexDirection: 'row'
    },
    tabBar: {
        height: 60,
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    tabText: {
      fontSize: 11,
      color: 'gray',
      paddingTop: 4
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center',
    }
});
