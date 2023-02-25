import { Message } from 'element-ui';

// elementUi 方法 => 成功消息提示
export function successMsg(message) {
  Message({
    duration: 2000,
    center: true,
    dangerouslyUseHTMLString: true,
    message: message,
    type: 'success'
  });
}

// elementUi 方法 => 警告消息提示
export function warnMsg(message) {
  Message({
    duration: 2000,
    center: true,
    dangerouslyUseHTMLString: true,
    message: message,
    type: 'warning'
  });
}

// elementUi 方法 => 错误i消息提示
export function errorMsg(message) {
  Message({
    duration: 2000,
    center: true,
    dangerouslyUseHTMLString: true,
    message: message,
    type: 'error'
  });
}