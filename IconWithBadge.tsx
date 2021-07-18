import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';
import {brandColors} from './colors';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const IconWithBadge = ({
  iconName = 'cart-outline',
  badgeLabel = '1',
  scrollPosY,
}: {
  iconName: any;
  badgeLabel: string;
  scrollPosY: Animated.SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollPosY.value,
        [0, 1],
        ['rgba(255,255,255,1)', 'rgba(0,0,0,1)'],
      ),
    };
  });

  const iconColor = useAnimatedProps(() => {
    return {
      color: interpolateColor(
        scrollPosY.value,
        [0, 1],
        ['rgba(255,255,255,1)', 'rgba(0,0,0,1)'],
      ),
      size: 20,
      name: iconName,
    };
  });

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          right: -5,
          top: -5,
          backgroundColor: brandColors.main,
          borderRadius: 999,
          width: 16,
          height: 16,
          zIndex: 9999,
        }}>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 12,
            color: 'white',
          }}>
          {badgeLabel}
        </Text>
      </View>
      <AnimatedIcon animatedProps={iconColor}/>
    </View>
  );
};

export default IconWithBadge;
