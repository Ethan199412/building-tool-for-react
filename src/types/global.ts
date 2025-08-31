export {};

declare global {
  interface Window {
    wx: any; // 你也可以换成具体的 wx 类型
    VConsole: any
  }

}