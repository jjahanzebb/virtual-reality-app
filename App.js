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
} from '@viro-community/react-viro';

const InitialScene = props => {
  const [rotation, setRotation] = useState([-45, 50, 40]);
  const [position, setPosition] = useState([-45, 50, 40]);

  let data = props.sceneNavigator.viroAppProps;

  ViroMaterials.createMaterials({
    metal: {
      diffuseTexture: require('./assets/metal-texture.jpg'),
    },
    tvbody: {
      diffuseTexture: require('./assets/tv/tv-material.png'),
    },
  });

  // rotate 90 degrees every 2.5seconds
  ViroAnimations.registerAnimations({
    rotatebox: {
      duration: 1000,
      properties: {
        rotateY: '+=90',
      },
    },
  });

  return (
    // works as View
    <ViroARScene>
      {/* 1 Simple Text */}
      {/* <ViroText
        text={'Hello World!'}
        position={[0, -5, -4]}
        style={{fontSize: 50}}
      /> */}

      {/* 1 Simple box, Box with texture, animation (rotate) */}
      {/* <ViroBox
        height={2}
        length={2}
        width={2}
        scale={[0.2, 0.2, 0.2]}
        position={[0, -1, -2]}
        materials={['metal']}
        animation={{name: 'rotatebox', loop: true, run: true}}
      /> */}

      {/* White Light to scene */}
      <ViroAmbientLight color={'#fff'} />

      {/* Display 3D object */}
      {data.object === 'skull' ? (
        <Viro3DObject
          source={require('./assets/skull/skull3d.obj')}
          position={[0, 0, -5]}
          scale={[0.05, 0.05, 0.05]}
          rotation={rotation}
          type="OBJ"
          animation={{name: 'rotatebox', loop: true, run: true}}
        />
      ) : data.object === 'tv' ? (
        <Viro3DObject
          source={require('./assets/tv/tv3d.obj')}
          position={[0, 0, -5]}
          scale={[0.005, 0.005, 0.005]}
          rotation={rotation}
          materials={['tvbody']}
          type="OBJ"
          animation={{name: 'rotatebox', loop: true, run: true}}
        />
      ) : (
        data.object === 'ufo' && (
          <Viro3DObject
            source={require('./assets/ufo/ufo3d.obj')}
            position={[0, -1.5, -8]}
            scale={[0.05, 0.05, 0.05]}
            // rotation={rotation}
            type="OBJ"
            animation={{name: 'rotatebox', loop: true, run: true}}
          />
        )
      )}
    </ViroARScene>
  );
};

export default App = () => {
  const [object, setObject] = useState('ufo');

  return (
    <View style={styles.mainContainer}>
      {/* works as Stack Navigator */}
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
        }}
        // pass objects (3D) to render on screen
        viroAppProps={{object: object}}
        style={{flex: 1}}
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => setObject('skull')}>
          <Text style={styles.text}>Display Skull</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setObject('tv')}>
          <Text style={styles.text}>Display TV</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setObject('ufo')}>
          <Text style={styles.text}>Display UFO</Text>
        </TouchableOpacity>
      </View>
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
