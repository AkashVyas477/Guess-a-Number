import React, { useState, useRef, useEffect } from 'react';
import {
   View, 
   Text, 
   StyleSheet, 
   Button, 
   Alert, 
   ScrollView ,
   Dimensions
  } from 'react-native';

import {Ionicons} from '@expo/vector-icons'
// import { ScreenOrientation} from 'expo'; 

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import MainButton from '../components/MainButton';


const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem=(value, numOfRound)=>(<View key={value} style={styles.listItem}>
 <Text>#{numOfRound}</Text>
  <Text>{value}</Text>
</View>);

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
 
  const initialGuess=generateRandomBetween(1,100,userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses,setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth ] = 
  useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight ] = 
  useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(()=>{
    const updateLayout=()=>{
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    }

    Dimensions.addEventListener('change',updateLayout)
    return()=>{
      Dimensions.removeEventListener('change',updateLayout)
    }
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses =>[nextNumber, ...curPastGuesses]); 
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }
  if (availableDeviceHeight < 500) {
  
    return(
   
   <View style={styles.screen}>
    <Text>Opponent's Guess</Text>
    <View style={styles.controls}>
    <Button 
      title="LOWER" 
      onPress={nextGuessHandler.bind(this, 'lower')}>
         <Ionicons name="md-remove" size={20} color="white"/>
        </Button> 
        {/* <MainButton  onPress={nextGuessHandler.bind(this, 'lower')}>
        LOWER
        <Ionicons name="md-remove" size={20} color="white"/>
        </MainButton> */}

    <NumberContainer>{currentGuess}</NumberContainer>
    
      <Button
        title="GREATER"
        onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name="md-add" size={20} color="white"/>
        </Button>
      {/* <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
        GREATER
        <Ionicons name="md-add" size={20} color="white"/>
        </MainButton> */}
        </View>
      <View style={styles.listItem}>
        

    <ScrollView>
      {pastGuesses.map((guess,index)=>renderListItem (guess,pastGuesses.length - index))}
    </ScrollView>
  </View>
  </View>
  );
  };


return (
  <View style={styles.screen}>
    <Text>Opponent's Guess</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style={styles.buttonContainer}>
      <Button 
      title="LOWER" 
      onPress={nextGuessHandler.bind(this, 'lower')}>
         <Ionicons name="md-remove" size={20} color="white"/>
        </Button> 
        {/* <MainButton  onPress={nextGuessHandler.bind(this, 'lower')}>
        LOWER
        <Ionicons name="md-remove" size={20} color="white"/>
        </MainButton> */}
      
      <Button
        title="GREATER"
        onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name="md-add" size={20} color="white"/>
        </Button>


      {/* <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
        GREATER
        <Ionicons name="md-add" size={20} color="white"/>
        </MainButton> */}
      
     
    </Card>
      <View style={styles.listItem}>
        

    <ScrollView>
      {pastGuesses.map((guess,index)=>renderListItem (guess,pastGuesses.length - index))}
    </ScrollView>
  </View>
  </View>
);
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding:20,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //marginTop: 20,
    marginTop: Dimensions.get('window').height>600?20:5,
    width: 300,
    maxWidth: '80%'
  },
  listItem:{
    borderColor:'#ccc',
    borderWidth:1, 
    padding:20,
    marginVertical:10,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around',
  },
  controls:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'80%',
  }
});

export default GameScreen;
