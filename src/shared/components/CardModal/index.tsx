import { theme } from '@app/theme';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Box } from '@shared/components/layout/Box';
import Spacer from '@shared/components/layout/Spacer';
import Text from '@shared/components/Text';
import { getRarityInfo, getRegionInfo, getTypeInfo } from '@shared/helpers/get-filter-info';
import { normalize } from '@shared/helpers/normalize-pixels';
import { ICardType } from '@shared/types/cards.types';
import { CardType, RarityType, RegionType } from '@shared/types/filters.types';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import StarIcon from '@assets/icons/star.svg';
import Animated from 'react-native-reanimated';
import { Card, ModalWrapper } from './styles';
import Divider from '../layout/Divider';
import CloseIcon from '@assets/icons/close.svg';

export type BottomSheetModalHandler = BottomSheetModal;

type CardModalProps = {
  card?: ICardType;
};

const { width } = Dimensions.get('window');
const CARD_HEIGHT = normalize(325);
const CARD_WIDTH = normalize(CARD_HEIGHT / 1.3); // get width = 250
const CARD_SPACER_SIZE = (normalize(width + 15) - CARD_WIDTH) / 2;

const CardModal: ForwardRefRenderFunction<BottomSheetModal, CardModalProps> = ({ card }, ref) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetModal, []);
  const { t } = useTranslation('shared');

  const [isFavorite, setIsFavorite] = useState(card?.isFavorite);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['100%']}
      backgroundComponent={() => <Box opacity={0} />}
      handleComponent={null}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      backdropComponent={props => {
        return (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.8} />
        );
      }}>
      <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
        <View style={{ flex: 1 }}>
          <Box alignItems="flex-end" mt="md" mr="sm">
            <CloseIcon width={normalize(40)} height={normalize(40)} fill={theme.colors.white} />
          </Box>
        </View>
      </TouchableWithoutFeedback>

      <ModalWrapper>
        <Box
          alignItems="center"
          style={{
            position: 'absolute',
            top: normalize(-170),
          }}>
          <CardsSlider card={card} />
        </Box>
        <Spacer height={180} />
        <Box alignSelf="center">
          <TouchableOpacity
            onPress={() => {
              setIsFavorite(prev => !prev);
            }}>
            <StarIcon
              width={normalize(40)}
              height={normalize(40)}
              stroke={theme.colors.text_default}
              fill={isFavorite ? theme.colors.favorite : 'none'}
            />
          </TouchableOpacity>
        </Box>
        <ScrollView overScrollMode="never">
          <Box px="lg" pb="xlg" flex={1}>
            <Spacer height={20} />
            <Box flexDirection="row" flex={1}>
              <CardInfoItem type="region" regions={card?.regions} />
              <Box mx="md">
                <CardInfoItem type="type" cardType={card?.type} />
              </Box>
              <CardInfoItem type="rarity" rarity={card?.rarity} />
            </Box>

            <Divider my="lg" />

            <Text variant="title">{t('card_info.keywords')}</Text>
            <Text mt="md">[WIP]</Text>

            <Text variant="title" mt="lg">
              {t('card_info.description')}
            </Text>
            <Text mt="md">{card?.description}</Text>
          </Box>
        </ScrollView>
      </ModalWrapper>
    </BottomSheetModal>
  );
};

type CardsSliderProps = {
  card?: ICardType;
};

const CardsSlider = ({ card }: CardsSliderProps) => {
  const images = useMemo(() => {
    if (!card) return [];

    const selected: ICardType = card;
    const spacer = selected;

    return [spacer, selected, ...card.relatedCards, spacer];
  }, [card]);

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={images}
      snapToStart
      snapToInterval={CARD_WIDTH}
      decelerationRate={0}
      bounces={false}
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
      })}
      renderItem={({ item, index }) => {
        if (index === 0 || index === images.length - 1) {
          return <View style={{ width: CARD_SPACER_SIZE }} />;
        }
        const inputRange = [(index - 2) * CARD_WIDTH, (index - 1) * CARD_WIDTH, index * CARD_WIDTH];
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [0, normalize(-50), 0],
        });
        return (
          <Box>
            <Animated.View
              // @ts-ignore
              style={{
                flex: 1,
                transform: [{ translateY }],
              }}>
              <Box
                flex={1}
                style={{
                  paddingTop: normalize(50),
                }}>
                <Card
                  key={`card-modal-item-${index}`}
                  source={{ uri: item.imageUrl }}
                  height={CARD_HEIGHT}
                  width={CARD_WIDTH}
                />
              </Box>
            </Animated.View>
          </Box>
        );
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

type CardInfoItemProps = {
  type: 'region' | 'type' | 'rarity';
  regions?: RegionType[];
  cardType?: CardType;
  rarity?: RarityType;
};

const CardInfoItem = ({ type, regions, cardType, rarity }: CardInfoItemProps) => {
  const { t } = useTranslation('shared');

  const getItems = () => {
    switch (type) {
      case 'region':
        if (!regions) return [];
        return regions.map(key => {
          return getRegionInfo(key, t);
        });
      case 'type':
        if (!cardType) return [];
        return [getTypeInfo(cardType, t)];
      case 'rarity':
        if (!rarity) return [];
        return [getRarityInfo(rarity, t)];
    }
  };

  return (
    <Box flex={1} justifyContent="center">
      {getItems().map(item => {
        const Icon = item.icon;

        return (
          <Box key={item.toString()} flexDirection="row" alignItems="center" my="sm">
            <Icon width={normalize(30)} height={normalize(30)} fill={item.color ?? 'none'} />
            <Text
              mx="md"
              numberOfLines={2}
              fontSize={type === 'region' ? normalize(20) : normalize(25)}>
              {item.label}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default forwardRef(CardModal);
