import { useEffect, useRef } from 'react';

type prevValueType = boolean | number;

export function usePrevious(value: prevValueType) {
  const ref = useRef<prevValueType>(null!);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function HooksUtilities() {}

export default HooksUtilities;
