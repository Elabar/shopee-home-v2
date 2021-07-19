import React, {useRef} from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, View, StatusBar, Alert, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import StickyContainer from 'recyclerlistview/sticky';
import equal from 'fast-deep-equal';
import {_rowRenderer} from './RowRenderer';
import NavigationHeader from './NavigationHeader';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {heights} from './contants';
import {ScrollEvent} from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
import axios from 'axios';

const dataProvider = new DataProvider((r1, r2) => {
  return !equal(r1, r2);
});

const baseURL = 'https://shopee-clone-v2.herokuapp.com/';

const client = axios.create({baseURL: baseURL});

const defaultLayoutProvider = new LayoutProvider(
  index => 0,
  (type, dim) => {
    dim.height = 0;
    dim.width = 0;
  },
);

const {width} = Dimensions.get('window');
const Home = () => {
  const insets = useSafeAreaInsets();
  const currentScrollYPos = useSharedValue(0);
  const [_dataProvider, setDataProvider] = useState(
    dataProvider.cloneWithRows([]),
  );
  const [_layoutProvider, setLayoutProvider] = useState(defaultLayoutProvider);
  const [data, setData] = useState([]);
  const [EXTRA_PADDING_TOP, setEXTRA_PADDING_TOP] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const changeOffset = useRef(0);
  const getDashboardData = async () => {
    try {
      setLoading(true);
      const {data} = await client.get('/getDashboard');
      setData(data);
    } catch (err) {
      Alert.alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      const {data: products} = await client.get('/getMoreProducts');
      changeOffset.current = data.length - 1;
      setData([...data, ...products]);
    } catch (err) {
      Alert.alert('Network error');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    setEXTRA_PADDING_TOP(heights.NAVIGATION_HEADER_HEIGHT + insets.top);
  }, [insets]);

  useEffect(() => {
    if (data.length > 0) {
      let newData = [...data, {type: 'loading_products'}];
      newData[0].EXTRA_PADDING_TOP = EXTRA_PADDING_TOP;
      setDataProvider(
        _dataProvider.cloneWithRows(newData, changeOffset.current),
      );
      changeOffset.current = 0;
    }
  }, [EXTRA_PADDING_TOP, data]);

  const _onEndReach = () => {
    if (!loadingProducts) {
      getProducts();
    }
  };

  useEffect(() => {
    if (_dataProvider.getSize() > 0) {
      const newLayoutProvider = new LayoutProvider(
        index => {
          return _dataProvider.getDataForIndex(index)?.type || 'unknown';
        },
        (type, dim) => {
          dim.width = width;
          switch (type) {
            case 'top_banner_slide':
              dim.height =
                heights.TOP_BANNER_HEIGHT +
                heights.NAVIGATION_HEADER_HEIGHT +
                insets.top;
              break;
            case 'wallet_info_row':
              dim.height = heights.WALLET_HEIGHT + heights.WALLET_OFFSET;
              break;
            case 'main_category_slider':
              dim.height = heights.MAIN_CATEGORY_HEIGHT;
              break;
            case 'photo_promo':
              dim.height = heights.PHOTO_PROMO_HEIGHT;
              break;
            case 'big_brand_discount':
              dim.height = heights.BIG_BRAND_DISCOUNT_HEIGHT;
              break;
            case 'spacer':
              dim.height = heights.SPACER_HEIGHT;
              break;
            case 'shocking_sale':
              dim.height = heights.SHOCKING_SALE_HEIGHT;
              break;
            case 'shopee_mall':
              dim.height = heights.SHOPEE_MALL_HEIGHT;
              break;
            case 'shopee_live':
              dim.height = heights.SHOPEE_LIVE_HEIGHT;
              break;
            case 'deals_top_ups_bills':
              dim.height = heights.DEALS_TOP_UP_BILLS_HEIGHT;
              break;
            case 'trending_search':
              dim.height = heights.TRENDING_SEARCH_HEIGHT;
              break;
            case 'featured_collections':
              dim.height = heights.FEATURED_COLLECTION_HEIGHT;
              break;
            case 'main_categories':
              dim.height = heights.MAIN_CATEGORIES_HEIGHT;
              break;
            case 'section_header':
              dim.height = heights.SECTION_HEADER_HEIGHT;
              break;
            case 'category_selector':
              dim.height = heights.CATEGORY_SELECTOR_HEIGHT;
              break;
            case 'loading_products':
              dim.height = 40;
              break;
            case 'shopee_product':
              dim.height = heights.PRODUCT_HEIGHT;
              dim.width = Math.floor(width / 2);
              break;
            default:
              break;
          }
        },
      );
      newLayoutProvider.shouldRefreshWithAnchoring = false;
      setLayoutProvider(newLayoutProvider);
    }
  }, [insets, _dataProvider]);

  const _applyWindowCorrection = (offset, offsetY, windowCorrection) => {
    windowCorrection.startCorrection =
      heights.NAVIGATION_HEADER_HEIGHT + insets.top;
  };

  const setStatusBarStyle = (val: number) => {
    if (val > 0.5) {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBarStyle('light-content');
    }
  };

  const scrollHandler = (
    rawEvent: ScrollEvent,
    offsetX: number,
    offsetY: number,
  ) => {
    const val = offsetY / heights.TOP_BANNER_HEIGHT;
    currentScrollYPos.value = val;
    setStatusBarStyle(val);
  };

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: e => {
  //     currentScrollYPos.value = e.contentOffset.y / heights.TOP_BANNER_HEIGHT;
  //   },
  // });

  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6', width: width}}>
      <NavigationHeader scrollPosY={currentScrollYPos} />
      {_dataProvider.getSize() > 0 && (
        <StickyContainer
          stickyHeaderIndices={[21]}
          applyWindowCorrection={_applyWindowCorrection}>
          <RecyclerListView
            onEndReached={_onEndReach}
            onEndReachedThreshold={20}
            dataProvider={_dataProvider}
            layoutProvider={_layoutProvider}
            rowRenderer={_rowRenderer}
            onScroll={scrollHandler}
            renderAheadOffset={400}
            extendedState={{isLoadingProducts: loadingProducts}}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              refreshControl: (
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getDashboardData}
                  progressViewOffset={EXTRA_PADDING_TOP}
                />
              ),
            }}
          />
        </StickyContainer>
      )}
    </View>
  );
};

export default Home;
