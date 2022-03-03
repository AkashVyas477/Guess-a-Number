import React from 'react';
import { View, 
  Text, 
  StyleSheet, 
  Button, 
  Image, 
  Dimensions ,
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <SafeAreaView style={styles.screen}>
    <ScrollView>
    <View style={styles.screen}>
      <Text style={styles.fontContainer}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
      <Image 
      fadeDuration={300}
      source={require('../assets/success.png')} 
      //source={{uri:'https://media.cnn.com/api/v1/images/stellar/prod/190528100049-everest-no-crowds.jpg?q=w_1600,h_900,x_0,y_0,c_fill'}}
      style={styles.image}
      resizeMode="cover"
      />
      </View>
      <Text style={styles.fontContainer}>
        Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text>
        Number was: <Text style={styles.highlight}>{props.userNumber}</Text>
      </Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10,
    
  },
  image:{
    width:'100%',
    height:'100%'
  },
  imageContainer:{
    width:Dimensions.get('window').width * 0.5,
    height:Dimensions.get('window').width * 0.5,
    borderRadius:Dimensions.get('window').width * 0.7/2,
    borderWidth:3,
    borderColor:'black',
    overflow:'hidden',
    marginVertical:Dimensions.get('window').height /50
  },
  highlight:{
    color: Colors.primary,
    justifyContent:'space-around',
    paddingHorizontal: 10,
    fontSize:20,
    
  },
  fontContainer: {
    alignItems: 'center',
    fontSize:20,
    fontStyle:('normal', 'italic'),

  },
});

export default GameOverScreen;
