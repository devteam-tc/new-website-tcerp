import { 
  FaChartLine, 
  FaDatabase, 
  FaUsers, 
  FaExpand, 
  FaChartBar, 
  FaChartPie 
} from 'react-icons/fa';

const iconMap = {
  FaChartLine,
  FaDatabase,
  FaUsers,
  FaExpand,
  FaChartBar,
  FaChartPie
};

const CardIcon = ({ iconName }) => {
  const Icon = iconMap[iconName];
  return Icon ? <Icon size={32} /> : null;
};

export default CardIcon; 