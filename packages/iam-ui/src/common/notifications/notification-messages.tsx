
import { notification } from 'antd';
import { IconType, NotificationPlacement } from 'antd/es/notification/interface';


notification.config({ maxCount: 3, duration: 5, placement: 'top' });
export class AlertMessages {

  static getErrorMessage = (content: string, placement: NotificationPlacement = 'topRight') => {
    notification.error(
      {
        message: `Error : ${content}`,
        placement,
      }
    );
    return false;
  }

  static getSuccessMessage = (content: string, placement: NotificationPlacement = 'topRight') => {
    notification.success({
      message: `Success : ${content}`,
      placement,
    });
    return false;
  }

  static getWarningMessage = (content: string, placement: NotificationPlacement = 'topRight') => {
    notification.warning({
      message: `Warning : ${content}`,
      placement,
    });
    return false;
  }

  static getInfoMessage = (content: string, placement: NotificationPlacement = 'topRight') => {
    notification.info({
      message: `Inform : '${content}`,
      placement,
    });
    return false;
  }

  static getCustomMessage = (icon: IconType, content: string, placement: NotificationPlacement = 'topRight') => {
    notification.open({
      type: icon,
      message: content,
      placement,
    });
    return false;
  }

  render() {
    return;
  }
}

export default AlertMessages;
