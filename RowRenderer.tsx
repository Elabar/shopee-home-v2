import React, {memo} from 'react';
import {
  View,
  Dimensions,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {heights} from './contants';
import {brandColors} from './colors';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import equal from 'fast-deep-equal';
const {width} = Dimensions.get('window');
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
export const _rowRenderer = (
  type: string | number,
  data: any,
  index: number,
  extendedState?: object | undefined,
) => {
  switch (type) {
    case 'top_banner_slide':
      return <TopBanner data={data} />;
    case 'wallet_info_row':
      return <WalletRow data={data} />;
    case 'main_category_slider':
      return <MainCategorySlider data={data} />;
    case 'photo_promo':
      return <PhotoPromo data={data} />;
    case 'big_brand_discount':
      return <BigBrandDiscount data={data} />;
    case 'spacer':
      return (
        <View
          style={{
            width,
            height: heights.SPACER_HEIGHT,
            backgroundColor: '#F6F6F6',
          }}
        />
      );
    case 'shocking_sale':
      return <ShockingSale data={data} />;
    case 'shopee_mall':
      return <ShopeeMall data={data} />;
    case 'shopee_product':
      return <ShopeeProduct data={data} />;
    case 'shopee_live':
      return <ShopeeLive data={data} />;
    case 'deals_top_ups_bills':
      return <ShopeeDealsTopUpsBills data={data} />;
    case 'trending_search':
      return <ShopeeTrendingSearch data={data} />;
    case 'featured_collections':
      return <ShopeeFeaturedCollection data={data} />;
    case 'main_categories':
      return <ShopeeMainCategory data={data} />;
    case 'section_header':
      return (
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'white',
          }}>
          <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
            {data.data}
          </Text>
        </View>
      );
    case 'category_selector':
      // you probably need to pass in a extended state to determine the selected category
      return <ShopeeCategorySelector data={data} />;
    case 'loading_products':
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            height: 40,
          }}>
          <ActivityIndicator size="large" color={brandColors.main} />
        </View>
      );
    default:
      return (
        <View style={{width: width, backgroundColor: 'cyan'}}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            repellendus dignissimos quasi eaque exercitationem similique numquam
            doloribus minima mollitia nisi, error sit porro, saepe aut obcaecati
            at atque tempora repellat. Lorem ipsum dolor sit amet consectetur
          </Text>
        </View>
      );
  }
};

const TopBanner = memo(
  ({data}) => {
    const renderTopBannerItem = ({item}) => {
      return (
        <Pressable>
          <Image
            source={{uri: item}}
            style={{
              width,
              height: heights.TOP_BANNER_HEIGHT + data.EXTRA_PADDING_TOP,
            }}
          />
        </Pressable>
      );
    };

    const getItemLayout = (_, index) => {
      return {
        length: width,
        offset: width * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.TOP_BANNER_HEIGHT + data.EXTRA_PADDING_TOP,
          width,
          backgroundColor: brandColors.main,
        }}>
        <FlatList
          renderItem={renderTopBannerItem}
          data={data.data}
          horizontal
          windowSize={2}
          pagingEnabled
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const WalletRow = memo(
  ({data}) => {
    return (
      <View style={{height: heights.WALLET_HEIGHT, backgroundColor: 'white'}}>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
            elevation: 4,
            borderRadius: 4,
            backgroundColor: 'white',
            top: heights.WALLET_OFFSET,
            padding: 10,
            alignItems: 'center',
          }}>
          <Ionicons name="ios-scan-outline" size={30} />
          <View
            style={{
              width: 2,
              height: 30,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 10,
            }}
          />
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="wallet-outline"
                color={brandColors.main}
                size={18}
              />
              <Text style={{marginLeft: 4, fontWeight: 'bold'}}>
                RM{data.data.walletBalance}
              </Text>
            </View>
            <Text numberOfLines={2} style={{fontSize: 10, color: '#9CA3AF'}}>
              Top up with Standard Chartered Mastercard & get your benefits
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ex
              libero amet, architecto, cum, ratione officiis veritatis corrupti
              tempore maiores sequi tempora nostrum. Ex aperiam sint vitae
              dolores quasi doloremque!
            </Text>
          </View>
          <View
            style={{
              width: 2,
              height: 30,
              backgroundColor: '#E5E7EB',
              marginHorizontal: 10,
            }}
          />
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="logo-bitcoin"
                color={brandColors.main}
                size={18}
              />
              <Text style={{marginLeft: 4, fontWeight: 'bold'}}>
                {data.data.coinBalance} Coins
              </Text>
            </View>
            <Text numberOfLines={2} style={{fontSize: 10, color: '#9CA3AF'}}>
              FREE coins daily! Check in now!
            </Text>
          </View>
        </View>
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const MainCategorySlider = memo(
  ({data}) => {
    const INDICATOR_HEIGHT = heights.MAIN_CATEGORY_INDICATOR_HEIGHT;
    const SINGLE_SIZE = (heights.MAIN_CATEGORY_HEIGHT - INDICATOR_HEIGHT) / 2;
    const ICON_SIZE = SINGLE_SIZE * 0.5;
    const scrollPosX = useSharedValue(0);
    const TOTAL_WIDTH = data.data.length * SINGLE_SIZE;
    const WINDOW_WIDTH = width;
    const INDICATOR_WIDTH = 30;
    const RATIO = WINDOW_WIDTH / TOTAL_WIDTH;
    const TRANSFORMED_CURRENT_WIDTH = INDICATOR_WIDTH * RATIO;
    const renderMainCategoryItem = ({item}) => {
      const items = item.map(v => {
        return (
          <Pressable
            style={{
              height: SINGLE_SIZE,
              width: SINGLE_SIZE,
            }}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: v.icon}}
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                  }}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  paddingHorizontal: 4,
                  marginTop: 2,
                }}
                numberOfLines={2}>
                {v.label}
              </Text>
            </View>
          </Pressable>
        );
      });

      return <View>{items}</View>;
    };

    const scrollHandler = useAnimatedScrollHandler(event => {
      scrollPosX.value = event.contentOffset.x;
    });

    const indicatorStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: scrollPosX.value / INDICATOR_WIDTH / RATIO}],
        width: TRANSFORMED_CURRENT_WIDTH,
        height: INDICATOR_HEIGHT,
        backgroundColor: 'red',
        borderRadius: 10,
      };
    });

    return (
      <View
        style={{
          height: heights.MAIN_CATEGORY_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <AnimatedFlatlist
          renderItem={renderMainCategoryItem}
          data={data.data}
          horizontal
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: INDICATOR_WIDTH,
              height: INDICATOR_HEIGHT,
              backgroundColor: '#D1D5DB',
              borderRadius: 10,
            }}>
            <Animated.View style={indicatorStyle} />
          </View>
        </View>
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const PhotoPromo = memo(
  ({data}) => {
    return (
      <View
        style={{
          height: heights.PHOTO_PROMO_HEIGHT,
          width,
          padding: 10,
          flexDirection: 'row',
          backgroundColor: 'white',
        }}>
        {data?.data?.map((v, i) => {
          return (
            <Pressable
              style={{
                flex: v.flex,
                marginHorizontal: i !== 1 ? 8 : 0,
                borderWidth: 1,
                borderColor: '#D1D5DB',
                overflow: 'hidden',
                borderRadius: 16,
              }}>
              <Image
                source={{uri: v.image}}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </Pressable>
          );
        })}
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const BigBrandDiscount = memo(
  ({data}) => {
    const DEALS_HEIGHT = 140;
    const DEALS_WIDTH = 100;

    const renderDivider = () => {
      return (
        <View
          style={{
            height: DEALS_HEIGHT,
            width: 1,
            backgroundColor: 'gray',
          }}
        />
      );
    };

    const renderDeals = ({item}) => {
      return (
        <View style={{height: DEALS_HEIGHT, width: DEALS_WIDTH}}>
          <Image
            style={{
              width: DEALS_WIDTH,
              height: DEALS_HEIGHT * 0.75,
              marginBottom: 6,
            }}
            source={{uri: item.image}}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#D0011B', fontSize: 10}}>RM</Text>
            <Text style={{color: '#D0011B'}}>{item.price}</Text>
          </View>
        </View>
      );
    };

    const renderHot = ({item}) => {
      return (
        <View style={{height: DEALS_HEIGHT, width: DEALS_WIDTH}}>
          <Image
            style={{
              width: DEALS_WIDTH,
              height: DEALS_HEIGHT * 0.75,
            }}
            source={{uri: item.image}}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: brandColors.main,
                textAlign: 'center',
                fontSize: 12,
              }}>
              {item.label}
            </Text>
          </View>
        </View>
      );
    };

    const getItemLayoutHot = (_, index) => {
      return {
        length: DEALS_WIDTH,
        offset:
          index !== data.data.hotProducts.length - 1
            ? DEALS_WIDTH * index + 1
            : DEALS_WIDTH * index,
        index,
      };
    };

    const getItemLayoutDeals = (_, index) => {
      return {
        length: DEALS_WIDTH,
        offset:
          index !== data.data.topBrandDeals.length - 1
            ? DEALS_WIDTH * index + 1
            : DEALS_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.BIG_BRAND_DISCOUNT_HEIGHT,
          backgroundColor: '#D0011B',
          width,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="star" color="white" />
            <Text style={{marginLeft: 4, color: 'white', fontSize: 10}}>
              POPULAR BRANDS
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="star" color="white" />
            <Text style={{marginLeft: 4, color: 'white', fontSize: 10}}>
              NEW DEALS DAILY
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="star" color="white" />
            <Text style={{marginLeft: 4, color: 'white', fontSize: 10}}>
              LOWEST PRICES
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white'}}>TOP BRAND DEALS</Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>See More</Text>
              <Ionicons name="chevron-forward" color="white" />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            height: DEALS_HEIGHT,
            backgroundColor: 'white',
            margin: 10,
          }}>
          <FlatList
            data={data.data.topBrandDeals}
            renderItem={renderDeals}
            horizontal
            windowSize={2}
            getItemLayout={getItemLayoutDeals}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={renderDivider}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{color: 'white'}}>HOT PRODUCTS</Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>See More</Text>
              <Ionicons name="chevron-forward" color="white" />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            height: DEALS_HEIGHT,
            backgroundColor: 'white',
            margin: 10,
          }}>
          <FlatList
            data={data.data.hotProducts}
            renderItem={renderHot}
            horizontal
            getItemLayout={getItemLayoutHot}
            windowSize={2}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={renderDivider}
          />
        </View>
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const saleDivider = () => {
  return <View style={{width: 10}} />;
};

const ShockingSale = memo(
  ({data}) => {
    const SALE_HEIGHT = 190;
    const SALE_WIDTH = 150;
    const PROGRESS_BAR_WIDTH = SALE_WIDTH * 0.8;
    const renderSale = ({item}) => {
      return (
        <Pressable
          style={{
            height: SALE_HEIGHT,
            width: SALE_WIDTH,
          }}>
          <Image
            style={{
              width: SALE_WIDTH,
              height: SALE_HEIGHT * 0.75,
            }}
            source={{uri: item.image}}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingVertical: 4,
            }}>
            <Text style={{color: brandColors.main, fontSize: 10}}>RM</Text>
            <Text style={{color: brandColors.main}}>{item.price}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View
              style={{
                width: PROGRESS_BAR_WIDTH,
                height: 12,
                backgroundColor: '#9CA3AF',
                borderRadius: 12,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  position: 'absolute',
                  width: (item.sold / item.qty) * PROGRESS_BAR_WIDTH,
                  height: 12,
                  backgroundColor: brandColors.main,
                }}
              />
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                {item.sold} SOLD
              </Text>
            </View>
          </View>
        </Pressable>
      );
    };

    const getItemLayout = (_, index) => {
      return {
        length: SALE_WIDTH,
        offset:
          index !== data.data.length - 1
            ? SALE_WIDTH * index + 10
            : SALE_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.SHOCKING_SALE_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
              SHOCKING{' '}
            </Text>
            <Text style={{color: brandColors.main}}>SALE</Text>
          </View>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#9CA3AF'}}>See More</Text>
              <Ionicons name="chevron-forward" color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        <View style={{height: SALE_HEIGHT}}>
          <FlatList
            data={data.data}
            renderItem={renderSale}
            ItemSeparatorComponent={saleDivider}
            horizontal
            getItemLayout={getItemLayout}
            windowSize={2}
            contentContainerStyle={{paddingHorizontal: 10}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const spacerDivider = () => {
  return <View style={{width: 10}} />;
};
const ShopeeMall = memo(
  ({data}) => {
    const SLIDE_HEIGHT = 100;
    const SLIDE_WIDTH = width - 10 * 2;
    const MALL_HEIGHT = 170;
    const MALL_WIDTH = 150;
    const renderSlider = ({item}) => {
      return (
        <Pressable style={{width: SLIDE_WIDTH, height: SLIDE_HEIGHT}}>
          <Image
            source={{uri: item}}
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
            }}
            resizeMode="cover"
          />
        </Pressable>
      );
    };

    const renderMall = ({item}) => {
      return (
        <Pressable style={{height: MALL_HEIGHT, width: MALL_WIDTH}}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 1,
              borderColor: '#9CA3AF',
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.productImage}}
              style={{width: MALL_WIDTH, height: MALL_HEIGHT * 0.5}}
              resizeMode="contain"
            />
            <View
              style={{
                marginVertical: 6,
                width: MALL_WIDTH - 16 * 2,
                borderColor: '#9CA3AF',
                borderWidth: 1,
                borderRadius: 99,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.brandImage}}
                style={{
                  width: MALL_WIDTH - 16 * 2 - 2,
                  height: MALL_HEIGHT * 0.2,
                }}
                resizeMode="contain"
              />
            </View>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                numberOfLines={1}
                style={{
                  textAlign: 'center',
                  color: brandColors.mall,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                {item.label}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    };

    const getItemLayoutMain = (_, index) => {
      return {
        length: SLIDE_WIDTH,
        offset: SLIDE_WIDTH * index,
        index,
      };
    };

    const getItemLayoutMall = (_, index) => {
      return {
        length: MALL_WIDTH,
        offset:
          index !== data.data.malls.length - 1
            ? MALL_WIDTH * index + 10
            : MALL_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.SHOPEE_MALL_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: brandColors.mall, fontWeight: 'bold'}}>
            SHOPEE MALL
          </Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#9CA3AF'}}>See More</Text>
              <Ionicons name="chevron-forward" color="#9CA3AF" />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: '#9CA3AF',
            marginHorizontal: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="shield" color={brandColors.mall} />
            <Text style={{marginLeft: 4, fontSize: 10}}>100% Authentic</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="backspace" color={brandColors.mall} />
            <Text style={{marginLeft: 4, fontSize: 10}}>15 Days Return*</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="car" color={brandColors.mall} />
            <Text style={{marginLeft: 4, fontSize: 10}}>Free Shipping</Text>
          </View>
        </View>

        <View style={{margin: 10, height: SLIDE_HEIGHT}}>
          <FlatList
            renderItem={renderSlider}
            data={data.data.mainSlider}
            horizontal
            getItemLayout={getItemLayoutMain}
            windowSize={2}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
        </View>

        <FlatList
          renderItem={renderMall}
          data={data.data.malls}
          horizontal
          windowSize={2}
          getItemLayout={getItemLayoutMall}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={spacerDivider}
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeLive = memo(
  ({data}) => {
    const LIVE_WIDTH = 150;
    const LIVE_HEIGHT = 200;

    const renderLive = ({item}) => {
      return (
        <Pressable
          style={{
            height: LIVE_HEIGHT,
            width: LIVE_WIDTH,
          }}>
          <ImageBackground
            source={{uri: item.img}}
            resizeMode="cover"
            style={{
              height: LIVE_HEIGHT,
              width: LIVE_WIDTH,
              padding: 10,
              justifyContent: 'space-between',
            }}
            imageStyle={{height: LIVE_HEIGHT, width: LIVE_WIDTH}}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0, 0.3)',
                height: LIVE_HEIGHT,
                width: LIVE_WIDTH,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: brandColors.main,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 2,
                }}>
                <Ionicons name="pulse-outline" color="white" />
                <Text style={{color: 'white', fontSize: 10, marginRight: 6}}>
                  LIVE
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 2,
                }}>
                <Ionicons name="eye" color="white" style={{marginLeft: 2}} />
                <Text style={{color: 'white', fontSize: 10, marginRight: 6}}>
                  {item.watchingCount}
                </Text>
              </View>
            </View>

            <Text numberOfLines={2} style={{color: 'white'}}>
              {item.label}
            </Text>
          </ImageBackground>
        </Pressable>
      );
    };

    const getItemLayout = (_, index) => {
      return {
        length: LIVE_WIDTH,
        offset:
          index !== data.data.length - 1
            ? LIVE_WIDTH * index + 10
            : LIVE_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.SHOPEE_LIVE_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
            SHOPEE LIVE
          </Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#9CA3AF'}}>See More</Text>
              <Ionicons name="chevron-forward" color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.data}
          windowSize={2}
          getItemLayout={getItemLayout}
          renderItem={renderLive}
          ItemSeparatorComponent={spacerDivider}
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeDealsTopUpsBills = memo(
  ({data}) => {
    const SLIDE_HEIGHT = 100;
    const SLIDE_WIDTH = width - 10 * 2;
    const CAT_HEIGHT = 80;
    const CAT_WIDTH = 70;
    const lineSpacerDivider = () => {
      return (
        <View style={{height: CAT_HEIGHT, marginHorizontal: 10}}>
          <View
            style={{
              width: 0.5,
              backgroundColor: '#9CA3AF',
              flex: 1,
              marginVertical: 20,
            }}></View>
        </View>
      );
    };
    const renderSlider = ({item}) => {
      return (
        <Pressable style={{width: SLIDE_WIDTH, height: SLIDE_HEIGHT}}>
          <Image
            source={{uri: item}}
            style={{
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
            }}
            resizeMode="cover"
          />
        </Pressable>
      );
    };

    const renderCat = ({item}) => {
      return (
        <Pressable
          style={{
            width: CAT_WIDTH,
            height: CAT_HEIGHT,
          }}>
          <Image
            source={{uri: item.brandImage}}
            style={{width: CAT_WIDTH, height: Math.floor(CAT_HEIGHT / 2)}}
            resizeMode="contain"
          />
          <Text numberOfLines={2} style={{textAlign: 'center', fontSize: 12}}>
            {item.label}
          </Text>
        </Pressable>
      );
    };

    const getItemLayoutMain = (_, index) => {
      return {
        length: SLIDE_WIDTH,
        offset: SLIDE_WIDTH * index,
        index,
      };
    };

    const getItemLayoutCat = (_, index) => {
      return {
        length: CAT_WIDTH,
        offset:
          index !== data.data.cats.length - 1
            ? CAT_WIDTH * index + 20.5
            : CAT_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.DEALS_TOP_UP_BILLS_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
            DEALS, TOP-UPS & BILLS
          </Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#9CA3AF'}}>See More</Text>
              <Ionicons name="chevron-forward" color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <FlatList
            renderItem={renderSlider}
            data={data.data.mainSlider}
            horizontal
            windowSize={2}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            getItemLayout={getItemLayoutMain}
          />
        </View>
        <FlatList
          renderItem={renderCat}
          data={data.data.cats}
          horizontal
          windowSize={2}
          showsHorizontalScrollIndicator={false}
          getItemLayout={getItemLayoutCat}
          ItemSeparatorComponent={lineSpacerDivider}
          style={{marginTop: 10}}
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeTrendingSearch = memo(
  ({data}) => {
    const BOX_WIDTH = Math.floor(width / 2);
    const BOX_HEIGHT = 70;
    const IMAGE_SIZE = 70 - 6 * 2;
    return (
      <View
        style={{
          height: heights.TRENDING_SEARCH_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
            TRENDING SEARCHES
          </Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="refresh" color={brandColors.main} />
              <Text style={{color: brandColors.main}}>Change</Text>
            </View>
          </Pressable>
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {data.data.map(v => {
            return (
              <View style={{height: BOX_HEIGHT, width: BOX_WIDTH}}>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 0.4,
                    borderColor: '#9CA3AF',
                    padding: 6,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'space-between', flex: 1}}>
                    <Text style={{fontWeight: 'bold'}} numberOfLines={2}>
                      {v.title}
                    </Text>
                    <Text style={{color: '#9CA3AF', fontSize: 12}}>
                      {v.caption}
                    </Text>
                  </View>

                  <Image
                    source={{uri: v.image}}
                    style={{width: IMAGE_SIZE, height: IMAGE_SIZE}}
                    resizeMode="cover"
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeFeaturedCollection = memo(
  ({data}) => {
    const COLLECTION_HEIGHT = 180;
    const COLLECTION_WIDTH = Math.floor(width * 0.6);

    const renderCollection = ({item}) => {
      return (
        <Pressable
          style={{
            height: COLLECTION_HEIGHT,
            width: COLLECTION_WIDTH,
            backgroundColor: '#F7F7F7',
            borderColor: '#9CA3AF',
            borderWidth: 0.5,
            overflow: 'hidden',
          }}>
          <View style={{flex: 1}}>
            <Image
              source={{uri: item.image}}
              style={{
                height: COLLECTION_HEIGHT * 0.7,
                width: COLLECTION_WIDTH,
                backgroundColor: 'white',
              }}
              resizeMode="contain"
            />
            <View
              style={{padding: 6, flex: 1, justifyContent: 'space-between'}}>
              <Text>{item.title}</Text>
              <Text style={{fontSize: 12, color: '#9CA3AF'}}>
                {item.caption}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    };

    const getItemLayout = (_, index) => {
      return {
        length: COLLECTION_WIDTH,
        offset:
          index !== data.data.length - 1
            ? COLLECTION_WIDTH * index + 10
            : COLLECTION_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.FEATURED_COLLECTION_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
            FEATURED COLLECTIONS
          </Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#9CA3AF'}}>See More</Text>
              <Ionicons name="chevron-forward" color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        <FlatList
          renderItem={renderCollection}
          data={data.data}
          horizontal
          windowSize={2}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
          ItemSeparatorComponent={spacerDivider}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeMainCategory = memo(
  ({data}) => {
    const SINGLE_SIZE = 120;
    const ICON_SIZE = SINGLE_SIZE * 0.7;

    const renderMainCategoryItem = ({item}) => {
      const items = item.map(v => {
        return (
          <Pressable
            style={{
              height: SINGLE_SIZE,
              width: SINGLE_SIZE,
            }}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#F7F7F7',
                    borderRadius: 99,
                    width: ICON_SIZE * 0.8,
                    height: ICON_SIZE * 0.85,
                    position: 'absolute',
                  }}
                />

                <Image
                  source={{uri: v.icon}}
                  style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                  }}
                  resizeMode="contain"
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  paddingHorizontal: 6,
                  marginTop: 2,
                }}
                numberOfLines={2}>
                {v.label}
              </Text>
            </View>
          </Pressable>
        );
      });

      return <View>{items}</View>;
    };

    const getItemLayout = (_, index) => {
      return {
        length: SINGLE_SIZE,
        offset: SINGLE_SIZE * index,
        index,
      };
    };

    return (
      <View
        style={{
          height: heights.MAIN_CATEGORIES_HEIGHT,
          width,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: brandColors.main, fontWeight: 'bold'}}>
            CATEGORIES
          </Text>
          <Pressable>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#9CA3AF'}}>See More</Text>
              <Ionicons name="chevron-forward" color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        <FlatList
          renderItem={renderMainCategoryItem}
          data={data.data}
          getItemLayout={getItemLayout}
          windowSize={2}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeCategorySelector = memo(
  ({data}) => {
    const PADDING = 4;
    const CAT_HEIGHT = heights.CATEGORY_SELECTOR_HEIGHT - PADDING * 2;
    const CAT_WIDTH = 70;
    const ICON_SIZE = Math.floor(CAT_HEIGHT / 2);
    const spacerDivider = () => {
      return <View style={{width: PADDING}} />;
    };
    const renderCat = ({item, index}) => {
      return (
        <View
          style={{
            height: CAT_HEIGHT,
            width: CAT_WIDTH,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              borderColor: index === 0 ? brandColors.main : 'transparent',
              borderWidth: 1,
              flex: 1,
              justifyContent: 'space-between',
              padding: 4,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.icon}}
              style={{width: ICON_SIZE, height: ICON_SIZE}}
              resizeMode="contain"
            />

            <Text
              style={{
                fontSize: 11,
                color: index === 0 ? brandColors.main : '#9CA3AF',
                textAlign: 'center',
              }}>
              {item.label}
            </Text>
          </View>
        </View>
      );
    };

    const getItemLayout = (_, index) => {
      return {
        length: CAT_WIDTH,
        offset:
          index !== data.data.length - 1
            ? CAT_WIDTH * index + PADDING
            : CAT_WIDTH * index,
        index,
      };
    };

    return (
      <View
        style={{
          backgroundColor: '#F6F6F6',
          height: heights.CATEGORY_SELECTOR_HEIGHT,
          width,
        }}>
        <FlatList
          data={data.data}
          renderItem={renderCat}
          horizontal
          getItemLayout={getItemLayout}
          windowSize={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: PADDING}}
          ItemSeparatorComponent={spacerDivider}
        />
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);

const ShopeeProduct = memo(
  ({data}) => {
    const IMAGE_HEIGHT = Math.floor(heights.PRODUCT_HEIGHT * 0.7);
    const PRODUCT_WIDTH = Math.floor(width / 2);
    return (
      <View
        style={{
          height: heights.PRODUCT_HEIGHT,
          width: PRODUCT_WIDTH,
          // backgroundColor: '#9CA3AF',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 2,
            flex: 1,
            overflow: 'hidden',
          }}>
          <Image
            style={{width: PRODUCT_WIDTH - 2 * 2, height: IMAGE_HEIGHT}}
            resizeMode="contain"
            source={{uri: data.data?.image}}
          />
          <View style={{padding: 4, justifyContent: 'space-between', flex: 1}}>
            <Text numberOfLines={2}>{data.data?.label}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 12, color: brandColors.main}}>RM</Text>
                <Text style={{color: brandColors.main}}>
                  {data.data?.price}
                </Text>
              </View>
              <Text style={{fontSize: 10}}>{data.data?.sold} sold</Text>
            </View>
          </View>
        </View>
      </View>
    );
  },
  (prev, cur) => {
    return equal(prev, cur);
  },
);
