import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import * as cam from "@mediapipe/camera_utils";

export default function BodySizeEstimator() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [measurements, setMeasurements] = useState({
    shoulderCM: null,
    hipCM: null,
  });
  const [finalSize, setFinalSize] = useState(null);
  const [pixelsPerCM, setPixelsPerCM] = useState(8.5);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(5);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const measurementsRef = useRef([]);
  const timerRef = useRef(null);

  // Size chart with realistic ranges
  const sizeChart = {
    XXS: { shoulder: [30, 35], hip: [70, 76] },
    XS: { shoulder: [36, 39], hip: [77, 84] },
    S: { shoulder: [40, 43], hip: [85, 92] },
    M: { shoulder: [44, 47], hip: [93, 100] },
    L: { shoulder: [22, 25], hip: [11, 15] },
    XL: { shoulder: [25, 28], hip: [17, 20] },
    XXL: { shoulder: [56, 60], hip: [117, 124] },
  };

  const getRecommendedSize = (shoulder, hip) => {
    let bestMatch = "XS"; // Default fallback
    let smallestDiff = Infinity;

    for (const [size, range] of Object.entries(sizeChart)) {
      const shoulderMid = (range.shoulder[0] + range.shoulder[1]) / 2;
      const hipMid = (range.hip[0] + range.hip[1]) / 2;

      const shoulderDiff = Math.abs(shoulder - shoulderMid);
      const hipDiff = Math.abs(hip - hipMid);
      const totalDiff = shoulderDiff + hipDiff;

      if (totalDiff < smallestDiff) {
        smallestDiff = totalDiff;
        bestMatch = size;
      }
    }

    return bestMatch;
  };

  const startMeasurement = () => {
    setIsMeasuring(true);
    setTimer(5);
    measurementsRef.current = [];
    setFinalSize(null);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          calculateFinalSize();
          setIsMeasuring(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const calculateFinalSize = () => {
    if (measurementsRef.current.length === 0) return;

    // Calculate average of last measurements
    const avgShoulder =
      measurementsRef.current.reduce((sum, m) => sum + m.shoulder, 0) /
      measurementsRef.current.length;
    const avgHip =
      measurementsRef.current.reduce((sum, m) => sum + m.hip, 0) /
      measurementsRef.current.length;

    setFinalSize(getRecommendedSize(avgShoulder, avgHip));
  };

  useEffect(() => {
    if (isMeasuring && measurements.shoulderCM && measurements.hipCM) {
      measurementsRef.current.push({
        shoulder: parseFloat(measurements.shoulderCM),
        hip: parseFloat(measurements.hipCM),
      });
    }
  }, [measurements, isMeasuring]);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = 640;
      canvas.height = 480;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      try {
        if (results.image) {
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        }

        if (results.poseLandmarks) {
          drawConnectors(ctx, results.poseLandmarks, Pose.POSE_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(ctx, results.poseLandmarks, {
            color: "#FF0000",
            lineWidth: 1,
          });

          const leftShoulder = results.poseLandmarks[11];
          const rightShoulder = results.poseLandmarks[12];
          const leftHip = results.poseLandmarks[23];
          const rightHip = results.poseLandmarks[24];

          if (leftShoulder && rightShoulder && leftHip && rightHip) {
            setIsDetecting(true);

            const toPixels = (landmark) => ({
              x: landmark.x * canvas.width,
              y: landmark.y * canvas.height,
            });

            const shoulderWidth = Math.hypot(
              toPixels(leftShoulder).x - toPixels(rightShoulder).x,
              toPixels(leftShoulder).y - toPixels(rightShoulder).y
            );

            const hipWidth = Math.hypot(
              toPixels(leftHip).x - toPixels(rightHip).x,
              toPixels(leftHip).y - toPixels(rightHip).y
            );

            setMeasurements({
              shoulderCM: (shoulderWidth / pixelsPerCM).toFixed(1),
              hipCM: (hipWidth / pixelsPerCM).toFixed(1),
            });
          } else {
            setIsDetecting(false);
          }
        }
      } catch (e) {
        console.error("Error processing results:", e);
        setError("Error processing body measurements");
      } finally {
        ctx.restore();
      }
    });

    let camera;
    if (videoRef.current) {
      try {
        camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            try {
              await pose.send({ image: videoRef.current });
            } catch (e) {
              console.error("Camera frame error:", e);
              setError("Error processing video feed");
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      } catch (e) {
        console.error("Camera initialization error:", e);
        setError("Failed to start camera");
      }
    }

    return () => {
      if (camera) camera.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pixelsPerCM]);

  const adjustCalibration = (adjustment) => {
    setPixelsPerCM((prev) => Math.max(5, Math.min(15, prev + adjustment)));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <video
        ref={videoRef}
        style={{ display: "none" }}
        autoPlay
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="border rounded shadow"
        width={640}
        height={480}
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => adjustCalibration(-0.5)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Zoom Out (-)
        </button>
        <button
          onClick={() => adjustCalibration(0.5)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Zoom In (+)
        </button>
      </div>

      {!isMeasuring ? (
        <button
          onClick={startMeasurement}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start 5-Second Measurement
        </button>
      ) : (
        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded">
          Measuring... {timer}s remaining
        </div>
      )}

      <div className="text-left w-full max-w-md bg-white p-4 rounded shadow">
        <p className="mb-3">
          <strong className="text-lg">Calibration:</strong>{" "}
          {pixelsPerCM.toFixed(2)} pixels/cm
        </p>

        <div className="mb-3 p-3 bg-gray-50 rounded">
          <p>
            <strong>Shoulder Width:</strong>{" "}
            <span className="font-semibold">
              {measurements.shoulderCM ||
                (isDetecting ? "Calculating..." : "—")}{" "}
              cm
            </span>
          </p>
          <p>
            <strong>Hip Width:</strong>{" "}
            <span className="font-semibold">
              {measurements.hipCM || (isDetecting ? "Calculating..." : "—")} cm
            </span>
          </p>
        </div>

        {finalSize && (
          <div className="p-3 bg-green-50 rounded">
            <p className="text-lg font-bold">
              <strong>Nearest Size:</strong>{" "}
              <span className="text-green-700">{finalSize}</span>
            </p>
            <p className="text-sm mt-1">
              Shoulder: {measurements.shoulderCM}cm | Hip: {measurements.hipCM}
              cm
            </p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Instructions:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Stand 1.5-2 meters from camera</li>
            <li>Face directly forward with arms slightly away from body</li>
            <li>Click "Start Measurement" and hold still for 5 seconds</li>
            <li>Your size will be calculated automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
