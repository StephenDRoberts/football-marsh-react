import { useEffect } from 'react';

export const useWheelEvent = (callback) => {

  useEffect(() => {
    window.addEventListener('wheel', callback)

    return () => window.removeEventListener('wheel', callback)
  }, [callback])
}