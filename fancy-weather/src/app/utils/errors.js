import Toastify from 'toastify-js';

export const errorColor = 'linear-gradient(135deg, #FF3043, #FF722E)';

export function queryResultMessage(message) {
  const validateToast = Toastify({
    text: `${message}`,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: errorColor
  });
  validateToast.showToast();
}
