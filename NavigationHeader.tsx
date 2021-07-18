import React from 'react';
import {Dimensions, View, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './IconWithBadge';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import {brandColors} from './colors';
const padding = 8;
const {width} = Dimensions.get('window');

// height of this is 51!
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const NavigationHeader = ({
  scrollPosY,
}: {
  scrollPosY: Animated.SharedValue<number>;
}) => {
  const insets = useSafeAreaInsets();

  const navigationAniamtedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: insets.top + padding,
      paddingHorizontal: padding,
      paddingBottom: padding,
      backgroundColor: interpolateColor(
        scrollPosY.value,
        [0, 1],
        ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      ),
      position: 'absolute',
      top: 0,
      zIndex: 999,
      width: width,
    };
  });

  const searchBoxStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollPosY.value,
        [0, 1],
        ['rgba(255,255,255,1)', '#E5E7EB'],
      ),
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: padding,
      paddingHorizontal: padding,
      paddingVertical: 4,
    };
  });

  return (
    <Animated.View style={navigationAniamtedStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Animated.View style={searchBoxStyle}>
          <Ionicons name="search-outline" size={20} />
          <View style={{flex: 1, paddingHorizontal: padding}}>
            <TextInput
              placeholderTextColor={brandColors.main}
              style={{paddingVertical: 0}}
              placeholder="Eucerin: RM90 Off Voucher + Free Shipping + GUGUBIRD"
            />
          </View>

          <Ionicons name="camera-outline" size={20} />
        </Animated.View>

        <View style={{paddingHorizontal: padding}}>
          <IconWithBadge
            iconName="cart-outline"
            badgeLabel="6"
            scrollPosY={scrollPosY}
          />
        </View>
        <View style={{paddingHorizontal: padding}}>
          <IconWithBadge
            iconName="chatbubbles-outline"
            badgeLabel="6"
            scrollPosY={scrollPosY}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default NavigationHeader;
