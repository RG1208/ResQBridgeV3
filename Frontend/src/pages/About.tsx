import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About ResQ-Bridge</h1>
        
        <p className="text-lg text-gray-700 mb-8 text-center">
          ResQ-Bridge is a smart emergency response system that bridges the critical gap between road accidents and timely help. 
          Leveraging the power of Artificial Intelligence and Internet of Things (IoT), ResQ-Bridge ensures faster detection, accurate analysis, and immediate alerting of emergency services in case of road accidents or distress situations.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is ResQ-Bridge?</h2>
          <p className="text-gray-700 leading-relaxed">
            ResQ-Bridge is a multi-component system designed to detect vehicular crashes, understand emergency contexts through voice input, and send automated SOS alerts to relevant authorities or contacts. 
            The project aims to reduce emergency response time and save lives by acting in the golden minutes after an incident.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is SIDD?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>SIDD</strong> stands for <strong>Smart Impact Detection Device</strong>. It is a compact IoT device that can be installed in vehicles to monitor and detect sudden impacts using sensors and ML models.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Monitors vehicle dynamics to detect crashes in real-time.</li>
            <li>Integrates with AI models like YOLO for visual accident detection.</li>
            <li>Uses speech processing via Whisper AI to capture voice-based SOS alerts.</li>
            <li>Sends emergency alerts automatically with location data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
