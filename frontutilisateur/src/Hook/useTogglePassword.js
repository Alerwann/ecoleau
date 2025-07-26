import { useState } from 'react';

export const usePasswordDisplay = (initialValue = '') => {
  const [password, setPassword] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
  };
};

export default usePasswordDisplay