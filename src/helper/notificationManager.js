class notificationManager {
  constructor() {
    if (!("Notification" in window) || !('PushManager' in window)) {
        alert("This browser does not support desktop notification");
      }

      else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
  }
  sendNotifiction(text, time) {
    time = (time < 0) ? 1 : time;
    window.setTimeout(() => new Notification(text), time);
  }
}
export const notificationHandler = new notificationManager();
