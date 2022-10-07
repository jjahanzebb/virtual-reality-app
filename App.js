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

// static Object/Model display with Rotation, Scaling and Positioning
const InitialScene = props => {
  const [rotation, setRotation] = useState([-45, 50, 40]);
  const [position, setPosition] = useState([0, 0, -5]);
  const [scale, setScale] = useState([0.02, 0.02, 0.02]);

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
      duration: 2000,
      properties: {
        rotateY: '+=90',
      },
    },
  });

  // function to move objects on drag (finger touch)
  const moveObject = newPosition => {
    setPosition(newPosition);
  };

  // function to rotate objects
  const rotateObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 2) {
      let newRotation = [
        rotation[0] - rotationFactor,
        rotation[1] - rotationFactor,
        rotation[2] - rotationFactor,
      ];

      setRotation(newRotation);
    }
  };

  // function to rotate objects
  const scaleObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 2) {
      let currentScale = scale[0]; // 1 value is enough as all scale values are same
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];

      setScale(newScaleArray);
    }
  };

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
          position={position}
          scale={scale}
          rotation={rotation}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
          onPinch={scaleObject}
          resources={[
            require('./assets/skull/Skull.jpg'),
            require('./assets/skull/12140_Skull_v3_L2.mtl'),
          ]}
        />
      ) : data.object === 'tv' ? (
        <Viro3DObject
          source={require('./assets/tv/tv3d.obj')}
          position={position}
          scale={scale}
          rotation={rotation}
          materials={['tvbody']}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
          onPinch={scaleObject}
        />
      ) : (
        data.object === 'ufo' && (
          <Viro3DObject
            source={require('./assets/ufo/ufo3d.obj')}
            position={position}
            scale={scale}
            rotation={rotation}
            type="OBJ"
            onDrag={moveObject}
            onRotate={rotateObject}
            onPinch={scaleObject}
          />
        )
      )}
    </ViroARScene>
  );
};

const DetectImageSceneAR = () => {
  // registering our target(image)
  ViroARTrackingTargets.createTargets({
    skullImage: {
      source: require('./assets/skull/Skull.jpg'),
      orientation: 'Up',
      physicalWidth: 0.165, // real world width in meters
    },
    ironManImage: {
      source: require('./assets/IronMan/ironman-bg.jpeg'),
      orientation: 'Up',
      physicalWidth: 0.165, // real world width in meters
    },
    reactImage: {
      source: require('./assets/react/react-bg.png'),
      orientation: 'Up',
      physicalWidth: 0.165, // real world width in meters
    },
  });

  // if and when anchor is detected/found
  const anchorFound = () => {
    console.log('Anchor has been detected!');
  };

  return (
    <ViroARScene>
      <ViroARImageMarker target="skullImage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color={'#fff'} />

        <Viro3DObject
          source={require('./assets/skull/skull3d.obj')}
          scale={[0.008, 0.008, 0.008]}
          rotation={[-170, 0, 0]}
          type="OBJ"
          resources={[
            require('./assets/skull/Skull.jpg'),
            require('./assets/skull/12140_Skull_v3_L2.mtl'),
          ]}
        />
      </ViroARImageMarker>

      <ViroARImageMarker target="ironManImage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color={'#fff'} />

        <Viro3DObject
          source={require('./assets/IronMan/IronMan.obj')}
          scale={[0.0008, 0.0008, 0.0008]}
          rotation={[-90, 0, 0]}
          type="OBJ"
        />
      </ViroARImageMarker>

      <ViroARImageMarker target="reactImage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color={'#fff'} />

        <Viro3DObject
          source={require('./assets/react/react-logo.glb')}
          scale={[2, 2, 2]}
          position={[0, -1, 0]}
          rotation={[-90, 0, 0]}
          animation={{name: 'rotatebox', loop: true, run: true}}
          type="GLB"
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default App = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: DetectImageSceneAR,
      }}
      style={{flex: 1}}
    />
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
