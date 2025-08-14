import { useState } from "react";

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
  };}

export const useMultiPasswordDisplay = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    verify: ''
  });
  
  const [showStates, setShowStates] = useState({
    current: false,
    new: false,
    verify: false
  });

  const setPassword = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleVisibility = (field) => {
    setShowStates(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return {
    passwords,
    showStates,
    setPassword,
    toggleVisibility,
    // Raccourcis pour chaque champ
    current: {
      value: passwords.current,
      show: showStates.current,
      setValue: (value) => setPassword('current', value),
      toggle: () => toggleVisibility('current')
    },
    new: {
      value: passwords.new,
      show: showStates.new,
      setValue: (value) => setPassword('new', value),
      toggle: () => toggleVisibility('new')
    },
    verify: {
      value: passwords.verify,
      show: showStates.verify,
      setValue: (value) => setPassword('verify', value),
      toggle: () => toggleVisibility('verify')
    }
  };
};




  export default usePasswordDisplay



