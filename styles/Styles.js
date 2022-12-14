import { Dimensions } from 'react-native'

export const Colors = {
  black1: '#030303',
  greyTransparent: 'rgba(28,28,30,0.6)',
  grey1: '#1C1C1E',
  grey2: '#4f4f4f',
  grey3: '#afb0b3',
  white1: '#F7F7F7',
  ripple: '#223355',
  pink1: '#d36baa'
}

const WIDTH = Dimensions.get('window').width
export const StandardWidth = Math.floor(WIDTH) - 20
