"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Coś poszło nie tak!</h2>
      <button onClick={() => reset()}>Spróbuj ponownie</button>
    </div>
  );
}
