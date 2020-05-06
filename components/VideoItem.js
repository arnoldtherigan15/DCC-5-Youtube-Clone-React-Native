import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function VideoItem({ video }) {
    if (!video) return <Text>Loading</Text>
    return (
        <View style={styles.container}>
            <Image source={{uri: video.snippet.thumbnails.medium.url }} style={{height:200}} />
            <View style={styles.descContainer}>
                <Image source={{uri:'https://randomuser.me/api/portraits/men/0.jpg'}} style={{height:50, width:50, borderRadius: 25}} />
                <View style={styles.videoDetailContainer}>
                    <Text numberOfLines={2} style={styles.videoTitle}>{video.snippet.title}</Text>
                    <Text numberOfLines={2} style={styles.videoStats}>{video.snippet.description}</Text>
                </View>
                <TouchableOpacity>
                    <Icon name="more-vert" size={25} style={{color: '#888888'}} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor:'blue',
        padding: 15
    },
    descContainer: {
        flexDirection: 'row',
        paddingTop: 15
    },
    videoTitle: {
        fontSize: 16,
        color: '#3C3C3C'
    },
    videoDetailContainer: {
        paddingHorizontal: 15,
        flex: 1
    },
    videoStats: {
        fontSize: 15,
        color: '#3C3C3C',
        paddingTop: 3
    }
});
