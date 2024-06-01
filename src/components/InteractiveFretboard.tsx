import {
  Barre,
  Fretboard,
  FretboardProps,
  FretboardRef,
  Note,
  Position,
  useInteraction,
} from '@mikefowler/fretboard';
import React, { useRef } from 'react';
import isNotNull from '../utils/isNotNull';

const getPositionKey = (position: Position) =>
  `${position.string}-${position.fret}`;

export interface InteractiveFretboardProps extends FretboardProps {}

const InteractiveFretboard: React.FC<InteractiveFretboardProps> = (props) => {
  const fretboard = useRef<FretboardRef>(null);
  const {
    events,
    drawingBarre,
    barres,
    hoveredPlacements,
    selectedPlacements,
    placements,
  } = useInteraction(fretboard);

  return (
    <Fretboard {...props} {...events} ref={fretboard}>
      {drawingBarre && drawingBarre.length > 1 && (
        <Barre
          key={`${getPositionKey(drawingBarre[0])}-${getPositionKey(
            drawingBarre[1]
          )}`}
          positions={drawingBarre}
        />
      )}

      {[...barres, drawingBarre].filter(isNotNull).map((barre) => {
        return (
          <Barre
            key={`${getPositionKey(barre[0])}-${getPositionKey(barre[1])}`}
            positions={barre}
          />
        );
      })}

      {placements.map((placement) => {
        return (
          <Note
            key={getPositionKey(placement)}
            fret={placement.fret}
            string={placement.string}
            opacity={0.2}
            label={`${placement.note.letter}${placement.note.acc}`}
            getStyle={({ maxRadius }) => {
              const isHovered =
                hoveredPlacements?.string === placement.string &&
                hoveredPlacements.fret === placement.fret;

              let isSelected = false;
              let r = maxRadius;
              let opacity = 1;

              for (const key of selectedPlacements.keys()) {
                if (key === getPositionKey(placement)) {
                  isSelected = true;
                }
              }

              if (isSelected) {
                // no-op
              } else if (isHovered) {
                r = r * 0.5;
                opacity = 0.5;
              } else {
                opacity = 0;
                r = 0;
              }

              return {
                circle: {
                  r,
                  opacity,
                },
                text: {
                  opacity: isSelected ? 1 : 0,
                  delay: 200,
                },
              };
            }}
          />
        );
      })}
    </Fretboard>
  );
};

export default InteractiveFretboard;
