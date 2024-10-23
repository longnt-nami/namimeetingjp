"use client";

import { useEffect, useState } from "react";

const useRecorder = (callbackFunc: any, callbackStreamFunc: any) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder(callbackStreamFunc).then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    recorder.addEventListener("dataavailable", callbackFunc);
    return () => recorder.removeEventListener("dataavailable", callbackFunc);
  }, [recorder, isRecording]);

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => {
    recorder?.stream.getTracks()[0].stop();
    recorder?.stream.getAudioTracks().forEach(function (track) {
      console.log(track);
      track.stop();
    });
    setRecorder(null);
    setIsRecording(false);
  };

  return [isRecording, startRecording, stopRecording, recorder] as const;
};

async function requestRecorder(callbackStreamFunc: any) {
  const AudioContext = window.AudioContext;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const csAudioContext = new AudioContext({
    sampleRate: 16000,
  });

  const source = csAudioContext.createMediaStreamSource(stream);
  const dest = csAudioContext.createMediaStreamDestination();
  const dest2 = csAudioContext.createMediaStreamDestination();
  const processor = csAudioContext.createScriptProcessor(1024, 1, 1);

  dest.channelCount = 1;
  dest.channelCountMode = "explicit";
  dest.channelInterpretation = "speakers";

  dest2.channelCount = 1;
  dest2.channelCountMode = "explicit";
  dest2.channelInterpretation = "speakers";

  source.connect(processor);
  processor.connect(dest);
  source.connect(dest2);

  processor.onaudioprocess = (e) => {
    const channel = e.inputBuffer.getChannelData(0);
    const buffer = new ArrayBuffer(channel.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < channel.length; i++) {
      const sample = Math.max(-1, Math.min(1, channel[i]));
      view.setInt16(
        i * 2,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true
      );
    }
    callbackStreamFunc(view.buffer);
    return e;
  };
  return new MediaRecorder(dest.stream);
}
export default useRecorder;
