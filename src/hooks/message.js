import { useState } from "react";

export function useMessageHook(initialValue) {
    const [message, setMessage] = useState(initialValue);
    const reset = () => {
        setMessage('')
    }
  
    return [message, setMessage, reset];
  }