import { useThemeState } from '../../../store';
import { useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeToggle = () => {
  const { isDark, setIsDark } = useThemeState();

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark, setIsDark]);

  return (
    <button className="icon-button shadow-sm" onClick={() => setIsDark(!isDark)}>
      {isDark ?
        <LightModeIcon className='icon' fontSize='large' /> :
        <DarkModeIcon className='icon' fontSize='large' />}
    </button >
  )
}

export default ThemeToggle;