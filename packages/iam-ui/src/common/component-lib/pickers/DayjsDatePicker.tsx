import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import { AppDate } from '../../constants/Dates';

export const DayjsDatePicker = generatePicker<AppDate>(dayjsGenerateConfig);
