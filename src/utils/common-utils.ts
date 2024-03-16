export class CommonUtils {
  static generateRandomId() {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const machineId = Math.floor(Math.random() * 16777216).toString(16);
    const counter = Math.floor(Math.random() * 16777216).toString(16);

    return timestamp + machineId + counter;
  }
}
