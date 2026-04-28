import { useCallback, useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState("");

  const getFingerprint = useCallback(async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      return result.visitorId;
    } catch (error) {
      console.error("Fingerprint collection failed:", error);
      return "";
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    getFingerprint().then((id) => {
      if (isActive && id) {
        setFingerprint(id);
      }
    });

    return () => {
      isActive = false;
    };
  }, [getFingerprint]);

  return { fingerprint, getFingerprint };
};

export default useFingerprint;
