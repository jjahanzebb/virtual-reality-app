import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@viro-community/react-viro';

export default App = () => {
  return (
    <View>
      <Text>Initial VR App</Text>
    </View>
  );
};

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  controlsContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#2f2f2f',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 12,
  },
});
