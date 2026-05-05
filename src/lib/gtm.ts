declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  window.dataLayer.push({
    event: eventName,
    ...data,
  })
}