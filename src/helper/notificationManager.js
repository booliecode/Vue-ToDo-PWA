class notificationManager {
  constructor() {

      if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
  }
  sendNotifiction(text, time) {
    time = (time < 0) ? 1 : time;
    window.setTimeout(() => new Notification(text), time);
  }
}
export const notificationHandler = new notificationManager();
