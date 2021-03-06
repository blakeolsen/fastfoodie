import { ARKit, withProjectedPosition } from 'react-native-arkit';
import { Dimensions, View } from 'react-native';
import React, { Component } from 'react';

const diffuse = 'white';

const PlaneCursor = withProjectedPosition()(({ positionProjected }) => {
  if (!positionProjected) return null;
  return (
    <ARKit.Group>
      <ARKit.Torus
        position={positionProjected}
        transition={{ duration: 0.1 }}
        shape={{ ringR: 0.1, pipeR: 0.01 }}
        material={{
          lightingModel: ARKit.LightingModel.Constant,
          color: '#DA1182'
        }}
      />
      <ARKit.Light
        position={positionProjected}
        type={ARKit.LightType.Omni}
        color="#DA1182"
      />
    </ARKit.Group>
  );
});

const ObjectCursor = withProjectedPosition()(({ positionProjected }) => {
  if (!positionProjected) return null;
  return (
    <ARKit.Group>
      <ARKit.Sphere
        position={positionProjected}
        transition={{ duration: 0.1 }}
        shape={{ radius: 0.01 }}
        material={{
          lightingModel: ARKit.LightingModel.Constant,
          color: '#4C92EF'
        }}
      />
      <ARKit.Light
        position={positionProjected}
        type={ARKit.LightType.Omni}
        color="#4C92EF"
      />
    </ARKit.Group>
  );
});

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default class AROverlay extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          planeDetection
          lightEstimationEnabled
          onPlaneDetected={console.log} // event listener for plane detection
          onPlaneUpdate={console.log} // event listener for plane update
        >
          <ARKit.Text
            id="object_1"
            text="fastfoodie"
            position={{ x: 0, y: .9, z: 0 }}
            eulerAngles={{ y: 3.14 / 6 }}
            font={{ size: 0.15, depth: 0.05 }}
            material={{ diffuse }}
          />
          <ARKit.Model
            id="object_2"
            position={{ x: -.2, y: .6, z: 0 }}
            model={{ file: 'art.scnassets/paneerchili.dae', scale: 0.05 }}
          />
          <ARKit.Model
            id="object_3"
            position={{ x: .1, y: .4, z: 0 }}
            model={{ file: 'art.scnassets/salad2.dae', scale: 0.05 }}
          />
           <ARKit.Model
            id="object_4"
            position={{ x: .1, y: .6, z: 0 }}
            model={{ file: 'art.scnassets/pizza.dae', scale: 0.07 }}
          />
           <ARKit.Model
            id="object_5"
            position={{ x: -.2, y: .4, z: 0 }}
            model={{ file: 'art.scnassets/burger.dae', scale: 0.05 }}
          />
          <ARKit.Light
            position={{ x: 1, y: 3, z: 2 }}
            type={ARKit.LightType.Omni}
            color="white"
          />
          <ARKit.Light
            position={{ x: 0, y: 1, z: 0 }}
            type={ARKit.LightType.Spot}
            eulerAngles={{ x: -Math.PI / 2 }}
            spotInnerAngle={45}
            spotOuterAngle={45}
            color="blue"
          />

          <PlaneCursor
            projectPosition={{
              x: windowWidth / 2,
              y: windowHeight / 2,
              // take first detected feature plane
              plane: results => (results.length > 0 ? results[0] : null)
            }}
          />
          <ObjectCursor
            projectPosition={{
              x: windowWidth / 2,
              y: windowHeight / 2,
              node: results => {
                const filtered = results.filter(r =>
                  r.id.startsWith('object_')
                );
                // take last detected object
                return filtered.length > 0 ? filtered[0] : null;
              }
            }}
          />
        </ARKit>
      </View>
    );
  }
}