import React, { useEffect, useRef, useState } from 'react';
import { generatePitchCoordinates, generateTeamLogoCoordinates } from '../../utils/coordinates';
import Pitch from './Pitch';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import Hoardings from '../hoardings/Hoardings';
import { easeInSine } from '../../utils/easings/functions';
import { useWheelEvent } from '../../hooks/useWheelEvent';
import TeamLogos from './TeamLogos';
import arsenalBadge from '../../../static/assets/logos/arsenal.png'
import astonVillaBadge from '../../../static/assets/logos/astonVilla.png'
import evertonBadge from '../../../static/assets/logos/everton.png'
import brightonBadge from '../../../static/assets/logos/brighton.png'
import brentfordBadge from '../../../static/assets/logos/brentford.png'
import norwichBadge from '../../../static/assets/logos/norwich.png'

const games = [
  {
    fixtureId: 1,
    homeTeam: 'Arsenal',
    awayTeam: 'Everton',
  },
  {
    fixtureId: 2,
    homeTeam: 'Brentford',
    awayTeam: 'Brighton',
  },
  {
    fixtureId: 3,
    homeTeam: 'Aston Villa',
    awayTeam: 'Norwich',
  },
];

const allGames = Array(33).fill(games).flat();

const Pitches = ({ pitchSize, navigate, count = 99, temp = new THREE.Object3D(), matrix = new THREE.Matrix4() }) => {
  const ref = useRef();
  const [teamLogoProps, setTeamLogoProps] = useState({});
  const [
    arsenal, astonvilla, everton, brentford, brighton, norwich
  ] = useTexture([
    arsenalBadge, astonVillaBadge, evertonBadge, brentfordBadge, brightonBadge, norwichBadge
  ])

  const badgeMap = {arsenal, astonvilla, everton, brentford, brighton, norwich}

  let zOffset = 0;
  let speed = 0;

  useEffect(() => {
    const teamLogoTempProps = {};

    for (let i = 0; i < count; i++) {
      const fixtureId = allGames[i].fixtureId;
      const homeTeam = allGames[i].homeTeam;
      const awayTeam = allGames[i].awayTeam;

      const column = i % 5;
      const row = Math.trunc(i / 5);

      const coordinates = generatePitchCoordinates(pitchSize, row, column);
      const teamLogoCoordinates = generateTeamLogoCoordinates({ pitchSize, row, column });

      teamLogoTempProps[id] = {
        fixtureId,
        homeTeam,
        awayTeam,
        homeTeamBadge: badgeMap[homeTeam.replace(/\s+/g, "").toLowerCase()],
        awayTeamBadge: badgeMap[awayTeam.replace(/\s+/g, "").toLowerCase()],
        ...teamLogoCoordinates
      };

      // I have no idea why Z needs to be in Y and why it has to be negative
      // but otherwise it doesn't work :(
      temp.position.set(
        coordinates.pitch.pitchX,
        -coordinates.pitch.pitchZ,
        coordinates.pitch.pitchY,
      );
      temp.updateMatrix();

      const id = i;
      ref.current.setMatrixAt(id, temp.matrix);
    }

    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;
    setTeamLogoProps(teamLogoTempProps);
  }, []);

  const handleWheelEvent = (event) => {
    event.preventDefault;
    // TODO - look into changing to scroll event?
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/wheel_event
    speed += event.deltaY * 0.05;
  };

  useWheelEvent(handleWheelEvent);

  const handleDblClickEvent = (event) => {
    event.stopPropagation();
    const instanceId = event.instanceId;

    ref.current.getMatrixAt(instanceId, matrix);
    let tempObj = new THREE.Object3D();
    matrix.decompose(tempObj.position, tempObj.quaternion, tempObj.scale); // now position is in tempObj.position

    let timer;
    let elapsed = 0;
    timer = setInterval((ev) => {
      elapsed++;

      // const easedOffset =   easeInElastic(elapsed / 10)
      const easedOffset = -0.8 * easeInSine(elapsed / 4);
      // const easedOffset = -1.9 * Math.sin(elapsed / 10)

      matrix.setPosition(tempObj.position.x, tempObj.position.y, tempObj.position.z + easedOffset);

      ref.current.setMatrixAt(instanceId, matrix);
      ref.current.instanceMatrix.needsUpdate = true;

      if (elapsed == 16) {
        clearInterval((timer));
        setTimeout(() => navigate('/fixtureId'), 300);
      }
    }, 10);
  };

  useFrame(() => {
    const { position } = ref.current;
    zOffset += speed;
    speed *= 0.90;
    const newZPosition = position.z + speed;
    position.set(position.x, position.y, newZPosition);
  });

  return (
    <>
      <instancedMesh
        ref={ref}
        onDoubleClick={handleDblClickEvent}
        // onClick={(ev) => console.log(ev)}
        args={[null, null, count]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <Pitch />
        <Hoardings pitchSize={pitchSize} />
        {Object.entries(teamLogoProps).map(([fixtureId, data]) => {
          return (
            <React.Fragment key={fixtureId}>
              <TeamLogos
                fixtureId={fixtureId}
                teamName={data.homeTeam}
                badge={data.homeTeamBadge}
                position={[
                  data['teamLogo']['home'].x, -data['teamLogo']['home'].z, data['teamLogo']['home'].y,
                ]}
              />
              <TeamLogos
                fixtureId={fixtureId}
                teamName={data.awayTeam}
                badge={data.awayTeamBadge}
                position={[
                  data['teamLogo']['away'].x, -data['teamLogo']['away'].z, data['teamLogo']['away'].y,
                ]}
              />
            </React.Fragment>
          );
        })}
      </instancedMesh>
    </>
  );
};

export default Pitches;