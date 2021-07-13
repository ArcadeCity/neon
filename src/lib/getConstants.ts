import Constants from 'expo-constants'

export const OUR_VERSION_NUMBER = '5.0.2'

export const getConstants = () => {
  const { appOwnership, deviceName, deviceYearClass } = Constants

  return {
    appOwnership,
    deviceName,
    deviceYearClass,
    ourVersionNumber: OUR_VERSION_NUMBER,
  }
}
