import React, { useCallback, useEffect, useRef } from 'react';

export interface MetronomeAudioProps {
  on?: boolean;
  lookahead?: number;
  tempo?: number;
  beatsPerBar?: number;
}

const SCHEDULE_AHEAD_TIME = 0.1;

const MetronomeAudio: React.FC<MetronomeAudioProps> = ({
  on = false,
  lookahead = 25,
  tempo = 120,
  beatsPerBar = 4,
}) => {
  const playing = useRef(false);
  const currentBeatInBar = useRef(0);
  const nextNoteTime = useRef(0.0);
  const notesInQueue = useRef<Array<{ beat: number; time: number }>>([]);
  const interval = useRef<number | null>(null);
  const audio = useRef(new AudioContext());

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime.current += secondsPerBeat;

    currentBeatInBar.current += 1;

    if (currentBeatInBar.current === beatsPerBar) {
      currentBeatInBar.current = 0;
    }
  }, [beatsPerBar, tempo]);

  const scheduleNote = useCallback(
    (beat: number, time: number) => {
      notesInQueue.current.push({ beat, time });

      const oscillator = audio.current.createOscillator();
      const envelope = audio.current.createGain();

      oscillator.frequency.value = beat % beatsPerBar === 0 ? 1000 : 800;
      envelope.gain.value = 1;
      envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      oscillator.connect(envelope);
      envelope.connect(audio.current.destination);

      oscillator.start(time);
      oscillator.stop(time + 0.03);
    },
    [beatsPerBar]
  );

  const schedule = useCallback(() => {
    while (
      nextNoteTime.current <
      audio.current.currentTime + SCHEDULE_AHEAD_TIME
    ) {
      scheduleNote(currentBeatInBar.current, nextNoteTime.current);
      nextNote();
    }
  }, [nextNote, scheduleNote]);

  const start = useCallback(() => {
    playing.current = true;
    nextNoteTime.current = audio.current.currentTime + 0.05;
    interval.current = setInterval(() => schedule(), lookahead);
  }, [lookahead, schedule]);

  const stop = useCallback(() => {
    playing.current = false;

    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  useEffect(() => {
    stop();
    currentBeatInBar.current = 0;
    notesInQueue.current = [];
  }, [tempo, stop]);

  useEffect(() => {
    if (on) {
      start();
    } else {
      stop();
    }
  }, [on, start, stop]);

  return null;
};

export default MetronomeAudio;
