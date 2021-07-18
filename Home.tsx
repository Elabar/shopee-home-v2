import React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import StickyContainer from 'recyclerlistview/sticky';
import equal from 'fast-deep-equal';
import {_rowRenderer} from './RowRenderer';
import NavigationHeader from './NavigationHeader';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {heights} from './contants';
import {ScrollEvent} from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
const dataProvider = new DataProvider((r1, r2) => {
  return equal(r1, r2);
});

const defaultLayoutProvider = new LayoutProvider(
  index => 0,
  (type, dim) => {
    dim.height = 0;
    dim.width = 0;
  },
);

const {width} = Dimensions.get('window');
const AnimatedRecylerListView =
  Animated.createAnimatedComponent(RecyclerListView);
const Home = () => {
  const insets = useSafeAreaInsets();
  const currentScrollYPos = useSharedValue(0);
  const [_dataProvider, setDataProvider] = useState(
    dataProvider.cloneWithRows([]),
  );
  const [_layoutProvider, setLayoutProvider] = useState(defaultLayoutProvider);

  useEffect(() => {
    const fakeProductData = [];
    for (let i = 0; i < 1000; i++) {
      fakeProductData.push({
        type: 'shopee_product',
        data: {
          image:
            'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
          price: 26,
          sold: 622,
          label:
            'Garret Popcor [CaramelCrisp] [Macadamia] Small - Garret, Garret GENG',
        },
      });
    }
    setDataProvider(
      _dataProvider.cloneWithRows([
        {
          type: 'top_banner_slide',
          data: [
            'https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg',
            'https://analyticsindiamag.com/wp-content/uploads/2020/10/7d744a684fe03ebc7e8de545f97739dd.jpg',
          ],
          EXTRA_PADDING_TOP: heights.NAVIGATION_HEADER_HEIGHT + insets.top,
        },
        {
          type: 'wallet_info_row',
          data: {
            walletBalance: 95.36,
            coinBalance: 50,
          },
        },
        {
          type: 'main_category_slider',
          data: [
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee Mart',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'RM15 Free Shipping',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Deals Near Me',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee Prizes',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shop Malaysia',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee Live',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: '10% Cashback',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'RM1 Deals',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Stay Home Stay Safe',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Cash On Delivery',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Tickets, Top-ups & Bills',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: "Men's Sale",
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Indo Choice',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee',
              },
            ],
          ],
        },
        {
          type: 'photo_promo',
          data: [
            {
              image:
                'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
              flex: 5,
            },
            {
              image:
                'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
              flex: 6,
            },
            {
              image:
                'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
              flex: 5,
            },
          ],
        },
        {
          type: 'big_brand_discount',
          data: {
            topBrandDeals: [
              {
                image:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                price: 84.8,
                discount: 20,
              },
              {
                image:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                price: 84.8,
                discount: 20,
              },
              {
                image:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                price: 84.8,
                discount: 20,
              },
              {
                image:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                price: 84.8,
                discount: 20,
              },
              {
                image:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                price: 84.8,
                discount: 20,
              },
            ],
            hotProducts: [
              {
                image:
                  'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
                label: 'Jul 18 Only Deals',
              },
              {
                image:
                  'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
                label: '18 Sen Deals',
              },
              {
                image:
                  'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
                label: 'Free Shipping Deals',
              },
              {
                image:
                  'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
                label: '95% Off Deals',
              },
              {
                image:
                  'https://image.shutterstock.com/image-vector/promotion-square-sticker-sign-banner-260nw-1427755229.jpg',
                label: 'Free Food Deals',
              },
            ],
          },
        },
        {
          type: 'spacer',
        },
        {
          type: 'shocking_sale',
          data: [
            {
              image:
                'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
              price: 13.09,
              qty: 30,
              sold: 0,
            },
            {
              image:
                'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
              price: 13.09,
              qty: 30,
              sold: 14,
            },
            {
              image:
                'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
              price: 13.09,
              qty: 30,
              sold: 14,
            },
            {
              image:
                'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
              price: 13.09,
              qty: 30,
              sold: 14,
            },
            {
              image:
                'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
              price: 13.09,
              qty: 30,
              sold: 14,
            },
            {
              image:
                'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
              price: 13.09,
              qty: 30,
              sold: 14,
            },
          ],
        },
        {
          type: 'spacer',
        },
        {
          type: 'shopee_mall',
          data: {
            mainSlider: [
              'https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png',
              'https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png',
              'https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png',
            ],
            malls: [
              {
                productImage:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Up to 35% Off',
              },
              {
                productImage:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Up to 58% Off',
              },
              {
                productImage:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Up to 90% Off',
              },
              {
                productImage:
                  'https://cf.shopee.com.my/file/cdab581d6b2e7f6324119c05c1a624ca',
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Up to 88% Off',
              },
            ],
          },
        },
        {
          type: 'spacer',
        },
        {
          type: 'shopee_live',
          data: [
            {
              img: 'https://i.ytimg.com/vi/PGqU_stcXDw/maxresdefault.jpg',
              label: 'LTT BROADCAST TIME!',
              watchingCount: '1k',
            },
            {
              img: 'https://i.ytimg.com/vi/PGqU_stcXDw/maxresdefault.jpg',
              label: 'LTT BROADCAST TIME!',
              watchingCount: '1k',
            },
            {
              img: 'https://i.ytimg.com/vi/PGqU_stcXDw/maxresdefault.jpg',
              label: 'LTT BROADCAST TIME!',
              watchingCount: '1k',
            },
            {
              img: 'https://i.ytimg.com/vi/PGqU_stcXDw/maxresdefault.jpg',
              label: 'LTT BROADCAST TIME!',
              watchingCount: '1k',
            },
          ],
        },
        {
          type: 'spacer',
        },
        {
          type: 'deals_top_ups_bills',
          data: {
            mainSlider: [
              'https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png',
              'https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png',
              'https://static-cse.canva.com/blob/140234/Rainbow-Gradient-Pink-and-Purple-Zoom-Virtual-Background.png',
            ],
            cats: [
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Deals Near Me',
              },
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Food & Services',
              },
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'PTPTN',
              },
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Mobile Reloads',
              },
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Postpaid',
              },
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Mobile Reloads',
              },
              {
                brandImage:
                  'https://images.squarespace-cdn.com/content/v1/5213f93be4b08fcef374a832/1544663142129-OPO6CAUAKFO5CBKW1YDO/dBrand-Logo.png',
                label: 'Air Selangor',
              },
            ],
          },
        },
        {
          type: 'spacer',
        },
        {
          type: 'trending_search',
          data: [
            {
              title: 'Xiaomi Earbuds',
              caption: '158k+ Products',
              image:
                'https://cf.shopee.com.my/file/c27deb189f7f2d981e7b217a9c41e730',
            },
            {
              title: 'Xiaomi Airdots Pro Max Ultra 2',
              caption: '158k+ Products',
              image:
                'https://cf.shopee.com.my/file/c27deb189f7f2d981e7b217a9c41e730',
            },
            {
              title: 'Xiaomi Earbuds',
              caption: '158k+ Products',
              image:
                'https://cf.shopee.com.my/file/c27deb189f7f2d981e7b217a9c41e730',
            },
            {
              title: 'Xiaomi Earbuds',
              caption: '158k+ Products',
              image:
                'https://cf.shopee.com.my/file/c27deb189f7f2d981e7b217a9c41e730',
            },
          ],
        },
        {
          type: 'spacer',
        },
        {
          type: 'featured_collections',
          data: [
            {
              image:
                'https://img.freepik.com/free-vector/wooden-pallet-front-angle-view_107791-4876.jpg?size=626&ext=jpg',
              title: 'Choose your ramen flavor',
              caption: '967k+ sold',
            },
            {
              image:
                'https://img.freepik.com/free-vector/wooden-pallet-front-angle-view_107791-4876.jpg?size=626&ext=jpg',
              title: 'Choose your ramen flavor',
              caption: '967k+ sold',
            },
            {
              image:
                'https://img.freepik.com/free-vector/wooden-pallet-front-angle-view_107791-4876.jpg?size=626&ext=jpg',
              title: 'Choose your ramen flavor',
              caption: '967k+ sold',
            },
            {
              image:
                'https://img.freepik.com/free-vector/wooden-pallet-front-angle-view_107791-4876.jpg?size=626&ext=jpg',
              title: 'Choose your ramen flavor',
              caption: '967k+ sold',
            },
          ],
        },
        {
          type: 'spacer',
        },
        {
          type: 'main_categories',
          data: [
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee Mart',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'RM15 Free Shipping',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Deals Near Me',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee Prizes',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shop Malaysia',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee Live',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: '10% Cashback',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'RM1 Deals',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Stay Home Stay Safe',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Cash On Delivery',
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Tickets, Top-ups & Bills',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: "Men's Sale",
              },
            ],
            [
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Indo Choice',
              },
              {
                icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
                label: 'Shopee',
              },
            ],
          ],
        },
        {
          type: 'spacer',
        },
        {
          type: 'section_header',
          data: 'DAILY DISCOVER',
        },
        {
          type: 'category_selector',
          data: [
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
            {
              icon: 'https://s3.ap-southeast-1.amazonaws.com/arrowhitech.com/wp-content/uploads/2020/06/05015722/free_shipping_PNG2.png',
              label: 'Shopee Mart',
            },
          ],
        },
        ...fakeProductData,
      ]),
    );
  }, [insets]);

  useEffect(() => {
    if (_dataProvider.getSize() > 0) {
      setLayoutProvider(
        new LayoutProvider(
          index => _dataProvider.getDataForIndex(index).type,
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
              case 'shopee_product':
                dim.height = heights.PRODUCT_HEIGHT;
                dim.width = Math.floor(width / 2);
                break;
              default:
                break;
            }
          },
        ),
      );
    }
  }, [insets, _dataProvider]);

  _layoutProvider.shouldRefreshWithAnchoring = false;

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
    <View style={{flex: 1, backgroundColor: 'white', width: width}}>
      <NavigationHeader scrollPosY={currentScrollYPos} />
      <StickyContainer
        stickyHeaderIndices={[21]}
        applyWindowCorrection={_applyWindowCorrection}>
        <AnimatedRecylerListView
          dataProvider={_dataProvider}
          layoutProvider={_layoutProvider}
          rowRenderer={_rowRenderer}
          onScroll={scrollHandler}
          scrollViewProps={{
            style: {
              // paddingTop: 75,
            },
            showsVerticalScrollIndicator: false,
          }}
        />
      </StickyContainer>
    </View>
  );
};

export default Home;
