import React, {
    useState,
    useRef,
    memo,
  } from 'react';
  import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    FlatList,
    SafeAreaView,
  } from 'react-native';
  import {globalStyle, width} from '../styles/styles';
  
  import PropTypes from 'prop-types';
  
  const SlideButton = ({
    title,
    renderFirstItem,
    renderSecondItem,
    renderThirdItem,
    renderFourthItem,
    renderFiveItem,
    renderSixItem,
    renderSevenItem,
    renderEighItem,
    buttonColor,
  }) => {
    const length = title.length;
    // length > 4 && console.warn('Sorry the component have 4 as maximum value')
    const [active, setActive] = useState(0);
    const [xTabOne, setTabOne] = useState(0);
    const [xTabThree, setTabThree] = useState(0);
    const translateX = useState(new Animated.Value(0))[0];
    const currentSlide = useRef();
    const tabRef = useRef();
    const TAB_SPACE = width / 5 + 10;
    const array = [
      renderFirstItem(),
      renderSecondItem(),
      renderThirdItem(),
      renderFourthItem(),
      renderFiveItem(),
      renderSixItem(),
      renderSevenItem(),
      renderEighItem(),
    ];
    function handleChange(type, tab) {
      setActive(type);
      // currentSlide.current.scrollToOffset({animated: true,index:type})
    }
    function handleMovements({nativeEvent}) {
      const slide = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      const count = slide * TAB_SPACE - TAB_SPACE / 2 + TAB_SPACE / 6;
      setActive(slide), handleChange(slide);
      if (count) {
        tabRef?.current?.scrollToOffset({
          offset: slide === 0 ? slide : (width / (length - 1)) * slide,
          animated: true,
        });
      } else {
        tabRef?.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }
    }
    const setIndex = (index) => {
      currentSlide?.current?.scrollToOffset({
        offset: index * width,
        animated: true,
      });
      setActive(index);
      ;
      if (index * TAB_SPACE - TAB_SPACE / 2 > width / 2) {
        tabRef?.current?.scrollToOffset({
          offset: index === 0 ? index : (width / (length - 1)) * index,
          animated: true,
        });
      } else {
        tabRef?.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }
    };
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: width * 0.95,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          
          <FlatList
            ref={tabRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            // snapToInterval={16}
            data={title}
            style={[globalStyle.parentHeader]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {

              return (
                <>
                  <TouchableOpacity
                    // key={index}
                    onPress={() => setIndex(index)}
                    style={{
                      width: TAB_SPACE,

                      justifyContent: 'center',
                      alignItems: 'center',
  
                      borderBottomWidth: index == active ? 4 : 0,
                      borderBottomColor: buttonColor,
  
                      transform: [{translateX}],
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: active === index ? buttonColor : 'black',
                        fontWeight: active === index ? 'bold' : 'normal',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            ref={currentSlide}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{top: 80}}
            pagingEnabled
            onMomentumScrollEnd={handleMovements}
            data={array}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return <View style={{flex: 1, width: width}}>{item}</View>;
            }}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  SlideButton.PropTypes = {
    title: PropTypes.array.isRequired,
    renderFirstItem: PropTypes.func.isRequired,
    renderSecondItem: PropTypes.func.isRequired,
    renderThirdItem: PropTypes.func,
    renderFourthItem: PropTypes.func,
    renderFiveItem: PropTypes.func,
    renderSixItem: PropTypes.func,
    renderSevenItem: PropTypes.func,
    renderEighItem: PropTypes.func,
    buttonColor: PropTypes.string,
  };
  SlideButton.defaultProps = {
    buttonColor: '#5790f2',
  };
  export default memo(SlideButton);
  