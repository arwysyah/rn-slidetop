
import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.62;
const TOP = 24;

const backgroundColor = '#cacfca';
const ITEM_WIDTH = (width / 1.4) * 0.76;
const ITEM_HEIGHT = (ITEM_WIDTH / 1.4) * 1.47;
const BACKCOLOR = '#f0f5f2';
const globalStyle = StyleSheet.create({
  container: {
    backgroundColor: BACKCOLOR,
    flex: 1,
  },
  parentHeader:{
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    height: 36,
    position: 'relative',
    backgroundColor: 'white',
  },
  
});

export {
  globalStyle,
width,
  TOP,
  height,
  backgroundColor,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  BACKCOLOR,
};