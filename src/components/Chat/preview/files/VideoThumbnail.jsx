import React, { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const VideoThumbnail = ({ videoUrl }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true); // حالت بارگذاری
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (videoUrl) {
      setThumbnail(null); // پاک کردن thumbnail قبلی
      setLoading(true); // شروع بارگذاری
      video.src = videoUrl;

      video.onloadeddata = () => {
        // تنظیم زمان مشخصی برای گرفتن فریم (مثلاً 1 ثانیه)
        video.currentTime = 1;
      };

      video.onerror = (e) => {
        console.error("Error loading video:", e);
        setLoading(false); // بارگذاری تمام شده
      };
    }
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const captureThumbnail = () => {
      if (video && video.readyState >= 2) {
        // اطمینان از اینکه ویدیو به اندازه کافی بارگذاری شده
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // رسم کردن فریم ویدیو روی canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // تبدیل canvas به داده تصویری
        const imageUrl = canvas.toDataURL("image/png");
        setThumbnail(imageUrl);
        setLoading(false); // بارگذاری تمام شده
      }
    };

    video.addEventListener("seeked", captureThumbnail); // استفاده از رویداد seeked
    return () => {
      video.removeEventListener("seeked", captureThumbnail);
    };
  }, [videoRef.current?.currentTime]); // فقط زمانی که currentTime تغییر می‌کند

  return (
    <div>
      {loading ? (
        <ClipLoader color="#E9EDEF" size={20} />
      ) : (
        thumbnail && (
          <img
            style={{ height: "50px" }}
            src={thumbnail}
            alt="Video Thumbnail"
          />
        )
      )}
      <video ref={videoRef} style={{ display: "none", visibility: "hidden" }} />
      <canvas
        ref={canvasRef}
        style={{ display: "none", visibility: "hidden" }}
      />
    </div>
  );
};

export default VideoThumbnail;
