import Backward from './backward.svg';
import DownArrow from './downarrow.svg';
import LeftArrow from './leftarrow.svg';
import RightArrow from './rightarrow.svg';
import UpArrow from './uparrow.svg';
import Login from './login.svg';
import Key from './key.svg';
import User from './user.svg';
import Home from './home.svg';

type Props = {
  svg: string;
  width?: number;
  height?: number;
  color?: string;
};

const icons = {
  backward: Backward,
  downarrow: DownArrow,
  leftarrow: LeftArrow,
  rightarrow: RightArrow,
  uparrow: UpArrow,
  login: Login,
  key: Key,
  user: User,
  home: Home,
};

export const Icon = ({ svg, color = "black", width = 24, height = 24 }: Props) => {
    
    //searchs icon that matches the svg string prop
    const SvgComponent = icons[svg as keyof typeof icons];

  if (!SvgComponent) {
    console.warn(`Icon "${svg}" not found.`);
    return null;
  }

  return (
    <SvgComponent
      style={{ width, height, color }}
      className="w-auto h-auto"
    />
  );
};
