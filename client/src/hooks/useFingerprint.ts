import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState("");

  const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    setFingerprint(result.visitorId);
  };

  useEffect(() => {
    getFingerprint();
  }, []);

  return { fingerprint, getFingerprint };
};

export default useFingerprint;
