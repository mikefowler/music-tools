import { Position } from '@moonwave99/fretboard.js';
import React, { useState } from 'react';
import FretboardControlled, {
  FretboardControlledProps,
} from './FretboardControlled';

type FretboardControllerProps = Pick<
  FretboardControlledProps,
  'id' | 'editable'
>;

const FretboardController: React.FC<FretboardControllerProps> = (props) => {
  const [dots, setDots] = useState<Position[]>([]);

  return <FretboardControlled {...props} dots={dots} onSetDots={setDots} />;
};

export default FretboardController;
